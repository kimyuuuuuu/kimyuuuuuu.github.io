---
title: "미팅 시간 조사 (11/25 ~ 12/11)"
date: 2026-10-15
categories: [etc]
toc: false
comments: false
---

기간: 11/25(수) ~ 12/11(금) 평일, 09:00 ~ 17:00 (30분 단위)

**사용 방법**
1. 아래 칸에 **이름**을 입력하고 **시작**을 누르세요 (Enter도 됩니다).
    - 전에 응답한 적이 있으면 같은 이름을 입력하세요. 저장해 둔 시간이 그대로 불러와집니다.
    - 다른 사람 응답을 덮어쓰지 않도록 본인 이름을 정확히 입력해 주세요.
2. **내 가능 시간** 표에서 가능한 시간을 칠하세요.
    - 한 칸만 칠하려면 그 칸을 **클릭**하세요.
    - 여러 칸을 한 번에 칠하려면 마우스를 **누른 채로 드래그**하세요. 위아래, 옆으로 모두 됩니다.
    - 휴대폰에서는 손가락으로 **누른 채 문지르면** 칠해집니다.
    - 잘못 칠했으면 **칠해진 칸에서 드래그를 시작**하세요. 지나가는 칸이 지워집니다.
    - 표가 화면보다 넓으면 표 아래 스크롤바를 옆으로 밀어서 뒤쪽 날짜를 보세요. 휴대폰에서는 표 바깥을 잡고 밀면 됩니다.
3. 다 칠했으면 **저장**을 꼭 누르세요. 저장하지 않으면 반영되지 않습니다.
    - "저장했습니다"가 뜨면 완료입니다.
    - 나중에 시간을 바꾸려면 1번부터 다시 하고 저장하면 됩니다.
    - **전부 지우기** 후 저장하면 내 응답이 삭제됩니다.
4. **전체 현황** 표에서 모두의 응답을 확인하세요.
    - 가능한 사람이 많은 시간일수록 칸이 **진한 초록색**입니다.
    - 칸에 마우스를 올리거나 탭하면 그 시간에 가능한 사람과 안 되는 사람이 아래에 표시됩니다.
    - 다른 사람 응답은 자동으로 갱신되지 않으니 **새로고침** 버튼을 눌러 최신 상태를 보세요.

{% raw %}
<style>
#mt-app{--mt-on:34,197,94;--mt-line:rgba(127,127,127,.35);font-size:.9rem;margin-top:1rem}
#mt-app .mt-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:8px 0}
#mt-app input{padding:6px 10px;border:1px solid var(--mt-line);border-radius:6px;background:transparent;color:inherit;min-width:0;width:12rem;max-width:100%}
#mt-app button{padding:6px 14px;border:1px solid var(--mt-line);border-radius:6px;background:transparent;color:inherit;cursor:pointer}
#mt-app button.mt-primary{background:rgb(var(--mt-on));border-color:transparent;color:#fff}
#mt-app button:disabled{opacity:.5;cursor:default}
#mt-app .mt-section{margin-top:1.5rem}
#mt-app .mt-title{font-weight:700;font-size:1rem;margin-bottom:4px}
#mt-app .mt-help,#mt-app .mt-status{font-size:.8rem;opacity:.75}
#mt-app .mt-scroll{overflow-x:auto;padding:8px 0 4px}
#mt-app .mt-grid{display:grid;min-width:520px;user-select:none;-webkit-user-select:none}
#mt-app .mt-head{font-size:.72rem;text-align:center;line-height:1.25;padding-bottom:4px}
#mt-app .mt-time{font-size:.68rem;text-align:right;padding-right:6px;line-height:1;transform:translateY(-.5em);opacity:.75;white-space:nowrap}
#mt-app .mt-cell{height:16px;border-left:1px solid var(--mt-line);border-top:1px dashed var(--mt-line)}
#mt-app .mt-cell.mt-hour{border-top-style:solid}
#mt-app .mt-cell.mt-mon{border-left:2px solid rgba(127,127,127,.75)}
#mt-app .mt-cell.mt-last{border-right:1px solid var(--mt-line)}
#mt-app .mt-cell.mt-end{border-bottom:1px solid var(--mt-line)}
#mt-app .mt-pad{height:0}
#mt-mine{touch-action:none}
#mt-mine .mt-cell{cursor:pointer}
#mt-mine .mt-cell.on{background:rgba(var(--mt-on),.85)}
#mt-group .mt-cell{cursor:default}
#mt-group .mt-cell.sel{outline:2px solid rgba(127,127,127,.9);outline-offset:-2px}
#mt-app .mt-legend{display:flex;align-items:center;gap:6px;font-size:.75rem;opacity:.8}
#mt-app .mt-legend i{display:inline-block;width:80px;height:10px;border:1px solid var(--mt-line);background:linear-gradient(90deg,rgba(var(--mt-on),.15),rgba(var(--mt-on),1))}
#mt-detail{min-height:3.5em;font-size:.85rem;padding:8px 10px;border:1px solid var(--mt-line);border-radius:6px;margin-top:8px}
#mt-detail .mt-ok{color:rgb(var(--mt-on));font-weight:600}
#mt-detail .mt-no{opacity:.6}
</style>
<div id="mt-app">
  <div class="mt-row">
    <input id="mt-name" type="text" maxlength="30" placeholder="이름" autocomplete="off">
    <button id="mt-start" class="mt-primary">시작</button>
    <span id="mt-status" class="mt-status"></span>
  </div>
  <div id="mt-mine-wrap" class="mt-section" hidden>
    <div class="mt-title">내 가능 시간 · <span id="mt-me"></span></div>
    <div class="mt-help">클릭하거나 드래그해서 칠하고, 칠한 칸을 다시 드래그하면 지워집니다.</div>
    <div class="mt-scroll"><div id="mt-mine" class="mt-grid"></div></div>
    <div class="mt-row">
      <button id="mt-save" class="mt-primary">저장</button>
      <button id="mt-clear">전부 지우기</button>
      <span id="mt-dirty" class="mt-status"></span>
    </div>
  </div>
  <div class="mt-section">
    <div class="mt-title">전체 현황 <span id="mt-count" class="mt-status"></span></div>
    <div class="mt-row">
      <div class="mt-legend">0명 <i></i> 전원</div>
      <button id="mt-refresh">새로고침</button>
    </div>
    <div class="mt-scroll"><div id="mt-group" class="mt-grid"></div></div>
    <div id="mt-detail">칸에 마우스를 올리거나 탭하면 가능한 사람이 보입니다.</div>
  </div>
