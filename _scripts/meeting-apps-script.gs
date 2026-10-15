// 미팅 시간 조사 포스트(_posts/2026-10-15-meeting-schedule.md)의 저장소 역할을 하는 Apps Script
// 구글 시트 > 확장 프로그램 > Apps Script 에 붙여넣고 웹 앱으로 배포해서 사용함

const SHEET_NAME = 'responses';
const SLOT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const MAX_NAME = 30;
const MAX_SLOTS = 500;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['name', 'slots', 'updated']);
  }
  return sh;
}

// 시트에 저장할 때 =, +, -, @ 로 시작하면 수식으로 해석되므로 앞에 ' 를 붙임
function toCell_(name) {
  return /^[=+\-@]/.test(name) ? "'" + name : name;
}

function readAll_() {
  const values = getSheet_().getDataRange().getValues();
  const out = [];
  for (let i = 1; i < values.length; i++) {
    const name = String(values[i][0]);
    if (!name) continue;
    const slots = String(values[i][1] || '').split(',').filter(s => SLOT_RE.test(s));
    out.push({ name: name, slots: slots });
  }
  return out;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, data: readAll_() });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid json' });
  }

  const name = String(body.name || '').trim().slice(0, MAX_NAME);
  if (!name) return json_({ ok: false, error: 'name required' });
  const slots = Array.isArray(body.slots)
    ? body.slots.map(String).filter(s => SLOT_RE.test(s)).slice(0, MAX_SLOTS)
    : [];

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = getSheet_();
    const values = sh.getDataRange().getValues();
    let row = -1;
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][0]) === name) { row = i + 1; break; }
    }

    if (slots.length === 0) {
      // 가능 시간을 전부 지우고 저장하면 응답 자체를 삭제함
      if (row > 0) sh.deleteRow(row);
    } else if (row > 0) {
      sh.getRange(row, 2, 1, 2).setValues([[slots.join(','), new Date()]]);
    } else {
      sh.appendRow([toCell_(name), slots.join(','), new Date()]);
    }
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true, data: readAll_() });
}
