/**
 * タブ切り替えコンポーネント
 * 市場選択（日本株/米国株）を行うタブUI
 */

import React from 'react';
import { Market } from '../types/stock';

interface TabSwitchProps {
  activeTab: Market;
  onTabChange: (tab: Market) => void;
}

/**
 * タブ切り替えコンポーネント
 */
export const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, onTabChange }) => {
  const tabs: { value: Market; label: string; flag: string; color: string }[] = [
    { value: 'JP', label: '日本株', flag: '🇯🇵', color: 'from-red-500 to-pink-600' },
    { value: 'US', label: '米国株', flag: '🇺🇸', color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <div className="relative flex p-2 gap-2">
      <div className="absolute inset-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl opacity-30"></div>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        let buttonClass = 'relative flex-1 flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 transform ';

        if (isActive) {
          if (tab.value === 'JP') {
            buttonClass += 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-xl scale-105';
          } else {
            buttonClass += 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-105';
          }
        } else {
          buttonClass += 'bg-white/50 text-gray-600 hover:bg-white/80 hover:text-gray-900 hover:scale-102';
        }

        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={buttonClass}
            type="button"
          >
            <span className="text-2xl">{tab.flag}</span>
            <span>{tab.label}</span>
            {isActive && (
              <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};