</div>
<script>
(function () {
  // Apps Script 웹 앱 배포 URL (…/exec 로 끝나는 주소)
  const API_URL = 'https://script.google.com/macros/s/AKfycbxyLeNFnjSlFLLvjizNafiG3Uv-F265zib3AaJVSuTexV5kcCW_6H3n1Z4nAr3BqaTnMA/exec';

  const START = new Date(2026, 10, 25);
  const END = new Date(2026, 11, 11);
  const DAY_START = 9 * 60, DAY_END = 17 * 60, STEP = 30;
  const DOW = ['일', '월', '화', '수', '목', '금', '토'];

  const pad = n => String(n).padStart(2, '0');
  const fmtTime = m => pad(Math.floor(m / 60)) + ':' + pad(m % 60);

  const dates = [];
  for (let d = new Date(START); d <= END; d.setDate(d.getDate() + 1)) {
    const w = d.getDay();
    if (w === 0 || w === 6) continue;
    dates.push({
      ymd: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
      label: (d.getMonth() + 1) + '/' + d.getDate(),
      dow: DOW[w],
      mon: w === 1
    });
  }
  const times = [];
  for (let m = DAY_START; m < DAY_END; m += STEP) times.push(m);
  const keyOf = (date, m) => date.ymd + 'T' + fmtTime(m);

  const $ = id => document.getElementById(id);
  const nameEl = $('mt-name'), statusEl = $('mt-status');
  const mineEl = $('mt-mine'), groupEl = $('mt-group'), detailEl = $('mt-detail');
  const saveBtn = $('mt-save'), dirtyEl = $('mt-dirty');

  let me = '';
  let mine = new Set();
  let responses = [];
  let dirty = false;

  function buildGrid(el) {
    el.style.gridTemplateColumns = '48px repeat(' + dates.length + ', minmax(34px, 1fr))';
    el.appendChild(document.createElement('div'));
    dates.forEach(d => {
      const h = document.createElement('div');
      h.className = 'mt-head';
      h.innerHTML = d.label + '<br>' + d.dow;
      el.appendChild(h);
    });
    times.forEach((m, r) => {
      const t = document.createElement('div');
      t.className = 'mt-time';
      t.textContent = m % 60 === 0 ? fmtTime(m) : '';
      el.appendChild(t);
      dates.forEach((d, c) => {
        const cell = document.createElement('div');
        cell.className = 'mt-cell';
        if (m % 60 === 0) cell.classList.add('mt-hour');
        if (d.mon && c > 0) cell.classList.add('mt-mon');
        if (c === dates.length - 1) cell.classList.add('mt-last');
        if (r === times.length - 1) cell.classList.add('mt-end');
        cell.dataset.key = keyOf(d, m);
        el.appendChild(cell);
      });
    });
    const t = document.createElement('div');
    t.className = 'mt-time';
    t.textContent = fmtTime(DAY_END);
    el.appendChild(t);
    dates.forEach(() => {
      const p = document.createElement('div');
      p.className = 'mt-pad';
      el.appendChild(p);
    });
  }
  buildGrid(mineEl);
  buildGrid(groupEl);

  function setStatus(msg) { statusEl.textContent = msg; }
  function setDirty(v) {
    dirty = v;
    dirtyEl.textContent = v ? '저장하지 않은 변경 사항이 있습니다' : '';
  }

  function renderMine() {
    mineEl.querySelectorAll('.mt-cell').forEach(c => {
      c.classList.toggle('on', mine.has(c.dataset.key));
    });
  }

  function renderGroup() {
    const total = responses.length;
    $('mt-count').textContent = '(' + total + '명 응답)';
    const counts = {};
    responses.forEach(r => r.slots.forEach(k => { counts[k] = (counts[k] || 0) + 1; }));
    groupEl.querySelectorAll('.mt-cell').forEach(c => {
      const n = counts[c.dataset.key] || 0;
      c.style.background = n && total ? 'rgba(var(--mt-on),' + (0.15 + 0.85 * n / total).toFixed(3) + ')' : '';
      c.title = total ? n + '/' + total + '명 가능' : '';
    });
  }

  function showDetail(key) {
    groupEl.querySelectorAll('.mt-cell.sel').forEach(c => c.classList.remove('sel'));
    const cell = groupEl.querySelector('[data-key="' + key + '"]');
    if (cell) cell.classList.add('sel');
    const [ymd, hm] = key.split('T');
    const date = dates.find(d => d.ymd === ymd);
    const [h, m] = hm.split(':').map(Number);
    const ok = responses.filter(r => r.slots.includes(key)).map(r => r.name);
    const no = responses.filter(r => !r.slots.includes(key)).map(r => r.name);

    detailEl.textContent = '';
    const head = document.createElement('div');
    head.textContent = date.label + '(' + date.dow + ') ' + hm + ' – ' + fmtTime(h * 60 + m + STEP) +
      ' · ' + ok.length + '/' + responses.length + '명 가능';
    const okEl = document.createElement('div');
    okEl.className = 'mt-ok';
    okEl.textContent = '가능: ' + (ok.join(', ') || '-');
    const noEl = document.createElement('div');
    noEl.className = 'mt-no';
    noEl.textContent = '불가: ' + (no.join(', ') || '-');
    detailEl.append(head, okEl, noEl);
  }

  async function load() {
    if (API_URL.indexOf('http') !== 0) { setStatus('API_URL이 설정되지 않았습니다'); return; }
    setStatus('불러오는 중…');
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      responses = json.data;
      renderGroup();
      setStatus('');
    } catch (e) {
      setStatus('불러오기 실패: ' + e.message);
    }
  }

  async function save() {
    if (!me) return;
    saveBtn.disabled = true;
    setStatus('저장 중…');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ name: me, slots: Array.from(mine) })
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      responses = json.data;
      renderGroup();
      setDirty(false);
      setStatus('저장했습니다');
    } catch (e) {
      setStatus('저장 실패: ' + e.message);
    } finally {
      saveBtn.disabled = false;
    }
  }

  async function start() {
    const name = nameEl.value.trim();
    if (!name) { nameEl.focus(); return; }
    if (dirty && name !== me && !confirm('저장하지 않은 변경 사항이 사라집니다. 계속할까요?')) return;
    await load();
    me = name;
    try { localStorage.setItem('mt-name', me); } catch (e) {}
    const found = responses.find(r => r.name === me);
    mine = new Set(found ? found.slots : []);
    $('mt-me').textContent = me + (found ? ' (기존 응답 불러옴)' : ' (새 응답)');
    $('mt-mine-wrap').hidden = false;
    renderMine();
    setDirty(false);
  }

  // 드래그로 칠하기: 시작한 칸이 비어 있으면 칠하기, 칠해져 있으면 지우기
  let painting = false, paintOn = true;
  function paint(cell) {
    const k = cell.dataset.key;
    if (paintOn === mine.has(k)) return;
    if (paintOn) mine.add(k); else mine.delete(k);
    cell.classList.toggle('on', paintOn);
    setDirty(true);
  }
  mineEl.addEventListener('pointerdown', e => {
    const cell = e.target.closest('.mt-cell');
    if (!cell) return;
    e.preventDefault();
    painting = true;
    paintOn = !mine.has(cell.dataset.key);
    paint(cell);
  });
  mineEl.addEventListener('pointermove', e => {
    if (!painting) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el && el.closest('#mt-mine .mt-cell');
    if (cell) paint(cell);
  });
  window.addEventListener('pointerup', () => { painting = false; });
  window.addEventListener('pointercancel', () => { painting = false; });

  groupEl.addEventListener('pointerover', e => {
    const cell = e.target.closest('.mt-cell');
    if (cell) showDetail(cell.dataset.key);
  });
  groupEl.addEventListener('click', e => {
    const cell = e.target.closest('.mt-cell');
    if (cell) showDetail(cell.dataset.key);
  });

  $('mt-start').addEventListener('click', start);
  nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  saveBtn.addEventListener('click', save);
  $('mt-clear').addEventListener('click', () => {
    if (!mine.size) return;
    mine.clear();
    renderMine();
    setDirty(true);
  });
  $('mt-refresh').addEventListener('click', load);
  window.addEventListener('beforeunload', e => {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });

  try { nameEl.value = localStorage.getItem('mt-name') || ''; } catch (e) {}
  load();
})();
</script>
{% endraw %}
