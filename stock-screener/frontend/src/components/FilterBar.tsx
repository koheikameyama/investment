/**
 * フィルターバーコンポーネント
 * 推奨アクションでフィルタリング
 */

import React from 'react';
import type { Recommendation } from '../types/analysis';

interface FilterBarProps {
  selectedRecommendation: Recommendation | 'All';
  onRecommendationChange: (recommendation: Recommendation | 'All') => void;
}

/**
 * フィルターバーコンポーネント
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  selectedRecommendation,
  onRecommendationChange,
}) => {
  const options: Array<{
    value: Recommendation | 'All';
    label: string;
    icon: JSX.Element;
    gradient: string;
    activeGradient: string;
  }> = [
    {
      value: 'All',
      label: 'すべて',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
      gradient: 'from-slate-500 to-slate-600',
      activeGradient: 'from-slate-600 to-slate-700'
    },
    {
      value: 'Buy',
      label: '買い推奨',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      gradient: 'from-green-500 to-emerald-600',
      activeGradient: 'from-green-600 to-emerald-700'
    },
    {
      value: 'Sell',
      label: '売り推奨',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>,
      gradient: 'from-red-500 to-rose-600',
      activeGradient: 'from-red-600 to-rose-700'
    },
    {
      value: 'Hold',
      label: 'ホールド',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      gradient: 'from-amber-500 to-orange-600',
      activeGradient: 'from-amber-600 to-orange-700'
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-base font-semibold text-gray-800">推奨フィルター</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onRecommendationChange(option.value)}
              className={`
                group relative px-5 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300 transform hover:scale-105
                ${selectedRecommendation === option.value
                  ? `bg-gradient-to-r ${option.activeGradient} text-white shadow-lg`
                  : `bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:${option.gradient} hover:text-white border-2 border-gray-200 hover:border-transparent`
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
              {selectedRecommendation === option.value && (
                <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
