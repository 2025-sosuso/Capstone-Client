<img width="1366" height="768" alt="AI 기반 유튜브 댓글 분석 및 사용자 인사이트 도출 서비스 (1)" src="https://github.com/user-attachments/assets/e22bfdf0-3476-4cd9-830e-217ff58136e2" />

<br>
 
# AI 기반 유튜브 댓글 분석 및 사용자 인사이트 도출 서비스

> 유튜브 영상의 방대한 댓글 데이터를 AI로 분석하여 요약, 감정 분석, 논란 탐지 등 다양한 인사이트를 제공합니다. 시청자와 크리에이터 모두 댓글 반응을 한눈에 확인할 수 있습니다.

<br>

## 🛠️ 기술 스택

### Frontend

&ensp;![Frontend Stack](https://go-skill-icons.vercel.app/api/icons?i=vercel,nextjs,ts,tailwind,axios,yarn)

### Backend

&ensp;![Backend Stack](https://go-skill-icons.vercel.app/api/icons?i=spring,java,mysql,aws,docker)

### AI

&ensp;![AI Stack](https://go-skill-icons.vercel.app/api/icons?i=fastapi,python)

<br>

## 시스템 아키텍쳐

<img width="1456" height="819" alt="image" src="https://github.com/user-attachments/assets/68003fd1-07db-4fb3-8b25-92604a1ed0b5" />

<br>

## ✨ 주요 기능

### 1. 메인 페이지

- **관심 채널 최신 영상**: 자주 보는 채널의 새 영상을 한눈에 확인
- **지금 핫한 영상**: 지금 가장 핫한 영상 순위
- **스크랩한 영상**: 내가 저장한 영상 모음

### 2. 영상 상세 분석

- **AI 댓글 요약**: 수많은 댓글을 3줄로 압축해서 보여줌
- **세부 감정 분석**: 댓글을 긍정/부정/기타 3가지의 감정과 기쁨/사랑/분노/슬픔/두려움/놀람/중립 7가지 세부감정으로 분류
- **감정 변화 흐름**: 시간에 따른 댓글 분위기의 변화를 그래프로 표시
- **주요 키워드**: 댓글에서 많이 언급된 키워드를 한눈에 볼 수 있게 표시
- **댓글 검색 & 필터**: 원하는 키워드나 감정으로 댓글 골라보기
- **논란 키워드 감지**: 논란이 있을 수 있는 영상을 탐지하여 주의 문구 표시
- **시간대 분석**: 댓글이 가장 많이 달린 시간과 영상에서 가장 화제가 된 구간 Top 5
- **언어 분포**: 전체 댓글의 언어 비율을 원형 그래프로 표현

### 3. 단어 검색

- 댓글에서 모르는 단어를 드래그하면 검색 툴팁 자동 표시
- 요즘 유행하는 밈이나 신조어 뜻 확인 가능

### 4. 영상 비교

- 최대 3개 영상 나란히 비교
- 감정 분석, 키워드, 논란 수준 등 다양한 분석 결과 비교

### 5. 스크랩

- 클릭 한 번으로 영상 저장/삭제
- 저장한 영상 목록을 한곳에서 관리

### 6. 지금 핫한

- 서비스 내 조회수 기반 실시간 랭킹
- 지금 화제인 영상 빠르게 확인 가능

### 7. 검색

- **키워드 검색**: 채널, 동영상, 쇼츠 검색
- **링크 검색**: 유튜브 URL 입력하면 바로 분석 페이지 이동

<br>

## 🚀 시작하기

### 설치

```bash
yarn install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### 개발 서버 실행

```bash
yarn dev
```

<br>

## 📁 프로젝트 구조

```
src/
├── app/                          # 페이지 라우팅 (App Router)
│   ├── page.tsx                  # 메인 페이지
│   ├── videos/[videoId]/page.tsx # 영상 상세 분석 페이지
│   ├── compare/page.tsx          # 영상 비교 페이지
│   ├── search/page.tsx           # 검색 페이지
│   ├── scraps/page.tsx           # 스크랩 목록 페이지
│   ├── trending/page.tsx         # 인기 급상승 페이지
│   └── login/page.tsx            # 로그인 페이지
├── components/                   # React 컴포넌트
│   ├── common/                   # 공통 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   └── videos/                   # 영상 관련 컴포넌트
├── hooks/                        # Custom React Hooks
├── services/                     # API 서비스 로직
├── contexts/                     # Context API 관련
└── types/                        # TypeScript 타입 정의
```

<br>

## 📝 커밋 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가 또는 수정
- `chore`: 빌드 업무, 패키지 매니저 설정 등

<br>

## 👥 팀원

| 역할       | 이름  | GitHub                                   |
|----------|-----|------------------------------------------|
| Frontend | 최윤경 | [@yunnb](https://github.com/yunnb)       |
| Backend  | 강예린 | [@kyer5](https://github.com/kyer5)       |
| Backend  | 차주혜 | [@Alal11](https://github.com/Alal11)     |
| AI       | 이소민 | [@isoxosoi](https://github.com/isoxosoi) |

<br>

---

<div align="center">
  <p>2025 팀 소수소</p>
</div>
