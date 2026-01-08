/**
 * AI分析結果グリッドコンポーネント
 * 分析結果をカード形式で表示
 */

import React, { useState } from 'react';
import type { Analysis } from '../types/analysis';
import { AnalysisCard } from './AnalysisCard';

interface AnalysisTableProps {
  analyses: Analysis[];
  onDetailClick: (analysisId: string) => void;
}

type SortField = 'ticker' | 'name' | 'currentPrice' | 'confidenceScore' | 'recommendation';
type SortOrder = 'asc' | 'desc';

/**
 * AI分析結果グリッドコンポーネント
 */
export const AnalysisTable: React.FC<AnalysisTableProps> = ({
  analyses,
  onDetailClick,
}) => {
  const [sortField, setSortField] = useState<SortField>('confidenceScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  /**
   * ソート処理
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  /**
   * ソート済みデータ
   */
  const sortedAnalyses = [...analyses].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'ticker':
        aValue = a.stock.ticker;
        bValue = b.stock.ticker;
        break;
      case 'name':
        aValue = a.stock.name;
        bValue = b.stock.name;
        break;
      case 'currentPrice':
        aValue = Number(a.currentPrice) || 0;
        bValue = Number(b.currentPrice) || 0;
        break;
      case 'confidenceScore':
        aValue = a.confidenceScore;
        bValue = b.confidenceScore;
        break;
      case 'recommendation':
        aValue = a.recommendation;
        bValue = b.recommendation;
        break;
      default:
        aValue = a.confidenceScore;
        bValue = b.confidenceScore;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // データがない場合
  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">分析結果がありません</h3>
        <p className="text-gray-500">バッチ分析を実行して結果を取得してください。</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* ソートバー */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">並び替え:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort('confidenceScore')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortField === 'confidenceScore'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              信頼度 {sortField === 'confidenceScore' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('currentPrice')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortField === 'currentPrice'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              株価 {sortField === 'currentPrice' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('ticker')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortField === 'ticker'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              ティッカー {sortField === 'ticker' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAnalyses.map((analysis, index) => (
          <div
            key={analysis.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <AnalysisCard analysis={analysis} onDetailClick={onDetailClick} />
          </div>
        ))}
      </div>
    </div>
  );
};
