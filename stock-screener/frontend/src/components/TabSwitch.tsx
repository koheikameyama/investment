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
  const tabs: { value: Market; label: string }[] = [
    { value: 'JP', label: '日本株' },
    { value: 'US', label: '米国株' },
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === tab.value
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
          }`}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
