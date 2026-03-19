---
layout: post
title: "Unix/Linux 명령어 핵심 레퍼런스 총정리"
date: 2026-03-19 18:10:00 +0900
categories: [Linux, CheatSheet]
tags: [linux, unix, commands, terminal, bash]
---

## [cite_start]파일 & 디렉토리 [cite: 2]

### [cite_start]ls — 목록 보기 [cite: 3]
| 명령어/플래그 | 설명 |
|---|---|
| `ls` | [cite_start]기본 목록 [cite: 4] |
| `ls -l` | [cite_start]상세 정보 (권한, 크기, 날짜) [cite: 4] |
| `ls -a` | [cite_start]숨김 파일 포함 [cite: 4] |
| `ls -la` | [cite_start]상세 + 숨김 파일 [cite: 4] |
| `ls -lh` | [cite_start]파일 크기를 KB/MB로 표시 [cite: 4] |
| `ls -lt` | [cite_start]최근 수정 순 정렬 [cite: 4] |
| `ls -ltr` | [cite_start]오래된 순 정렬 [cite: 4] |
| `ls -R` | [cite_start]하위 디렉토리까지 재귀적으로 [cite: 4] |

### [cite_start]cd — 디렉토리 이동 [cite: 5]
| 명령어/플래그 | 설명 |
|---|---|
| `cd [경로]` | [cite_start]지정한 디렉토리로 이동 [cite: 6] |
| `cd ..` | [cite_start]상위 디렉토리로 [cite: 6] |
| `cd ~` | [cite_start]홈 디렉토리로 [cite: 6] |
| `cd -` | [cite_start]이전 디렉토리로 [cite: 6] |
| `cd /` | [cite_start]루트 디렉토리로 [cite: 6] |

### [cite_start]pwd — 현재 경로 확인 [cite: 7]
| 명령어/플래그 | 설명 |
|---|---|
| `pwd` | [cite_start]현재 작업 디렉토리 출력 [cite: 8] |

### [cite_start]mkdir — 디렉토리 만들기 [cite: 9]
| 명령어/플래그 | 설명 |
|---|---|
| `mkdir [디렉토리명]` | [cite_start]디렉토리 생성 [cite: 10] |
| `mkdir -p a/b/c` | [cite_start]중간 디렉토리도 자동 생성 [cite: 10] |
| `mkdir -m 755 [디렉토리명]` | [cite_start]권한까지 지정해서 생성 [cite: 10] |

### [cite_start]rm — 삭제 [cite: 11]
| 명령어/플래그 | 설명 |
|---|---|
| `rm [파일]` | [cite_start]파일 삭제 [cite: 12] |
| `rm -r [디렉토리]` | [cite_start]디렉토리 통째로 삭제 [cite: 12] |
| `rm -f [파일]` | [cite_start]확인 없이 강제 삭제 [cite: 12] |
| `rm -rf [디렉토리]` | [cite_start]강제로 디렉토리 통째 삭제 [cite: 12] |
| `rm -i [파일]` | [cite_start]삭제 전 확인 [cite: 12] |

### [cite_start]cp — 복사 [cite: 13]
| 명령어/플래그 | 설명 |
|---|---|
| `cp [원본] [대상]` | [cite_start]파일 복사 [cite: 14] |
| `cp -r [디렉토리1] [디렉토리2]` | [cite_start]디렉토리 복사 [cite: 14] |
| `cp -p [파일1] [파일2]` | [cite_start]권한/날짜 속성 유지하며 복사 [cite: 14] |
| `cp -i [원본] [대상]` | [cite_start]덮어쓰기 전 확인 [cite: 14] |

### [cite_start]mv — 이동 / 이름 바꾸기 [cite: 15]
| 명령어/플래그 | 설명 |
|---|---|
| `mv [원본] [대상]` | [cite_start]파일 이동 또는 이름 변경 [cite: 16] |
| `mv -i [원본] [대상]` | [cite_start]덮어쓰기 전 확인 [cite: 16] |


