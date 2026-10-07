# Ubuntu 서버 고정 IP 변경하기: netplan과 NetworkManager

기관 정책으로 공인 IP에서 사설 IP로 전환하는 작업을 하다가 알게 된 내용 정리.  
문제: **같은 Ubuntu인데도 IP 설정 방식이 서버마다 달랐다.**  
  - netplan YAML
  - `nmcli`

---

## 1. netplan vs NetworkManager

Ubuntu 17.10부터 네트워크 설정의 **프론트엔드**는 netplan으로 통일됐다. 하지만 netplan은 실제로 네트워크를 제어하지 않는다. YAML 설정을 읽어서 **백엔드(renderer)에게 넘기는 역할**만 한다.

```
/etc/netplan/*.yaml
        │
        ▼
     netplan  ← 프론트엔드 (설정 파일 파싱)
        │
        ├──▶ systemd-networkd   ← 서버 설치본 기본
        └──▶ NetworkManager     ← 데스크톱 설치본 기본
```

그래서 **어떤 renderer를 쓰느냐에 따라 실제 설정을 어디에 써야 하는지가 달라진다.**

| 설치 방식 | 기본 renderer | IP 설정 위치 |
|---|---|---|
| Ubuntu Server (subiquity 설치) | `systemd-networkd` | netplan YAML에 직접 |
| Ubuntu Desktop | `NetworkManager` | NetworkManager 프로필 (`nmcli`) |

연구실 서버가 뒤섞여 있던 이유도 이거였다. 서버판으로 깐 머신과 데스크톱판으로 깐 머신이 섞여 있었던 것.

---

## 2. 내 서버는 어느 쪽인가

- 서버 확인 방법

```bash
cat /etc/netplan/*.yaml
```

### 케이스 A — netplan에 IP가 직접 있다

```yaml
# This is the network config written by 'subiquity'
network:
  ethernets:
    enpXXsXfX:
      addresses:
        - X.X.X.X/24
      nameservers:
        addresses:
          - X.X.X.X
          - X.X.X.X
      routes:
        - to: default
          via: X.X.X.X
  version: 2
```

`# written by 'subiquity'` 주석과 `addresses:` 항목이 보이면 **systemd-networkd 방식**이다. 이 파일을 직접 고치면 된다.

### 케이스 B — renderer 위임만 있다

```yaml
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
```

이게 전부고 IP가 없다면 **NetworkManager 방식**이다. YAML을 아무리 봐도 IP가 없는 이유는, 실제 설정이 `/etc/NetworkManager/system-connections/` 아래 프로필 파일에 들어 있기 때문이다.

이 경우 **YAML에 IP를 직접 쓰면 안 된다.** 설정이 두 군데로 갈려서 꼬인다. `nmcli`로 통일해야 한다.

### 확실하지 않을 때

```bash
nmcli con show
```

정상적으로 연결 목록이 나오고 거기에 IP가 붙어 있으면 NetworkManager 방식이다. `nmcli`가 없거나 에러가 나면 systemd-networkd 방식.

---

## 3. 방식 A: netplan YAML 직접 수정

### 3-1. 현재 인터페이스 확인

```bash
ip -4 a
ip route
```

여기서 **실제 IP가 붙어 있는 인터페이스**를 찾는다. 서버에는 NIC가 여러 개 달려 있는 경우가 많고, 이름도 제각각이다.

- `eno1` — 온보드 1번 포트
- `enp193s0f1` — PCI 193번 슬롯, 포트 1
- `ens8f0` — PCI 슬롯 8, 포트 0
- `enxXXXXXXXXXXXX` — MAC 주소 기반 (USB 랜, BMC/IPMI 계열)

이름이 서버마다 다른 건 **커널이 하드웨어의 물리적 위치를 보고 자동으로 붙이기 때문**이다. 정상이니 놀라지 말 것.

> **주의**: `169.254.x.x` 같은 link-local 주소가 붙은 인터페이스는 대개 BMC/IPMI 관리 포트다. **건드리면 안 된다.**

### 3-2. 백업하고 수정

```bash
sudo cp /etc/netplan/00-installer-config.yaml ~/netplan.bak
sudo vi /etc/netplan/00-installer-config.yaml
```

