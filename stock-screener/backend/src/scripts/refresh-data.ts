/**
 * データ更新スクリプト
 * Yahoo Finance APIから銘柄データを取得してデータベースに保存
 */

import dotenv from 'dotenv';
import { YahooFinanceService, MAJOR_TICKERS } from '../services/yahoo-finance.service';
import { StockModel } from '../models/stock.model';
import { closeDatabaseConnection } from '../config/database';

// 環境変数を読み込み
dotenv.config();

/**
 * 銘柄データを更新
 */
async function refreshStockData(market: 'JP' | 'US'): Promise<void> {
  console.log(`\n🔄 ${market}市場の銘柄データ更新を開始...`);

  try {
    // 主要銘柄リストを取得
    const tickers = MAJOR_TICKERS[market];

    // Yahoo Finance APIからデータを取得
    const stocksData = await YahooFinanceService.fetchMultipleStocks(tickers, market, 1500);

    // データベースに保存
    console.log(`\n💾 データベースへの保存を開始...`);
    let savedCount = 0;

    for (const stockData of stocksData) {
      try {
        await StockModel.upsert({
          ticker: stockData.ticker,
          name: stockData.name,
          market: stockData.market,
          sector: stockData.sector,
          marketCap: stockData.marketCap,
          per: stockData.per,
          pbr: stockData.pbr,
          roe: stockData.roe,
          dividendYield: stockData.dividendYield,
          price: stockData.price,
          currency: stockData.currency,
          lastUpdated: new Date(),
        });
        savedCount++;

        if (savedCount % 10 === 0) {
          console.log(`保存進捗: ${savedCount}/${stocksData.length}`);
        }
      } catch (error) {
        console.error(`データベース保存エラー: ${stockData.ticker}`, error);
      }
    }

    console.log(`✅ ${market}市場のデータ更新完了: ${savedCount}/${stocksData.length}件保存`);
  } catch (error) {
    console.error(`❌ ${market}市場のデータ更新エラー:`, error);
    throw error;
  }
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  console.log('🚀 銘柄データ更新スクリプトを開始します\n');
  console.log(`実行日時: ${new Date().toISOString()}`);

  try {
    // 日本株の更新
    await refreshStockData('JP');

    // 米国株の更新
    await refreshStockData('US');

    console.log('\n✅ すべての銘柄データ更新が完了しました');

    // 統計情報を表示
    const countJP = await StockModel.count('JP');
    const countUS = await StockModel.count('US');
    const lastUpdatedJP = await StockModel.getLastUpdated('JP');
    const lastUpdatedUS = await StockModel.getLastUpdated('US');

    console.log('\n📊 データベース統計:');
    console.log(`  日本株: ${countJP}銘柄 (最終更新: ${lastUpdatedJP?.toISOString()})`);
    console.log(`  米国株: ${countUS}銘柄 (最終更新: ${lastUpdatedUS?.toISOString()})`);
    console.log(`  合計: ${countJP + countUS}銘柄`);
  } catch (error) {
    console.error('\n❌ データ更新中にエラーが発生しました:', error);
    process.exit(1);
  } finally {
    // データベース接続をクローズ
    await closeDatabaseConnection();
  }
}

// スクリプトを実行
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n👋 スクリプトを正常に終了します');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ スクリプト実行エラー:', error);
      process.exit(1);
    });
}

export { refreshStockData };