## [cite_start]파일 내용 보기 [cite: 17]

### [cite_start]cat — 파일 내용 출력 [cite: 18]
| 명령어/플래그 | 설명 |
|---|---|
| `cat [파일]` | [cite_start]파일 내용 출력 [cite: 19] |
| `cat -n [파일]` | [cite_start]줄 번호 표시 [cite: 19] |
| `cat [파일1] [파일2]` | [cite_start]여러 파일 이어서 출력 [cite: 19] |

### [cite_start]less / more — 페이지 단위로 보기 [cite: 20]
| 명령어/플래그 | 설명 |
|---|---|
| `less [파일]` | [cite_start]위아래 스크롤 가능 (q로 종료) [cite: 21] |
| `more [파일]` | [cite_start]아래로만 스크롤 [cite: 21] |

### [cite_start]head / tail — 앞/뒤 일부만 보기 [cite: 22]
| 명령어/플래그 | 설명 |
|---|---|
| `head [파일]` | [cite_start]앞 10줄 [cite: 23] |
| `head -n 20 [파일]` | [cite_start]앞 20줄 [cite: 23] |
| `tail [파일]` | [cite_start]뒤 10줄 [cite: 23] |
| `tail -n 20 [파일]` | [cite_start]뒤 20줄 [cite: 23] |
| `tail -f [파일]` | [cite_start]실시간으로 추가되는 내용 출력 [cite: 23] |


## [cite_start]검색 [cite: 24]

### [cite_start]grep — 텍스트 검색 [cite: 25]
| 명령어/플래그 | 설명 |
|---|---|
| `grep [패턴] [파일]` | [cite_start]파일에서 패턴 검색 [cite: 26] |
| `grep -i [패턴] [파일]` | [cite_start]대소문자 구분 없이 [cite: 26] |
| `grep -r [패턴] [디렉토리]` | [cite_start]디렉토리 내 전체 검색 [cite: 26] |
| `grep -n [패턴] [파일]` | [cite_start]줄 번호도 표시 [cite: 26] |
| `grep -v [패턴] [파일]` | [cite_start]패턴이 없는 줄만 출력 [cite: 26] |
| `grep -l [패턴] [파일들]` | [cite_start]파일명만 출력 [cite: 26] |
| `grep -c [패턴] [파일]` | [cite_start]매칭된 줄 개수 [cite: 26] |

### [cite_start]find — 파일 찾기 [cite: 27]
| 명령어/플래그 | 설명 |
|---|---|
| `find [경로] -name [패턴]` | [cite_start]이름으로 찾기 [cite: 28] |
| `find [경로] -type d` | [cite_start]디렉토리만 [cite: 28] |
| `find [경로] -type f` | [cite_start]파일만 [cite: 28] |
| `find [경로] -mtime -7` | [cite_start]최근 7일 내 수정된 파일 [cite: 28] |
| `find [경로] -size +10M` | [cite_start]10MB 이상 파일 [cite: 28] |
| `find [경로] -user [사용자]` | [cite_start]특정 사용자 소유 파일 [cite: 28] |


## [cite_start]시스템 & 프로세스 [cite: 29]

### [cite_start]ps — 프로세스 목록 [cite: 30]
| 명령어/플래그 | 설명 |
|---|---|
| `ps` | [cite_start]현재 터미널의 프로세스 [cite: 31] |
| `ps aux` | [cite_start]모든 프로세스 상세 정보 [cite: 31] |
| `ps -ef` | [cite_start]모든 프로세스 (다른 형식) [cite: 31] |
| `ps -u [사용자]` | [cite_start]특정 사용자의 프로세스 [cite: 31] |

### [cite_start]top / htop — 실시간 모니터 [cite: 32]
| 명령어/플래그 | 설명 |
|---|---|
| `top` | [cite_start]실시간 시스템 모니터 [cite: 33] |
| `top -u [사용자]` | [cite_start]특정 사용자 프로세스만 [cite: 33] |
| `htop` | [cite_start]개선된 인터페이스 (설치 필요) [cite: 33] |

