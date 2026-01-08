/**
 * AI株式分析ツール メインコンポーネント
 */

import React, { useState } from 'react';
import { TabSwitch } from './components/TabSwitch';
import { FilterBar } from './components/FilterBar';
import { AnalysisTable } from './components/AnalysisTable';
import { AnalysisDetailModal } from './components/AnalysisDetailModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useLatestAnalyses, useBatchJobStatus } from './hooks/useAnalyses';
import type { Market, Recommendation } from './types/analysis';

/**
 * AI株式分析ツール メインコンポーネント
 */
function AIAnalyzer() {
  // 状態管理
  const [market, setMarket] = useState<Market>('JP');
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    Recommendation | 'All'
  >('All');
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(
    null
  );

  // データフェッチング
  const {
    data: analysesData,
    isLoading: isLoadingAnalyses,
    error: analysesError,
  } = useLatestAnalyses(
    market,
    selectedRecommendation === 'All' ? undefined : selectedRecommendation
  );

  const { data: batchJobStatus } = useBatchJobStatus();

  /**
   * 市場切り替え
   */
  const handleMarketChange = (newMarket: Market) => {
    setMarket(newMarket);
  };

  /**
   * 推奨フィルター切り替え
   */
  const handleRecommendationChange = (
    recommendation: Recommendation | 'All'
  ) => {
    setSelectedRecommendation(recommendation);
  };

  /**
   * 詳細モーダルを開く
   */
  const handleDetailClick = (analysisId: string) => {
    setSelectedAnalysisId(analysisId);
  };

  /**
   * 詳細モーダルを閉じる
   */
  const handleModalClose = () => {
    setSelectedAnalysisId(null);
  };

  // 分析結果のフィルタリング
  const analyses = analysesData?.analyses || [];

  // バッチジョブステータスの表示色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'partial_success':
        return 'text-yellow-600';
      case 'failure':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success':
        return '成功';
      case 'partial_success':
        return '部分的に成功';
      case 'failure':
        return '失敗';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ヘッダー - グラデーション背景 */}
      <header className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-10">
          {/* タイトルエリア */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              AI株式分析ツール
            </h1>
            <p className="text-xl text-blue-100 font-light">
              GPT-4o miniが分析した投資推奨を確認しましょう
            </p>
          </div>

          {/* ステータスカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {analysesData?.lastUpdateDate && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-blue-100">最終更新</p>
                    <p className="text-lg font-semibold truncate">
                      {new Date(analysesData.lastUpdateDate).toLocaleString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {batchJobStatus && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-blue-100">分析ステータス</p>
                    <p className="text-lg font-semibold">
                      {batchJobStatus.successCount}/{batchJobStatus.totalStocks} 成功
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {/* 市場選択タブ - モダンなデザイン */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 mb-8 overflow-hidden">
          <TabSwitch activeTab={market} onTabChange={handleMarketChange} />
        </div>

        {/* フィルターバー */}
        <div className="mb-8">
          <FilterBar
            selectedRecommendation={selectedRecommendation}
            onRecommendationChange={handleRecommendationChange}
          />
        </div>

        {/* エラー表示 - モダンなデザイン */}
        {analysesError && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-xl shadow-lg backdrop-blur-sm animate-pulse">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-red-900 mb-1">エラーが発生しました</h3>
                <p className="text-sm text-red-800">
                  データ取得に失敗しました。しばらくしてから再度お試しください。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ローディング状態 */}
        {isLoadingAnalyses && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner message="分析結果を読み込んでいます..." />
          </div>
        )}

        {/* 分析結果テーブル - モダンなカードデザイン */}
        {!isLoadingAnalyses && !analysesError && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
            <AnalysisTable
              analyses={analyses}
              onDetailClick={handleDetailClick}
            />
          </div>
        )}

        {/* 結果件数 - より目立つデザイン */}
        {!isLoadingAnalyses && !analysesError && analyses.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">
                {analyses.length} 件の分析結果を表示中
              </span>
            </div>
          </div>
        )}
      </main>

      {/* 詳細モーダル */}
      <AnalysisDetailModal
        analysisId={selectedAnalysisId}
        onClose={handleModalClose}
      />

      {/* フッター - モダンなデザイン */}
      <footer className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-center text-sm text-slate-300">
              本ツールは投資助言ではありません。投資判断は自己責任で行ってください。
            </p>
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            Powered by OpenAI GPT-4o mini • Built with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AIAnalyzer;
