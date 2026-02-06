# TrendStream Frontend

## 1. Project Overview
IT 뉴스를 수집하고 AI로 분석한 결과를 보여주는 웹 서비스의 프론트엔드입니다.
백엔드(Spring Boot)에서 제공하는 REST API를 호출하여 뉴스 데이터를 표시합니다.

## 2. Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query v5 (React Query)
- **HTTP Client**: Fetch API
- **Deployment**: Vercel

## 3. Backend API Reference

### 3.1 Base URL
- **Development**: `http://localhost:8081`
- **Production**: (배포 후 업데이트)

### 3.2 Endpoints

| Method | Path | Description | Query Params |
|--------|------|-------------|--------------|
| GET | `/api/news` | 최신 뉴스 목록 | `page`, `size` |
| GET | `/api/news/{id}` | 뉴스 상세 조회 | - |
| GET | `/api/news/search` | 키워드 검색 | `keyword`, `page`, `size` |
| GET | `/api/news/popular` | 인기 뉴스 (AI 점수순) | `page`, `size` |
| GET | `/api/trends` | 트렌드 키워드 순위 | `period`, `limit` |

### 3.3 Response Types

#### NewsResponseDto
```typescript
export interface NewsResponseDto {
  id: number;
  title: string;
  link: string;
  description: string;
  source: string;
  type: 'NEWS' | 'BLOG' | 'COMMUNITY';
  pubDate: string; // ISO 8601 format: "2026-02-03T00:20:00"
  aiResult: AiResponse | null;
  tags: string[];
}

export interface AiResponse {
  summary: string;      // AI가 생성한 3줄 요약
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  keywords: string[];   // 추출된 키워드 (예: ["AI", "Spring"])
  score: number;        // 중요도 점수 (0-100)
}
```

#### TrendResponseDto
```typescript
export interface TrendResponseDto {
  keyword: string;
  count: number;
  relatedNews: NewsSummary[];
}

export interface NewsSummary {
  id: number;
  title: string;
  link: string;
}
```

#### Page Response (Spring Data)
```typescript
export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}
```

### 3.4 API 호출 예시

```typescript
// 최신 뉴스 조회
const response = await fetch('http://localhost:8081/api/news?page=0&size=10');
const data: Page<NewsResponseDto> = await response.json();

// 키워드 검색
const response = await fetch('http://localhost:8081/api/news/search?keyword=AI&page=0&size=10');

// 인기 뉴스
const response = await fetch('http://localhost:8081/api/news/popular?page=0&size=10');

// 상세 조회
const response = await fetch('http://localhost:8081/api/news/1');
const news: NewsResponseDto = await response.json();
```

## 4. Project Structure

```
trendstream-frontend/
├── app/
│   ├── page.tsx                 # 홈 (최신 뉴스 목록)
│   ├── layout.tsx               # 공통 레이아웃 (Nav + Footer)
│   ├── globals.css              # 전역 스타일 + 애니메이션
│   ├── providers.tsx            # TanStack Query Provider
│   ├── api.ts                   # API 클라이언트 함수
│   ├── types.ts                 # TypeScript 타입 정의
│   ├── news/
│   │   ├── [id]/
│   │   │   └── page.tsx         # 뉴스 상세 페이지
│   │   └── search/
│   │       └── page.tsx         # 검색 결과 페이지
│   ├── popular/
│   │   └── page.tsx             # 인기 뉴스 페이지
│   └── trends/
│       └── page.tsx             # 트렌드 키워드 순위 페이지
├── components/
│   ├── NewsCard.tsx             # 뉴스 카드 컴포넌트
│   ├── NewsList.tsx             # 뉴스 목록 (그리드)
│   ├── SearchBar.tsx            # 검색바 (애니메이션)
│   ├── Pagination.tsx           # 페이지네이션
│   ├── SentimentBadge.tsx       # 감정 분석 배지
│   ├── ScoreBadge.tsx           # 중요도 점수 배지
│   └── TrendCard.tsx            # 트렌드 키워드 카드 (아코디언)
├── .env.local                   # 환경 변수
└── package.json
```