### [cite_start]kill — 프로세스 종료 [cite: 34]
| 명령어/플래그 | 설명 |
|---|---|
| `kill [PID]` | [cite_start]프로세스 종료 [cite: 35] |
| `kill -9 [PID]` | [cite_start]강제 종료 [cite: 35] |
| `kill -15 [PID]` | [cite_start]정상 종료 (기본값) [cite: 35] |
| `killall [프로세스명]` | [cite_start]이름으로 종료 [cite: 35] |

### [cite_start]nice / renice — 우선순위 조정 [cite: 36]
| 명령어/플래그 | 설명 |
|---|---|
| `nice -n [값] [명령어]` | [cite_start]낮은 우선순위로 실행 (-20~19) [cite: 37] |
| `renice -n [값] -p [PID]` | [cite_start]실행 중 우선순위 변경 [cite: 37] |

### [cite_start]jobs / fg / bg — 작업 제어 [cite: 38]
| 명령어/플래그 | 설명 |
|---|---|
| `jobs` | [cite_start]백그라운드 작업 목록 [cite: 39] |
| `fg %[번호]` | [cite_start]포그라운드로 전환 [cite: 39] |
| `bg %[번호]` | [cite_start]백그라운드로 전환 [cite: 39] |
| `[명령어] &` | [cite_start]백그라운드로 실행 [cite: 39] |

### [cite_start]lsof — 열린 파일 목록 [cite: 40]
| 명령어/플래그 | 설명 |
|---|---|
| `lsof` | [cite_start]모든 열린 파일 [cite: 41] |
| `lsof -p [PID]` | [cite_start]특정 프로세스가 연 파일 [cite: 41] |
| `lsof -i :[포트]` | [cite_start]특정 포트 사용 프로세스 [cite: 41] |
| `lsof -u [사용자]` | [cite_start]특정 유저가 연 파일 [cite: 41] |


## [cite_start]네트워크 [cite: 42]

### [cite_start]ping — 연결 테스트 [cite: 43]
| 명령어/플래그 | 설명 |
|---|---|
| `ping [호스트]` | [cite_start]연결 확인 [cite: 44] |
| `ping -c [횟수] [호스트]` | [cite_start]지정 횟수만 핑 [cite: 44] |

### [cite_start]curl — HTTP 요청 [cite: 45]
| 명령어/플래그 | 설명 |
|---|---|
| `curl [URL]` | [cite_start]URL 내용 가져오기 [cite: 46] |
| `curl -O [URL]` | [cite_start]파일 다운로드 [cite: 46] |
| `curl -o [파일명] [URL]` | [cite_start]파일명 지정하여 다운로드 [cite: 46] |
| `curl -I [URL]` | [cite_start]헤더만 보기 [cite: 46] |
| `curl -L [URL]` | [cite_start]리다이렉트 따라가기 [cite: 46] |
| `curl -X POST [URL]` | [cite_start]POST 요청 [cite: 46] |
| `curl -u [user:pass] [URL]` | [cite_start]인증 [cite: 46] |

### [cite_start]wget — 파일 다운로드 [cite: 47]
| 명령어/플래그 | 설명 |
|---|---|
| `wget [URL]` | [cite_start]파일 다운로드 [cite: 48] |
| `wget -c [URL]` | [cite_start]중단된 다운로드 재개 [cite: 48] |
| `wget -r [URL]` | [cite_start]재귀적으로 다운로드 [cite: 48] |

### [cite_start]ssh — 원격 접속 [cite: 49]
| 명령어/플래그 | 설명 |
|---|---|
| `ssh [user@host]` | [cite_start]원격 서버 접속 [cite: 50] |
| `ssh -p [포트] [user@host]` | [cite_start]포트 지정 [cite: 50] |
| `ssh -i [키파일] [user@host]` | [cite_start]키 파일로 접속 [cite: 50] |

