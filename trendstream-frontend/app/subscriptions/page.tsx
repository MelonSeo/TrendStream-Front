'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserSubscriptions, subscribe, unsubscribe, getActiveKeywords } from '../api';
import { SubscriptionCreateRequest } from '../types';

export default function SubscriptionsPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', keyword: '' });

  // 내 구독 목록 조회
  const { data: userSubs, isLoading: isLoadingSubs, error: subsError } = useQuery({
    queryKey: ['subscriptions', searchedEmail],
    queryFn: () => getUserSubscriptions(searchedEmail),
    enabled: !!searchedEmail,
  });

  // 활성 키워드 목록 조회
  const { data: activeKeywords } = useQuery({
    queryKey: ['activeKeywords'],
    queryFn: getActiveKeywords,
  });

  // 구독 추가
  const subscribeMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', searchedEmail] });
      queryClient.invalidateQueries({ queryKey: ['activeKeywords'] });
      setFormData({ name: '', keyword: '' });
      setShowForm(false);
    },
  });

  // 구독 취소
  const unsubscribeMutation = useMutation({
    mutationFn: ({ email, keyword }: { email: string; keyword: string }) =>
      unsubscribe(email, keyword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', searchedEmail] });
      queryClient.invalidateQueries({ queryKey: ['activeKeywords'] });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSearchedEmail(email.trim());
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.keyword.trim()) return;

    const request: SubscriptionCreateRequest = {
      email: searchedEmail,
      name: formData.name.trim() || searchedEmail.split('@')[0],
      keyword: formData.keyword.trim().toLowerCase(),
    };
    subscribeMutation.mutate(request);
  };

  const handleUnsubscribe = (keyword: string) => {
    if (confirm(`"${keyword}" 구독을 취소하시겠습니까?`)) {
      unsubscribeMutation.mutate({ email: searchedEmail, keyword });
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">키워드 구독</h1>
        <p className="text-slate-500 mt-1">관심 키워드를 구독하고 새 뉴스 알림을 받으세요</p>
      </div>

      {/* Email Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          이메일로 구독 관리
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
          >
            조회
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchedEmail && (
        <div className="space-y-6">
          {isLoadingSubs ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : subsError ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">새 사용자이신가요?</h3>
              <p className="text-slate-500 mb-4">아래에서 첫 번째 키워드를 구독해보세요!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                첫 구독 시작하기
              </button>
            </div>
          ) : (
            <>
              {/* User Info */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/25">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {userSubs?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{userSubs?.name || 'Unknown'}</p>
                      <p className="text-purple-200 text-sm">{searchedEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-200 text-sm">구독 중인 키워드</p>
                    <p className="text-3xl font-bold">{userSubs?.subscriptions?.length || 0}</p>
                  </div>
                </div>
              </div>

              {/* Subscriptions List */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    내 구독 목록
                  </h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    키워드 추가
                  </button>
                </div>

                {/* Add Form */}
                {showForm && (
                  <form onSubmit={handleSubscribe} className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="이름 (선택)"
                        className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={formData.keyword}
                        onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                        placeholder="구독할 키워드 *"
                        className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={subscribeMutation.isPending}
                          className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
                        >
                          {subscribeMutation.isPending ? '추가 중...' : '추가'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="px-4 py-2.5 bg-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                    {subscribeMutation.isError && (
                      <p className="mt-2 text-sm text-red-500">구독 추가에 실패했습니다.</p>
                    )}
                  </form>
                )}

                {/* Subscription Items */}
                {userSubs?.subscriptions && userSubs.subscriptions.length > 0 ? (
                  <div className="space-y-3">
                    {userSubs.subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {sub.keyword.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{sub.keyword}</p>
                            <p className="text-sm text-slate-500">
                              구독일: {formatDate(sub.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {sub.lastNotifiedAt && (
                            <span className="text-xs text-slate-400">
                              마지막 알림: {formatDate(sub.lastNotifiedAt)}
                            </span>
                          )}
                          <button
                            onClick={() => handleUnsubscribe(sub.keyword)}
                            disabled={unsubscribeMutation.isPending}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="구독 취소"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p>구독 중인 키워드가 없습니다</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-3 text-blue-600 hover:underline"
                    >
                      첫 키워드 구독하기
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Popular Keywords */}
      {activeKeywords && activeKeywords.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            현재 활성 키워드
          </h2>
          <div className="flex flex-wrap gap-2">
            {activeKeywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 rounded-full text-sm font-medium border border-slate-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          알림 시스템 안내
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            구독한 키워드가 포함된 새 뉴스가 수집되면 알림이 발송됩니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            같은 뉴스에 대해 1시간 내 중복 알림은 발송되지 않습니다.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            키워드는 뉴스 제목과 설명에서 매칭됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
