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

// Stats Types
export interface SourceStats {
  source: string;
  count: number;
}

export interface HourlyStats {
  hour: number;
  count: number;
}

export interface DailyStats {
  date: string; // "2026-02-07"
  count: number;
}

export interface Dashboard {
  totalToday: number;
  totalWeek: number;
  sourceStats: SourceStats[];
  hourlyStats: HourlyStats[];
  dailyStats: DailyStats[];
}

// Subscription Types
export interface SubscriptionCreateRequest {
  email: string;
  name: string;
  keyword: string;
}

export interface SubscriptionResponse {
  id: number;
  keyword: string;
  createdAt: string;
  lastNotifiedAt: string | null;
}

export interface UserSubscriptions {
  email: string;
  name: string;
  notificationEnabled: boolean;
  subscriptions: SubscriptionResponse[];
}