### [cite_start]scp — 원격 파일 복사 [cite: 51]
| 명령어/플래그 | 설명 |
|---|---|
| `scp [파일] [user@host:경로]` | [cite_start]서버로 업로드 [cite: 52] |
| `scp [user@host:경로] [로컬경로]` | [cite_start]서버에서 다운로드 [cite: 52] |
| `scp -r [디렉토리] [user@host:경로]` | [cite_start]디렉토리 복사 [cite: 52] |
| `scp -P [포트] [파일] [user@host:경로]` | [cite_start]포트 지정 [cite: 52] |

### [cite_start]ss / netstat — 네트워크 상태 [cite: 53]
| 명령어/플래그 | 설명 |
|---|---|
| `ss -tuln` | [cite_start]열려있는 포트 확인 [cite: 54] |
| `ss -tp` | [cite_start]TCP 연결 + 프로세스 [cite: 54] |
| [cite_start]`netstat -tuln` | ss와 동일 (구버전) [cite: 54] |

### [cite_start]dig / nslookup — DNS 조회 [cite: 55]
| 명령어/플래그 | 설명 |
|---|---|
| `dig [도메인]` | [cite_start]DNS 조회 [cite: 56] |
| `dig [도메인] MX` | [cite_start]메일 서버 조회 [cite: 56] |
| `dig @[DNS서버] [도메인]` | [cite_start]특정 DNS 서버로 조회 [cite: 56] |
| `nslookup [도메인]` | [cite_start]간단한 DNS 조회 [cite: 56] |

### [cite_start]ip — 네트워크 인터페이스 [cite: 57]
| 명령어/플래그 | 설명 |
|---|---|
| `ip addr` | [cite_start]IP 주소 확인 [cite: 58] |
| `ip route` | [cite_start]라우팅 테이블 [cite: 58] |
| `ip link` | [cite_start]네트워크 인터페이스 목록 [cite: 58] |


## [cite_start]권한 관리 [cite: 59]

### [cite_start]chmod — 권한 변경 [cite: 60]
| 명령어/플래그 | 설명 |
|---|---|
| `chmod [권한] [파일]` | [cite_start]권한 변경 [cite: 61] |
| [cite_start]`chmod 755 [파일]` | rwxr-xr-x [cite: 61] |
| `chmod +x [파일]` | [cite_start]실행 권한 추가 [cite: 61] |
| `chmod -w [파일]` | [cite_start]쓰기 권한 제거 [cite: 61] |
| `chmod -R [권한] [디렉토리]` | [cite_start]재귀적으로 적용 [cite: 61] |

### [cite_start]chown — 소유자 변경 [cite: 62]
| 명령어/플래그 | 설명 |
|---|---|
| `chown [user] [파일]` | [cite_start]소유자 변경 [cite: 63] |
| `chown [user:group] [파일]` | [cite_start]소유자 + 그룹 변경 [cite: 63] |
| `chown -R [user] [디렉토리]` | [cite_start]재귀적으로 적용 [cite: 63] |


## [cite_start]디스크 & 파일시스템 [cite: 64]

### [cite_start]df — 디스크 용량 [cite: 65]
| 명령어/플래그 | 설명 |
|---|---|
| `df` | [cite_start]모든 파티션 용량 [cite: 66] |
| `df -h` | [cite_start]사람이 읽기 쉽게 (KB/MB/GB) [cite: 66] |
| `df -H` | [cite_start]1000 단위로 표시 [cite: 66] |
| `df -T` | [cite_start]파일시스템 타입 표시 [cite: 66] |
| [cite_start]`df -i` | inode 사용량 [cite: 66] |
| `df -t [타입]` | [cite_start]특정 파일시스템만 [cite: 66] |
| `df -x [타입]` | [cite_start]특정 타입 제외 [cite: 66] |
| `df --total` | [cite_start]합계 표시 [cite: 66] |

