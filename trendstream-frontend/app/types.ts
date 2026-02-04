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