## 5. Implemented Features

### 5.1 페이지
| 페이지 | 경로 | 기능 |
|--------|------|------|
| 홈 | `/` | 최신 뉴스 목록, 검색바, 페이지네이션 |
| 검색 | `/news/search` | 키워드 검색, 결과 수 표시 |
| 인기 뉴스 | `/popular` | AI 점수순 정렬 |
| 트렌드 | `/trends` | 키워드 순위, 기간별 필터, 관련 뉴스 |
| 상세 | `/news/[id]` | AI 분석 결과, 원문 링크 |

### 5.2 컴포넌트
- **NewsCard**: 뉴스 타입 배지, 제목, AI 요약, 키워드 태그, 점수/감정 배지
- **NewsList**: 반응형 그리드 (1/2/3열), 로딩 애니메이션
- **SearchBar**: 포커스 애니메이션, 그라데이션 버튼
- **Pagination**: 5페이지 단위 표시, 첫/마지막 페이지 이동
- **SentimentBadge**: 아이콘 + 한글 라벨 (긍정/부정/중립)
- **ScoreBadge**: HOT 뱃지 (80+), 점수별 그라데이션
- **TrendCard**: 순위 배지 (1~3위 강조), 언급 횟수 바, 관련 뉴스 아코디언

### 5.3 UI/UX
- Glass morphism 네비게이션
- 카드 호버 효과 (translateY + shadow)
- 로딩 스피너 애니메이션
- 에러/빈 상태 UI
- 반응형 디자인 (모바일 최적화)
- Inter 폰트 적용

## 6. Design System

### 6.1 색상 가이드

**감정 분석 (Sentiment)**
| 상태 | 배경 | 텍스트 |
|------|------|--------|
| POSITIVE | `bg-emerald-50` | `text-emerald-700` |
| NEGATIVE | `bg-red-50` | `text-red-700` |
| NEUTRAL | `bg-slate-50` | `text-slate-600` |

**점수 (Score)**
| 범위 | 스타일 | 라벨 |
|------|--------|------|
| 80-100 | 빨강-주황 그라데이션 | HOT (펄스 애니메이션) |
| 60-79 | 주황-노랑 그라데이션 | 점수 표시 |
| 40-59 | `bg-amber-100` | 점수 표시 |
| 0-39 | `bg-slate-100` | 점수 표시 |

**뉴스 타입**
| 타입 | 스타일 |
|------|--------|
| NEWS | `bg-blue-100 text-blue-700` |
| BLOG | `bg-purple-100 text-purple-700` |
| COMMUNITY | `bg-green-100 text-green-700` |

### 6.2 애니메이션
- `animate-fade-in`: 카드 등장 (opacity + translateY)
- `animate-spin`: 로딩 스피너
- `badge-hot`: HOT 배지 펄스 효과
- `card-hover`: 카드 호버 (translateY -4px)

## 7. Environment Variables

```env
# .env.local (개발)
NEXT_PUBLIC_API_URL=http://localhost:8081

# .env.production (프로덕션)
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 8. Development Commands

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start

# 린트
npm run lint
```

## 9-1. CORS 설정 (백엔드)

프론트엔드 개발 시 CORS 에러가 발생하면 백엔드 설정 필요:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

## 9-2. Troubleshooting 기록 규칙

개발 중 발생하는 모든 문제와 해결 과정은 **`TROUBLESHOOTING.md`** 에 기록한다.

각 항목에는 다음을 포함할 것:
- **증상**: 에러 메시지 또는 문제 상황
- **원인 분석**: 왜 발생했는지 개념 수준에서 설명
- **해결 방법**: 실제 변경한 코드와 설정
- **핵심 개념**: 학습할 수 있는 포인트 정리

## 10. Deployment (Vercel)