### [cite_start]du — 디렉토리/파일 용량 [cite: 67]
| 명령어/플래그 | 설명 |
|---|---|
| `du` | [cite_start]현재 디렉토리 용량 [cite: 68] |
| `du -h` | [cite_start]사람이 읽기 쉽게 [cite: 68] |
| `du -s` | [cite_start]총합만 표시 [cite: 68] |
| `du -sh` | [cite_start]폴더 하나의 총 용량만 [cite: 68] |
| `du -sh *` | [cite_start]각 항목별 용량 [cite: 68] |
| `du -ah` | [cite_start]파일까지 전부 표시 [cite: 68] |
| `du -d [깊이]` | [cite_start]지정 깊이까지만 [cite: 68] |
| `du --max-depth=[깊이]` | [cite_start]지정 깊이까지만 [cite: 68] |
| `du -c` | [cite_start]총 합계 표시 [cite: 68] |
| `du --exclude=[패턴]` | [cite_start]특정 패턴 제외 [cite: 68] |

### [cite_start]lsblk / mount — 디스크 관리 [cite: 69]
| 명령어/플래그 | 설명 |
|---|---|
| `lsblk` | [cite_start]연결된 디스크/파티션 목록 [cite: 70] |
| `mount` | [cite_start]마운트된 장치 확인 [cite: 70] |


## [cite_start]압축 & 아카이브 [cite: 71]

### [cite_start]tar — 묶기 + 압축 [cite: 72]
| 명령어/플래그 | 설명 |
|---|---|
| `tar -cvf [파일.tar] [디렉토리]` | [cite_start]묶기만 [cite: 73] |
| [cite_start]`tar -czvf [파일.tar.gz] [디렉토리]` | gzip 압축 [cite: 73] |
| [cite_start]`tar -cjvf [파일.tar.bz2] [디렉토리]` | bzip2 압축 [cite: 73] |
| `tar -xzvf [파일.tar.gz]` | [cite_start]압축 해제 [cite: 73] |
| `tar -xzvf [파일] -C [경로]` | [cite_start]특정 위치에 해제 [cite: 73] |
| `tar -tzvf [파일.tar.gz]` | [cite_start]내용 확인만 [cite: 73] |
| `-c` | [cite_start]만들기 (create) [cite: 73] |
| `-x` | [cite_start]풀기 (extract) [cite: 73] |
| `-t` | [cite_start]목록보기 (list) [cite: 73] |
| `-v` | [cite_start]진행상황 출력 [cite: 73] |
| [cite_start]`-z` | gzip [cite: 73] |
| [cite_start]`-j` | bzip2 [cite: 73] |
| `-f` | [cite_start]파일 지정 [cite: 73] |

### [cite_start]zip / unzip [cite: 74]
| 명령어/플래그 | 설명 |
|---|---|
| [cite_start]`zip [파일.zip] [파일들]` | zip 압축 [cite: 75] |
| `zip -r [파일.zip] [디렉토리]` | [cite_start]디렉토리 압축 [cite: 75] |
| `unzip [파일.zip]` | [cite_start]압축 해제 [cite: 75] |
| `unzip -l [파일.zip]` | [cite_start]내용 확인만 [cite: 75] |
| `unzip [파일.zip] -d [경로]` | [cite_start]특정 위치에 해제 [cite: 75] |


## [cite_start]텍스트 처리 [cite: 76]

### [cite_start]sed — 텍스트 치환 [cite: 77]
| 명령어/플래그 | 설명 |
|---|---|
| `sed 's/old/new/' [파일]` | [cite_start]첫 번째만 치환 [cite: 78] |
| `sed 's/old/new/g' [파일]` | [cite_start]전체 치환 [cite: 78] |
| `sed -i 's/old/new/g' [파일]` | [cite_start]파일 직접 수정 [cite: 78] |
| `sed -n '5,10p' [파일]` | [cite_start]5~10번째 줄만 출력 [cite: 78] |
| `sed '/패턴/d' [파일]` | [cite_start]패턴 있는 줄 삭제 [cite: 78] |