```yaml
network:
  ethernets:
    enpXXsXfX:              # 실제 인터페이스 이름 그대로
      addresses:
        - X.X.X.X/24        # 새 IP
      nameservers:
        addresses:
          - X.X.X.X         # 기관 DNS
          - X.X.X.X         # 보조 DNS
      routes:
        - to: default
          via: X.X.X.X      # 게이트웨이
  version: 2
```

YAML은 **들여쓰기가 문법**이다. 탭 쓰지 말고 스페이스로, 기존 파일의 들여쓰기를 그대로 따라가자.

### 3-3. 적용

```bash
sudo netplan try
```

`netplan try`는 설정을 적용한 뒤 **120초 안에 Enter를 누르지 않으면 자동으로 원복**한다. 원격 작업 중 설정을 잘못 넣어서 접속이 끊겨도 알아서 되돌려주는 안전장치다. 원격이라면 `apply` 대신 무조건 `try`를 쓰자.

확신이 서면:

```bash
sudo netplan apply
```

실행 중 이런 경고가 나올 수 있다.

```
WARNING:root:Cannot call Open vSwitch: ovsdb-server.service is not running.
```

Open vSwitch를 안 쓰는 시스템이라 나오는 것이고, **네트워크 설정과 무관하다. 무시해도 된다.**

---

## 4. 방식 B: NetworkManager (nmcli)

### 4-1. 연결 프로필 확인

```bash
nmcli con show
```

```
NAME                UUID                                  TYPE      DEVICE
Wired connection 3  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  ethernet  ensXfX
Wired connection 1  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  ethernet  enoX
Wired connection 2  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  ethernet  --
```

- **초록색으로 표시되는 줄** = 현재 활성 상태
- **DEVICE가 `--`** = 물린 장치가 없는 껍데기. 무시

여기서 중요한 건 **연결 이름(NAME)이 아니라 어떤 DEVICE에 실제 IP가 붙어 있느냐**다. `ip -4 a`로 확인한 인터페이스와 매칭되는 줄의 NAME을 쓴다.

`Wired connection 1`이 항상 정답이 아니다. 나는 `Wired connection 3`이 본선인 서버도 있었다.

### 4-2. 수정

```bash
sudo nmcli con mod "Wired connection N" \
  ipv4.method manual \
  ipv4.addresses X.X.X.X/24 \
  ipv4.gateway X.X.X.X \
  ipv4.dns "X.X.X.X X.X.X.X"

sudo nmcli con up "Wired connection N"
```

`ipv4.method manual`을 빼먹으면 DHCP 모드가 유지되어 설정이 안 먹는다. 꼭 넣자.

### 4-3. 확인

```bash
nmcli con show "Wired connection N" | grep ipv4
ip -4 a
ip route
```

---

## 5. 공통: 검증

설정 후 반드시 이 순서로 확인한다.

```bash
ip -4 a                  # 새 IP가 붙었나
ip route                 # default via 게이트웨이 가 있나
ping -c3 <게이트웨이IP>   # 게이트웨이까지 통신되나
ping -c3 8.8.8.8         # 외부로 나가나
ping -c3 google.com      # DNS 해석되나
```

**자기 자신을 ping하는 건 검증이 아니다.** 루프백으로 처리되어서 네트워크가 완전히 죽어 있어도 성공한다. 반드시 **게이트웨이**를 ping해야 한다.

### 게이트웨이 ping이 안 될 때

| 원인 | 확인 |
|---|---|
| 게이트웨이 주소가 틀림 | 배정 공문 재확인. `.1`이 아닐 수 있다 |
| 스위치 포트 VLAN 미변경 | 전산실 문의. 서버 설정만으로는 해결 불가 |
| 인터페이스 이름 오타 | `ip -4 a`로 재확인 |

특히 **게이트웨이가 `.1`이라고 단정하면 안 된다.** 내가 만진 환경은 기존 게이트웨이가 `.5`였다. 배정받은 값을 그대로 넣자.

---

## 6. 원격(SSH)에서만 작업해야 한다면

IP를 바꾸는 순간 **SSH 세션은 반드시 끊긴다.** 콘솔 접근이 불가능한 상황이라면 안전장치가 필요하다.

### 최선: `netplan try` 사용

