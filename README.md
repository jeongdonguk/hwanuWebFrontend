# 화누 프로젝트 – Frontend

반려견 보호자를 위한 커뮤니티 & 케어 서비스 **화누(Whanu)** 의 웹/앱 프론트엔드 리포지토리입니다. 인증, 게시판, 파일 업로드(미니오), 실시간 오픈채팅 UI, AI 챗봇 연동 화면을 제공합니다.

> 본 문서는 **현재 코드 기준**으로 작성되었으며, 새로운 화면/기능이 추가되면 이 문서는 업데이트 될 수 있습니다.

---

## 1) 소개 (Introduction)

* **역할**: 사용자 인증/세션 유지, 게시판 목록/상세, 댓글 보기, 파일 업로드(프리사인드 URL), 기본 레이아웃(Header/BoardTop), 홈/게시글 상세 페이지 구성.
* **백엔드 연동 베이스 경로**: `"/backendApi"` (Nginx 리버스 프록시)
* **토큰 처리**: Access Token은 Redux 상태를 통해 Axios 요청 헤더에 자동 부착, Refresh Token은 **쿠키** 기반(`withCredentials: true`) 재발급 흐름.

주요 화면

* **Home.jsx**: Header, BoardTop, Board 목록 컴포넌트 구성
* **Post.jsx**: 게시글 상세 + 토스트 UI 구성

---

## 2) 기술 스택 (Tech Stack)

* **Framework**: React
* **State Management**: Redux Toolkit (`createSlice`) – 인증 상태(email, hwanuAccessToken, isAuthenticated)
* **HTTP Client**: Axios (전역 인스턴스 + 요청/응답 인터셉터)
* **Auth 전략**:

  * Bearer **Access Token** → `Authorization: Bearer <token>` 자동 부착
  * **401** 응답 시 **단일 Refresh 재시도 + 요청 큐잉**으로 중복 재발급 방지
  * Refresh 호출은 **쿠키 기반**(헤더 토큰 미동봉)
* **Object Storage 업로드**: Presigned URL(서버 생성) → 브라우저가 **직접 MinIO**에 PUT 업로드
* **라우팅/UI 라이브러리**: (패키지에 따라 상이, 필요 시 본 문서 보강)

---

## 3) 대표 API (Frontend ↔ Backend 사용 엔드포인트)

> **주의**: 실제 백엔드 컨트롤러/보안 설정에 맞춰 변경될 수 있습니다. 아래는 프론트 코드에서 사용 중인 경로 기준입니다.

### 🔐 인증(Auth)

* `POST /auth/login` — 로그인 (email, password)
* `POST /auth/logout` — 로그아웃 (email)
* `POST /auth/me` — 현재 사용자 정보 (로그인 유지 체크 시 사용)
* `POST /auth/refresh` — Access Token 재발급 (**쿠키 기반**, `withCredentials: true`)

동작 요약

* 로그인 성공 시: Redux 상태에 사용자/토큰 저장 → Axios 요청 헤더 자동 세팅
* 401 응답: refresh 1회 시도(동시 요청은 큐로 대기) → 성공 시 원요청 재시도, 실패 시 전역 로그아웃

### 📝 게시판(Board)

* `GET /board/list` — 게시글 목록(페이지네이션: `page`, `size`)
* `GET /board/public` — 비로그인 사용자용 공개 목록
* `GET /board/postRead?boardId=<id>` — 게시글 상세
* `GET /board/postComment?boardId=<id>` — 댓글 목록

### 📦 파일 업로드(Media / MinIO)

* `GET /mediaSaveApi/generate-upload-url?file_name=...&file_type=...` — **Presigned URL 발급 (서버)**
* `PUT <presignedUrl>` — 브라우저에서 **직접 업로드** (`Content-Type: <file.type>`, Body: 파일)

업로드 흐름

1. 프론트: 업로드 대상 파일 메타(`file_name`, `file_type`)로 **presigned URL** 발급 요청
2. 프론트: 받은 URL에 `PUT`으로 파일 바이트 업로드
3. 성공 시 URL/키를 백엔드 도메인 객체에 매핑(필요 시)

---

## 실행 방법 (Local Development)

> 실제 스크립트는 `package.json` 을 확인하세요. 여기서는 일반적인 예시를 안내합니다.

### 1) 환경 변수

번들러에 따라 접두사가 다릅니다. (예: **Vite** → `VITE_`, **CRA** → `REACT_APP_`)

```
# .env (예시)
VITE_API_BASE=/backendApi
# 또는
REACT_APP_API_BASE=/backendApi
```

현재 코드는 Axios 인스턴스가 `baseURL: "/backendApi"` 로 고정되어 있으므로, **Nginx 리버스 프록시**에서 `/backendApi` → 백엔드로 전달하도록 설정해야 합니다.

### 2) 백엔드 프록시(Nginx 예시)

```nginx
location /backendApi/ {
  proxy_pass http://backend:8080/; # Spring Boot
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 3) 개발 서버

```
# 예시 (프로젝트 설정에 맞게 조정)
npm install
npm run dev   # or npm start
```

---

## 빌드 & 배포

* 정적 빌드 산출물을 **Nginx** 로 서빙 (예: `/usr/share/nginx/html`)
* 백엔드는 위의 `/backendApi` 프록시로 연결

---

## 인증 흐름 상세 (중요)

**요청 인터셉터**

* Redux의 `hwanuAccessToken` 을 읽어 `Authorization: Bearer <token>` 자동 부착

**응답 인터셉터**

* `401` 수신 시, `/auth/refresh` 를 **1회만** 시도
* 동시 다중 401 발생 시 **큐에 대기** → 새 토큰 수령 후 원요청 일괄 재시도
* Refresh 실패 시 전역 `logout` 디스패치 → 세션 초기화

**베스트 프랙티스**

* Refresh 응답의 토큰 키 이름(예: `accessToken` vs `hwanuAccessToken`)은 **프론트/백엔드 간 일관** 유지
* `/auth/me` 는 일반적으로 `GET` 이 자연스럽지만, 현재 구현이 `POST` 라면 서버와 합의 필요

---

## 코드 스니펫 (요약)

### 로그인 액션

```js
// dispatch(login(email, password))
const data = await loginUser(email, password);
dispatch(loginSuccess(data)); // { email, hwanuAccessToken }
```

### 보드 목록 호출

```js
const { content, totalElements } = await fetchBoardList(0, 10);
```

### 프리사인드 업로드

```js
const { url } = await getPostFileUploadUrl(file.name, file.type);
await UploadFile(file, url);
```

---