### [cite_start]awk — 컬럼 기반 처리 [cite: 79]
| 명령어/플래그 | 설명 |
|---|---|
| `awk '{print $1}' [파일]` | [cite_start]첫 번째 컬럼만 [cite: 80] |
| `awk '{print $1, $3}' [파일]` | [cite_start]1번, 3번 컬럼 [cite: 80] |
| `awk -F: '{print $1}' [파일]` | [cite_start]구분자 지정 [cite: 80] |
| `awk 'NR==[숫자]' [파일]` | [cite_start]특정 줄만 [cite: 80] |

### [cite_start]sort — 정렬 [cite: 81]
| 명령어/플래그 | 설명 |
|---|---|
| `sort [파일]` | [cite_start]알파벳 순 정렬 [cite: 82] |
| `sort -r [파일]` | [cite_start]역순 [cite: 82] |
| `sort -n [파일]` | [cite_start]숫자 순 [cite: 82] |
| `sort -k[번호] [파일]` | [cite_start]특정 컬럼 기준 [cite: 82] |
| `sort -u [파일]` | [cite_start]중복 제거하며 정렬 [cite: 82] |
| `sort -h [파일]` | [cite_start]사람이 읽기 쉬운 숫자 (1K, 2M) [cite: 82] |

### [cite_start]uniq — 중복 처리 [cite: 83]
| 명령어/플래그 | 설명 |
|---|---|
| `uniq [파일]` | [cite_start]연속 중복 제거 [cite: 84] |
| `uniq -c [파일]` | [cite_start]중복 횟수 표시 [cite: 84] |
| `uniq -d [파일]` | [cite_start]중복된 것만 출력 [cite: 84] |

### [cite_start]wc — 글자/줄/단어 세기 [cite: 85]
| 명령어/플래그 | 설명 |
|---|---|
| `wc [파일]` | [cite_start]줄/단어/바이트 수 [cite: 86] |
| `wc -l [파일]` | [cite_start]줄 수만 [cite: 86] |
| `wc -w [파일]` | [cite_start]단어 수만 [cite: 86] |
| `wc -c [파일]` | [cite_start]바이트 수만 [cite: 86] |

### [cite_start]cut — 컬럼 자르기 [cite: 87]
| 명령어/플래그 | 설명 |
|---|---|
| `cut -d: -f1 [파일]` | [cite_start]구분자로 나눠서 1번째 필드 [cite: 88] |
| `cut -c1-5 [파일]` | [cite_start]1~5번째 문자만 [cite: 88] |

### [cite_start]tr — 문자 변환 [cite: 89]
| 명령어/플래그 | 설명 |
|---|---|
| `tr 'a-z' 'A-Z'` | [cite_start]소문자→대문자 [cite: 90] |
| `tr -d [문자]` | [cite_start]문자 삭제 [cite: 90] |
| `tr -s [문자]` | [cite_start]연속 문자를 하나로 [cite: 90] |

### [cite_start]diff — 파일 비교 [cite: 91]
| 명령어/플래그 | 설명 |
|---|---|
| `diff [파일1] [파일2]` | [cite_start]두 파일 차이 [cite: 92] |
| [cite_start]`diff -u [파일1] [파일2]` | unified 형식 [cite: 92] |
| `diff -r [디렉토리1] [디렉토리2]` | [cite_start]디렉토리 비교 [cite: 92] |


## [cite_start]사용자 관리 [cite: 93]

### [cite_start]사용자 관련 명령어 [cite: 94]
| 명령어/플래그 | 설명 |
|---|---|
| `sudo [명령어]` | [cite_start]관리자 권한으로 실행 [cite: 95] |
| `su - [사용자]` | [cite_start]다른 유저로 전환 [cite: 95] |
| `useradd [사용자]` | [cite_start]유저 추가 [cite: 95] |
| `passwd [사용자]` | [cite_start]비밀번호 변경 [cite: 95] |
| `usermod -aG [그룹] [사용자]` | [cite_start]그룹에 유저 추가 [cite: 95] |
| `groups [사용자]` | [cite_start]유저의 그룹 확인 [cite: 95] |
| `id [사용자]` | [cite_start]UID, GID 정보 [cite: 95] |
| `whoami` | [cite_start]현재 사용자 확인 [cite: 95] |


