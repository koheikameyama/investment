/**
 * AI株式分析を手動実行するスクリプト
 */

import dotenv from 'dotenv';
import { BatchService } from '../services/batch.service';
import { closeDatabaseConnection } from '../config/database';

// 環境変数を読み込み
dotenv.config();

/**
 * メイン処理
 */
async function main(): Promise<void> {
  console.log('🚀 AI株式分析バッチジョブを開始します\n');
  console.log(`実行日時: ${new Date().toLocaleString('ja-JP')}`);
  console.log('='.repeat(60));

  try {
    const result = await BatchService.runStockAnalysisBatch();

    console.log('\n' + '='.repeat(60));
    console.log('📊 実行結果:');
    console.log(`  ステータス: ${result.status}`);
    console.log(`  総銘柄数: ${result.totalStocks}`);
    console.log(`  成功: ${result.successCount}`);
    console.log(`  失敗: ${result.failureCount}`);
    console.log('='.repeat(60));

    if (result.status === 'success') {
      console.log('\n✅ バッチジョブが正常に完了しました');
    } else if (result.status === 'partial_success') {
      console.warn('\n⚠️ バッチジョブが部分的に成功しました');
    } else {
      console.error('\n❌ バッチジョブが失敗しました');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ バッチジョブ実行中にエラーが発生しました:', error);
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

export { main };