1. GitHub에 push
2. Vercel 연동 (https://vercel.com)
3. Environment Variables 설정 (`NEXT_PUBLIC_API_URL`)
4. 자동 배포 완료

## 11. Related Resources

- **Swagger UI**: `http://localhost:8081/swagger-ui.html`
- **API Docs (JSON)**: `http://localhost:8081/v3/api-docs`
- **백엔드 저장소**: `C:\Users\kyobin\Desktop\study\TrendStream`
- **백엔드 문서**: `TrendStream/CLAUDE.md`, `TrendStream/TROUBLESHOOTING.md`

## 12. Development Progress

### Completed (2026-02-04)
- [x] Next.js 프로젝트 초기화 (TypeScript, Tailwind CSS, App Router)
- [x] 환경 변수 설정 (`.env.local`)
- [x] TypeScript 타입 정의 (`types.ts`)
- [x] API 클라이언트 구현 (`api.ts`)
- [x] TanStack Query Provider 설정
- [x] 모든 페이지 구현 (홈, 검색, 인기, 상세)
- [x] 모든 컴포넌트 구현 (NewsCard, NewsList, SearchBar, Pagination, 배지들)
- [x] UI/UX 디자인 개선 (Glass morphism, 애니메이션, 반응형)
- [x] 로딩/에러/빈 상태 UI
- [x] Suspense boundary 적용 (Next.js 16 대응)
- [x] 트렌드 페이지 구현 (기간별 키워드 순위, 관련 뉴스 아코디언)

## 13. Future Feature Ideas (검토용)

### 13.1 사용자 경험 개선
- [ ] **다크 모드**: 시스템 설정 연동 + 토글 버튼
- [ ] **무한 스크롤**: 페이지네이션 대체 옵션 (Intersection Observer)
- [ ] **스켈레톤 UI**: 로딩 중 레이아웃 미리보기
- [ ] **키워드 자동완성**: 검색 시 인기 키워드 추천
- [ ] **최근 검색어**: 로컬스토리지 저장 + 빠른 재검색

### 13.2 기능 확장
- [ ] **북마크/스크랩**: 관심 뉴스 저장 (로컬스토리지 또는 백엔드 연동)
- [ ] **공유 기능**: 카카오톡, 트위터, 링크 복사
- [ ] **카테고리 필터**: AI, 클라우드, 보안 등 카테고리별 필터링
- [ ] **날짜 필터**: 특정 기간 뉴스 조회
- [ ] **정렬 옵션**: 최신순/점수순/감정별 정렬

### 13.3 분석 및 시각화
- [ ] **트렌드 차트**: 키워드별 뉴스 수 추이 그래프
- [ ] **워드 클라우드**: 인기 키워드 시각화
- [ ] **감정 분석 통계**: 긍정/부정/중립 비율 파이차트
- [ ] **뉴스 타임라인**: 시간순 뉴스 흐름 표시

### 13.4 알림 및 구독
- [ ] **키워드 알림**: 특정 키워드 뉴스 등록 시 알림 (웹 푸시)
- [ ] **뉴스레터 구독**: 일간/주간 요약 이메일 발송
- [ ] **RSS 피드**: 개인화된 뉴스 피드 제공

### 13.5 성능 및 SEO
- [ ] **SSR/ISR 적용**: 검색 엔진 최적화
- [ ] **이미지 최적화**: next/image 활용
- [ ] **PWA 지원**: 오프라인 접근, 앱 설치
- [ ] **메타 태그 동적 생성**: 뉴스별 OG 이미지

### 13.6 관리자 기능 (백엔드 연동 필요)
- [ ] **대시보드**: 전체 뉴스 수, 수집 현황, 에러 로그
- [ ] **수동 수집 트리거**: 특정 소스 즉시 수집
- [ ] **AI 분석 재실행**: 특정 뉴스 재분석

---

**Note**: 추가 기능은 백엔드 API 지원 여부 확인 후 구현 가능합니다.