## [cite_start]시스템 정보 [cite: 96]

### [cite_start]시스템 관련 명령어 [cite: 97]
| 명령어/플래그 | 설명 |
|---|---|
| `uname -a` | [cite_start]커널 정보 [cite: 98] |
| `hostname` | [cite_start]호스트명 [cite: 98] |
| `uptime` | [cite_start]서버 가동 시간 [cite: 98] |
| `date` | [cite_start]현재 날짜/시간 [cite: 98] |
| `lscpu` | [cite_start]CPU 정보 [cite: 98] |
| `free -h` | [cite_start]메모리 사용량 [cite: 98] |
| `vmstat` | [cite_start]가상 메모리 통계 [cite: 98] |
| `iostat` | [cite_start]디스크 I/O 통계 [cite: 98] |


## [cite_start]서비스 관리 (systemd) [cite: 99]

### [cite_start]systemctl [cite: 100]
| 명령어/플래그 | 설명 |
|---|---|
| `systemctl start [서비스]` | [cite_start]서비스 시작 [cite: 101] |
| `systemctl stop [서비스]` | [cite_start]서비스 중지 [cite: 101] |
| `systemctl restart [서비스]` | [cite_start]재시작 [cite: 101] |
| `systemctl status [서비스]` | [cite_start]상태 확인 [cite: 101] |
| `systemctl enable [서비스]` | [cite_start]부팅 시 자동 시작 [cite: 101] |
| `systemctl disable [서비스]` | [cite_start]자동 시작 해제 [cite: 101] |
| `systemctl list-units --type=service` | [cite_start]서비스 목록 [cite: 101] |


## [cite_start]로그 확인 [cite: 102]

### [cite_start]journalctl [cite: 103]
| 명령어/플래그 | 설명 |
|---|---|
| `journalctl` | [cite_start]전체 로그 [cite: 104] |
| `journalctl -f` | [cite_start]실시간 로그 [cite: 104] |
| `journalctl -u [서비스]` | [cite_start]특정 서비스 로그 [cite: 104] |
| `journalctl --since "1 hour ago"` | [cite_start]최근 1시간 로그 [cite: 104] |
| `journalctl -p err` | [cite_start]에러 레벨 이상만 [cite: 104] |

### [cite_start]dmesg [cite: 105]
| 명령어/플래그 | 설명 |
|---|---|
| `dmesg` | [cite_start]커널 메시지 [cite: 106] |
| `dmesg -T` | [cite_start]타임스탬프 표시 [cite: 106] |


## [cite_start]기타 유용한 명령어 [cite: 107]

### [cite_start]파일 관련 [cite: 108]
| 명령어/플래그 | 설명 |
|---|---|
| `file [파일]` | [cite_start]파일 타입 확인 [cite: 109] |
| `stat [파일]` | [cite_start]파일 상세 정보 [cite: 109] |
| `touch [파일]` | [cite_start]빈 파일 생성 / 시간 갱신 [cite: 109] |
| `ln -s [원본] [링크]` | [cite_start]심볼릭 링크 생성 [cite: 109] |

### [cite_start]기타 [cite: 110]
| 명령어/플래그 | 설명 |
|---|---|
| `echo [텍스트]` | [cite_start]텍스트 출력 [cite: 111] |
| `history` | [cite_start]명령어 기록 [cite: 111] |
| `man [명령어]` | [cite_start]매뉴얼 보기 [cite: 111] |
| `alias [이름]='[명령어]'` | [cite_start]단축 명령어 만들기 [cite: 111] |
| `which [명령어]` | [cite_start]명령어 실제 경로 [cite: 111] |
| `env` | [cite_start]환경변수 출력 [cite: 111] |
| `export [변수]=[값]` | [cite_start]환경변수 설정 [cite: 111] |