```bash
sudo netplan try
```

120초 안에 새 IP로 접속해서 확인 못 하면 자동 원복. netplan 방식이면 이게 답이다.

### nmcli 방식이라면: 롤백 타이머 예약

```bash
# 10분 뒤 무조건 원복하는 예약
echo "sudo cp ~/netplan.bak /etc/netplan/00-installer-config.yaml && sudo netplan apply" \
  | sudo at now + 10 minutes

# 새 IP로 접속 성공하면 예약 취소
sudo atrm $(sudo atq | awk '{print $1}')
```

### 세션과 분리해서 실행

명령 실행 도중 SSH가 끊기면 뒷부분이 실행 안 될 수 있다. `nohup`으로 분리한다.

```bash
sudo bash -c 'nohup sh -c "sleep 2; netplan apply" >/dev/null 2>&1 &'
```

### 그래도 IPMI/BMC가 있으면 그걸 쓰자

대부분의 서버에는 IPMI/iDRAC/iLO 같은 원격 콘솔이 있다. 이게 있으면 IP를 잘못 넣어도 언제든 복구 가능하다. **네트워크 설정 만지기 전에 IPMI 접속이 되는지부터 확인**하는 게 정석이다.

---

## 7. NFS를 쓴다면 — 여기가 진짜 함정

IP 변경 자체는 5분이면 끝난다. **시간을 다 잡아먹은 건 NFS였다.**

### 7-1. tmux 작업은 살아남는다, 하지만

SSH가 끊겨도 tmux 안에서 돌던 프로세스는 죽지 않는다. 하지만 **NFS 마운트를 읽고 있던 프로세스는 얘기가 다르다.**

IP가 바뀌면 기존 NFS 세션이 깨지는데, 마운트 옵션이 `hard`(기본값)면 클라이언트가 **무한히 재시도하며 매달린다.** 그 결과 프로세스가 **D-state(uninterruptible sleep)** 로 빠진다.

```bash
ps -eo pid,stat,wchan:25,comm | grep python
```

```
3868648 D+   rpc_wait_bit_killable     torchrun
```

`D` 상태는 **`kill -9`도 안 먹는다.** 커널 레벨 I/O 대기라서 시그널이 전달되지 않는다.

### 7-2. 그래서 순서가 중요하다

```
1. NFS 서버의 /etc/exports에 신규 IP 대역 미리 추가 (선행!)
2. 클라이언트: 작업 정지 → NFS 전부 언마운트
3. 전 서버 IP 변경
4. 서로 ping 확인
5. 클라이언트: fstab 또는 /etc/hosts의 NFS 서버 주소 갱신
6. 재마운트
7. 작업 재개
```

### 7-3. 언마운트 요령

경로가 많으면 하나씩 칠 필요 없다.

```bash
# NFS만 골라서 전부
sudo umount -a -t nfs,nfs4
```

`device is busy`가 나오면 누가 쓰고 있는 것:

```bash
sudo fuser -vm /마운트경로
```

```
                     USER        PID ACCESS COMMAND
/home/user/data:     root     kernel mount /home/user/data
                     user     430071 ..c.. bash
```

여기서 **ACCESS 컬럼의 `c`는 current directory**라는 뜻이다. 즉 어떤 셸이 그 안에 `cd`만 해둔 것뿐이고, 실행 중인 작업은 없다. 이럴 땐 그냥 lazy 언마운트로 안전하게 뗄 수 있다.

```bash
sudo umount -a -f -l -t nfs,nfs4
```

- `-f` force
- `-l` lazy — 새 접근은 차단하고, 기존 참조는 정리되는 대로 해제

**lazy 언마운트가 D-state를 푸는 데도 효과적이다.** 마운트가 떨어지면서 매달려 있던 프로세스가 I/O 에러를 받고 정상 종료된다. 실제로 이 방법으로 리부팅 없이 살렸다.

### 7-4. exports 확인

NFS 서버의 `/etc/exports`에 클라이언트 IP가 **하드코딩되어 있으면 반드시 갱신해야 한다.**

```
# 이런 줄은 IP가 바뀌면 접근 거부됨
/home/user  X.X.X.X(rw,sync,no_subtree_check) X.X.X.Y(rw,...)

# 이런 줄은 IP 무관하게 열려 있어서 그대로 동작
/data       *(rw,sync,no_subtree_check)
```

