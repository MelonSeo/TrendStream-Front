'use client';

import { useQuery } from '@tanstack/react-query';
import { getStatsDashboard } from '../api';
import Link from 'next/link';

export default function StatsPage() {
  const { data: dashboard, isLoading, error } = useQuery({
    queryKey: ['stats', 'dashboard'],
    queryFn: getStatsDashboard,
    refetchInterval: 60000, // 1분마다 갱신
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500">통계 데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-slate-600">통계 데이터를 불러올 수 없습니다</p>
        <Link href="/" className="text-blue-600 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const maxSourceCount = Math.max(...dashboard.sourceStats.map(s => s.count), 1);
  const maxHourlyCount = Math.max(...dashboard.hourlyStats.map(h => h.count), 1);
  const maxDailyCount = Math.max(...dashboard.dailyStats.map(d => d.count), 1);

  // 소스별 색상
  const sourceColors: Record<string, string> = {
    'Naver Open API': 'bg-green-500',
    'Hacker News': 'bg-orange-500',
    'GeekNews': 'bg-teal-500',
    'Velog': 'bg-emerald-500',
    'Dev.to': 'bg-purple-500',
    'Lobsters': 'bg-red-500',
    'YozmIT': 'bg-blue-500',
    'TechCrunch': 'bg-lime-500',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">통계 대시보드</h1>
          <p className="text-slate-500 mt-1">뉴스 수집 현황을 한눈에 확인하세요</p>
        </div>
        <div className="text-sm text-slate-400">
          자동 갱신: 1분마다
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">오늘 수집된 뉴스</p>
              <p className="text-4xl font-bold mt-2">{dashboard.totalToday.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Week */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">최근 7일간 수집</p>
              <p className="text-4xl font-bold mt-2">{dashboard.totalWeek.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            소스별 뉴스 (7일)
          </h2>
          <div className="space-y-3">
            {dashboard.sourceStats.map((stat) => (
              <div key={stat.source} className="flex items-center gap-3">
                <div className="w-24 text-sm text-slate-600 truncate" title={stat.source}>
                  {stat.source.replace(' Open API', '')}
                </div>
                <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${sourceColors[stat.source] || 'bg-slate-400'} transition-all duration-500 flex items-center justify-end pr-2`}
                    style={{ width: `${(stat.count / maxSourceCount) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {stat.count > 0 ? stat.count.toLocaleString() : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            일별 수집량 (7일)
          </h2>
          <div className="flex items-end justify-between h-48 gap-2">
            {dashboard.dailyStats.map((stat) => {
              const height = maxDailyCount > 0 ? (stat.count / maxDailyCount) * 100 : 0;
              const date = new Date(stat.date);
              const dayLabel = date.toLocaleDateString('ko-KR', { weekday: 'short' });
              const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`;

              return (
                <div key={stat.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs text-slate-500 font-medium">
                    {stat.count > 0 ? stat.count : '-'}
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 text-center">
                    <div className="font-medium">{dayLabel}</div>
                    <div>{dateLabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hourly Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          오늘 시간별 수집량
        </h2>
        <div className="flex items-end gap-1 h-32 overflow-x-auto pb-2">
          {Array.from({ length: 24 }, (_, hour) => {
            const stat = dashboard.hourlyStats.find(h => h.hour === hour);
            const count = stat?.count || 0;
            const height = maxHourlyCount > 0 ? (count / maxHourlyCount) * 100 : 0;
            const isCurrentHour = new Date().getHours() === hour;

            return (
              <div key={hour} className="flex-shrink-0 flex flex-col items-center gap-1" style={{ width: '32px' }}>
                <div
                  className={`w-6 rounded-t transition-all duration-300 ${
                    isCurrentHour
                      ? 'bg-gradient-to-t from-orange-500 to-orange-400'
                      : 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                  }`}
                  style={{ height: `${Math.max(height, count > 0 ? 8 : 0)}px` }}
                  title={`${hour}시: ${count}건`}
                />
                <span className={`text-xs ${isCurrentHour ? 'text-orange-600 font-bold' : 'text-slate-400'}`}>
                  {hour}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>수집 완료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span>현재 시간</span>
          </div>
        </div>
      </div>
    </div>
  );
}