## [cite_start]터미널 세션 관리 [cite: 112]

### [cite_start]tmux [cite: 113]
| 명령어/플래그 | 설명 |
|---|---|
| `tmux` | [cite_start]새 세션 시작 [cite: 114] |
| `tmux new -s [이름]` | [cite_start]이름 지정 세션 시작 [cite: 114] |
| `tmux ls` | [cite_start]세션 목록 [cite: 114] |
| `tmux attach -t [이름]` | [cite_start]세션 다시 붙기 [cite: 114] |
| `tmux kill-session -t [이름]` | [cite_start]세션 삭제 [cite: 114] |
| `Ctrl+B D` | [cite_start]세션 detach [cite: 114] |
| `Ctrl+B C` | [cite_start]새 창 [cite: 114] |
| `Ctrl+B N` | [cite_start]다음 창 [cite: 114] |
| `Ctrl+B %` | [cite_start]세로 분할 [cite: 114] |
| [cite_start]`Ctrl+B "` | 가로 분할 [cite: 114] |

### [cite_start]screen [cite: 115]
| 명령어/플래그 | 설명 |
|---|---|
| `screen` | [cite_start]새 세션 시작 [cite: 116] |
| `screen -S [이름]` | [cite_start]이름 지정 세션 [cite: 116] |
| `screen -ls` | [cite_start]세션 목록 [cite: 116] |
| `screen -r [이름]` | [cite_start]세션 다시 붙기 [cite: 116] |
| `Ctrl+A D` | [cite_start]세션 detach [cite: 116] |
| `Ctrl+A C` | [cite_start]새 창 [cite: 116] |
| `Ctrl+A N` | [cite_start]다음 창 [cite: 116] |

### [cite_start]nohup [cite: 117]
| 명령어/플래그 | 설명 |
|---|---|
| `nohup [명령어] &` | [cite_start]터미널 종료해도 계속 실행 [cite: 118] |
| `nohup [명령어] > [파일] &` | [cite_start]출력을 파일에 저장 [cite: 118] |


## [cite_start]고급 파일 동기화 [cite: 119]

### [cite_start]rsync [cite: 120]
| 명령어/플래그 | 설명 |
|---|---|
| `rsync -av [원본] [대상]` | [cite_start]로컬 동기화 [cite: 121] |
| `rsync -avz [원본] [user@host:대상]` | [cite_start]원격 동기화 [cite: 121] |
| `rsync -avz --delete [원본] [대상]` | [cite_start]원본에 없는 파일 삭제 [cite: 121] |
| `rsync -avz --progress [원본] [대상]` | [cite_start]진행상황 표시 [cite: 121] |
| [cite_start]`-a` | archive 모드 (권한, 시간 유지) [cite: 121] |
| [cite_start]`-v` | verbose [cite: 121] |
| `-z` | [cite_start]압축 [cite: 121] |


## [cite_start]파이프 & 리다이렉션 [cite: 122]
| 기호 | 설명 |
|---|---|
| `&#124;` | [cite_start]앞 출력을 다음 입력으로 [cite: 123] |
| `>` | [cite_start]출력을 파일로 (덮어쓰기) [cite: 123] |
| `>>` | [cite_start]출력을 파일에 추가 [cite: 123] |
| `<` | [cite_start]파일을 입력으로 [cite: 123] |
| `2>` | [cite_start]에러를 파일로 [cite: 123] |
| `2>&1` | [cite_start]에러를 표준 출력으로 [cite: 123] |
| `&` | [cite_start]백그라운드 실행 [cite: 123] |
| `&&` | [cite_start]앞 성공 시 다음 실행 [cite: 123] |
| `&#124;&#124;` | [cite_start]앞 실패 시 다음 실행 [cite: 123] |