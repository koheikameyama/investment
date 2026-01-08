/**
 * AI分析結果カードコンポーネント
 * 個別の分析結果をカード形式で表示
 */

import React from 'react';
import type { Analysis, Recommendation } from '../types/analysis';

interface AnalysisCardProps {
  analysis: Analysis;
  onDetailClick: (analysisId: string) => void;
}

/**
 * 推奨アクションの設定を取得
 */
const getRecommendationConfig = (recommendation: Recommendation) => {
  switch (recommendation) {
    case 'Buy':
      return {
        bgGradient: 'from-green-500 to-emerald-600',
        headerGradient: 'from-green-500 to-emerald-600',
        badgeGradient: 'from-green-500 to-emerald-600',
        progressGradient: 'from-green-500 to-emerald-600',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        label: '買い推奨',
        shadowColor: 'hover:shadow-green-500/30',
      };
    case 'Sell':
      return {
        bgGradient: 'from-red-500 to-rose-600',
        headerGradient: 'from-red-500 to-rose-600',
        badgeGradient: 'from-red-500 to-rose-600',
        progressGradient: 'from-red-500 to-rose-600',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        ),
        label: '売り推奨',
        shadowColor: 'hover:shadow-red-500/30',
      };
    case 'Hold':
      return {
        bgGradient: 'from-amber-500 to-orange-600',
        headerGradient: 'from-amber-500 to-orange-600',
        badgeGradient: 'from-amber-500 to-orange-600',
        progressGradient: 'from-amber-500 to-orange-600',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        label: 'ホールド',
        shadowColor: 'hover:shadow-amber-500/30',
      };
    default:
      return {
        bgGradient: 'from-gray-500 to-gray-600',
        headerGradient: 'from-gray-500 to-gray-600',
        badgeGradient: 'from-gray-500 to-gray-600',
        progressGradient: 'from-gray-500 to-gray-600',
        icon: null,
        label: recommendation,
        shadowColor: 'hover:shadow-gray-500/30',
      };
  }
};

/**
 * AI分析結果カードコンポーネント
 */
export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis, onDetailClick }) => {
  const config = getRecommendationConfig(analysis.recommendation);
  const priceFormatted = analysis.currentPrice
    ? `¥${Number(analysis.currentPrice).toLocaleString()}`
    : 'N/A';

  return (
    <div
      className={`
        group relative bg-white rounded-2xl shadow-xl border border-gray-100
        transition-all duration-300 hover:shadow-2xl ${config.shadowColor}
        hover:-translate-y-2 cursor-pointer overflow-hidden
      `}
      onClick={() => onDetailClick(analysis.id)}
    >
      {/* グラデーション背景 */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${config.bgGradient} opacity-10`}></div>

      {/* カードコンテンツ */}
      <div className="relative p-6">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">{analysis.stock.ticker}</span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {analysis.stock.market}
              </span>
            </div>
            <h3 className="text-sm text-gray-600 font-medium truncate">{analysis.stock.name}</h3>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${config.headerGradient} text-white shadow-lg`}>
            {config.icon}
          </div>
        </div>

        {/* 推奨バッジ */}
        <div className="mb-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${config.badgeGradient} text-white font-semibold text-sm shadow-lg`}>
            <span>{config.label}</span>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">現在価格</p>
            <p className="text-lg font-bold text-gray-900">{priceFormatted}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
            <p className="text-xs text-gray-600 mb-1">信頼度</p>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold text-gray-900">{analysis.confidenceScore}</p>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${config.progressGradient} transition-all duration-500`}
                    style={{ width: `${analysis.confidenceScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 財務指標 */}
        {(analysis.peRatio || analysis.pbRatio || analysis.roe) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {analysis.peRatio && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-gray-50 rounded-lg text-xs">
                <span className="text-gray-500">PER</span>
                <span className="font-semibold text-gray-900">{Number(analysis.peRatio).toFixed(1)}</span>
              </div>
            )}
            {analysis.pbRatio && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-gray-50 rounded-lg text-xs">
                <span className="text-gray-500">PBR</span>
                <span className="font-semibold text-gray-900">{Number(analysis.pbRatio).toFixed(2)}</span>
              </div>
            )}
            {analysis.roe && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-gray-50 rounded-lg text-xs">
                <span className="text-gray-500">ROE</span>
                <span className="font-semibold text-gray-900">{Number(analysis.roe).toFixed(1)}%</span>
              </div>
            )}
          </div>
        )}

        {/* 推奨理由（短文） */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-700 line-clamp-2">{analysis.reasonShort}</p>
        </div>

        {/* 詳細を見るボタン */}
        <div className="mt-4 flex items-center justify-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
          <span>詳細を見る</span>
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* ホバーエフェクト */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};
