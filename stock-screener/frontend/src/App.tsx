/**
 * メインアプリケーションコンポーネント
 * 銘柄スクリーニングツールのメインページ
 */

import React, { useState, useEffect } from 'react';
import { TabSwitch } from './components/TabSwitch';
import { RangeInput } from './components/RangeInput';
import { MultiSelect } from './components/MultiSelect';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ApiService } from './services/api';
import { Market, ScreeningFilters, ScreeningResult, SortOrder } from './types/stock';
import './App.css';

/**
 * メインアプリケーションコンポーネント
 */
function App() {
  // 状態管理
  const [market, setMarket] = useState<Market>('JP');
  const [sectors, setSectors] = useState<string[]>([]);
  const [filters, setFilters] = useState<ScreeningFilters>({ market: 'JP' });
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * セクターリストを取得
   */
  const fetchSectors = async (selectedMarket: Market) => {
    try {
      const sectorList = await ApiService.getSectors(selectedMarket);
      setSectors(sectorList);
    } catch (err) {
      console.error('セクター取得エラー:', err);
    }
  };

  /**
   * 市場切り替え
   */
  const handleMarketChange = (newMarket: Market) => {
    setMarket(newMarket);
    setFilters({ market: newMarket });
    setResult(null);
    fetchSectors(newMarket);
  };

  /**
   * フィルタ値の更新
   */
  const updateFilter = (key: keyof ScreeningFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === '' ? undefined : value,
    }));
  };

  /**
   * 検索実行
   */
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchResult = await ApiService.screenStocks({
        ...filters,
        page: 1, // 検索時は1ページ目から
      });
      setResult(searchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  /**
   * フィルタクリア
   */
  const handleClear = () => {
    setFilters({ market });
    setResult(null);
    setError(null);
  };

  /**
   * ソート変更
   */
  const handleSort = (column: string) => {
    const newSortOrder: SortOrder =
      filters.sortBy === column && filters.sortOrder === 'asc' ? 'desc' : 'asc';

    const newFilters = {
      ...filters,
      sortBy: column,
      sortOrder: newSortOrder,
    };

    setFilters(newFilters);

    // 再検索
    if (result) {
      setLoading(true);
      ApiService.screenStocks(newFilters)
        .then(setResult)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  /**
   * ページ変更
   */
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);

    setLoading(true);
    ApiService.screenStocks(newFilters)
      .then(setResult)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  /**
   * データ更新
   */
  const handleRefresh = async () => {
    setLoading(true);
    try {
      await ApiService.refreshData();
      setLastUpdated(new Date());
      alert('データ更新リクエストを送信しました。処理が完了するまでしばらくお待ちください。');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データ更新中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初期化処理
   */
  useEffect(() => {
    fetchSectors(market);

    // ヘルスチェックで最終更新日時を取得
    ApiService.healthCheck()
      .then((health) => {
        const updated = health.database.lastUpdated[market];
        if (updated) {
          setLastUpdated(new Date(updated));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">銘柄スクリーニングツール</h1>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-600">
                  最終更新: {lastUpdated.toLocaleString('ja-JP')}
                </span>
              )}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                データ更新
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* タブ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <TabSwitch activeTab={market} onTabChange={handleMarketChange} />
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* フィルタフォーム */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">フィルタ条件</h2>

              <RangeInput
                label="時価総額"
                unit={market === 'JP' ? '円' : 'ドル'}
                minValue={filters.marketCapMin}
                maxValue={filters.marketCapMax}
                onMinChange={(v) => updateFilter('marketCapMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('marketCapMax', v ? Number(v) : undefined)}
              />

              <RangeInput
                label="PER"
                minValue={filters.perMin}
                maxValue={filters.perMax}
                onMinChange={(v) => updateFilter('perMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('perMax', v ? Number(v) : undefined)}
              />

              <RangeInput
                label="PBR"
                minValue={filters.pbrMin}
                maxValue={filters.pbrMax}
                onMinChange={(v) => updateFilter('pbrMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('pbrMax', v ? Number(v) : undefined)}
              />

              <RangeInput
                label="ROE"
                unit="%"
                minValue={filters.roeMin}
                maxValue={filters.roeMax}
                onMinChange={(v) => updateFilter('roeMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('roeMax', v ? Number(v) : undefined)}
              />

              <RangeInput
                label="配当利回り"
                unit="%"
                minValue={filters.dividendYieldMin}
                maxValue={filters.dividendYieldMax}
                onMinChange={(v) => updateFilter('dividendYieldMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('dividendYieldMax', v ? Number(v) : undefined)}
              />

              <RangeInput
                label="株価"
                unit={market === 'JP' ? '円' : 'ドル'}
                minValue={filters.priceMin}
                maxValue={filters.priceMax}
                onMinChange={(v) => updateFilter('priceMin', v ? Number(v) : undefined)}
                onMaxChange={(v) => updateFilter('priceMax', v ? Number(v) : undefined)}
              />

              <MultiSelect
                label="セクター"
                options={sectors}
                selectedValues={filters.sectors || []}
                onChange={(v) => updateFilter('sectors', v.length > 0 ? v : undefined)}
              />

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  検索
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  クリア
                </button>
              </div>
            </div>
          </div>

          {/* 検索結果 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">検索結果</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <LoadingSpinner message="検索中..." />
              ) : result ? (
                <>
                  <DataTable
                    stocks={result.stocks}
                    sortBy={filters.sortBy || 'ticker'}
                    sortOrder={filters.sortOrder || 'asc'}
                    onSort={handleSort}
                  />
                  <Pagination
                    currentPage={result.page}
                    totalPages={result.totalPages}
                    totalCount={result.totalCount}
                    pageSize={result.pageSize}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  フィルタ条件を設定して検索ボタンをクリックしてください
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-semibold text-red-600">
              ⚠️ 免責事項
            </p>
            <p>
              本ツールは投資助言ではありません。投資判断は自己責任で行ってください。
            </p>
            <p>
              データソース: Yahoo Finance API
            </p>
            <p>
              提供されるデータの精度には限界があります。重要な投資判断を行う際は、複数の情報源を参照してください。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