수정 후:

```bash
sudo exportfs -ra      # 재적용
sudo exportfs -v       # 반영 확인
```

클라이언트에서 확인:

```bash
showmount -e <NFS서버IP>
```

> **보안 팁**: `*`로 열려 있으면 같은 대역의 아무 머신이나 마운트할 수 있다. 사설망 전환은 exports를 대역 단위(`10.x.x.0/24`)나 특정 IP로 조이는 좋은 기회다.

### 7-5. `df`가 멈추면 stale이다

가장 헷갈렸던 증상.

```bash
findmnt -t nfs,nfs4    # 목록은 잘 나옴
df -h | grep nfs       # 아무것도 안 나오고 멈춤
```

`findmnt`는 **커널 마운트 테이블만 읽는다.** 그래서 실제 연결이 죽어 있어도 목록은 보인다. 반면 `df`는 각 마운트에 실제로 `statfs()`를 호출하기 때문에, 응답이 없으면 그대로 hang된다.

**즉 `df`가 즉시 응답하는지가 NFS 정상 여부의 진짜 판단 기준이다.**

### 7-6. 재마운트

```bash
sudo systemctl daemon-reload    # fstab 수정했다면 필수
sudo mount -a
```

> `mount -a`와 `mount --all`은 완전히 같은 명령이다. `-a`가 짧은 옵션, `--all`이 긴 옵션일 뿐.

`mount -a`는 fstab을 **직렬로** 처리한다. 마운트가 9개면 하나씩 순서대로 세션을 맺기 때문에 시간이 걸릴 수 있다. **중간에 Ctrl+C로 끊지 말자.** 반쯤 맺힌 세션이 남아서 상황이 더 나빠진다.

진행 상황이 궁금하면 다른 창에서:

```bash
watch -n2 'findmnt -t nfs,nfs4 | wc -l'
```

특정 마운트에서 계속 막히면 그것만 verbose로:

```bash
sudo mount -v -t nfs4 <서버IP>:/원본경로 /마운트경로
```

에러 메시지가 나오면 원인을 알 수 있다.

| 메시지 | 원인 |
|---|---|
| `access denied by server` | exports 허용목록 |
| `Connection timed out` | 네트워크 / 방화벽 |
| `Stale file handle` | 서버측 세션 잔재 |
| `No route to host` | 라우팅 |

---

## 8. 정리: 체크리스트

**사전**
- [ ] IPMI/BMC 접근 가능한지 확인 (없으면 콘솔 앞에서 작업)
- [ ] 배정받은 IP / 게이트웨이 / DNS 확인 (게이트웨이가 `.1`이라고 단정 금지)
- [ ] `cat /etc/netplan/*.yaml`로 방식 판별
- [ ] `ip -4 a`로 실제 인터페이스 이름 확인
- [ ] NFS 서버 exports에 신규 IP 미리 추가

**작업**
- [ ] 설정 파일 백업
- [ ] NFS 클라이언트 전부 언마운트 (`umount -a -f -l -t nfs,nfs4`)
- [ ] IP 변경 (`netplan try` 또는 `nmcli con mod`)
- [ ] `ping <게이트웨이>` 로 검증

**사후**
- [ ] fstab / `/etc/hosts`의 NFS 서버 주소 갱신
- [ ] `systemctl daemon-reload` → `mount -a`
- [ ] **`df -h`가 즉시 응답하는지** 확인
- [ ] 방화벽 규칙, DNS A레코드, 외부 시스템 IP 화이트리스트 갱신

---

## 마무리

정리하고 보니 핵심은 세 가지다.

1. **netplan은 프론트엔드일 뿐이다.** 실제 백엔드가 뭔지 확인하고 거기에 맞는 도구를 써야 한다.
2. **자기 자신 ping은 검증이 아니다.** 게이트웨이를 ping하자.
3. **NFS가 있으면 IP 변경보다 NFS가 더 큰 일이다.** 순서를 지키고, `df`가 멈추는지로 상태를 판단하자.

IP 바꾸는 건 진짜 5분이면 끝난다. 나머지 시간은 전부 NFS와 씨름하는 데 썼다.
