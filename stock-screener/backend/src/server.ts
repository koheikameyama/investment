/**
 * サーバーエントリーポイント
 * Expressアプリケーションの起動
 */

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { closeDatabaseConnection } from './config/database';

// 環境変数を読み込み
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

/**
 * ミドルウェアの設定
 */
// CORS設定
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// JSONパーサー
app.use(express.json());

// URLエンコードされたボディのパース
app.use(express.urlencoded({ extended: true }));

// リクエストログ（開発環境のみ）
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

/**
 * ルートの設定
 */
// APIルート
app.use('/api/v1', routes);

// ルートエンドポイント
app.get('/', (req, res) => {
  res.json({
    message: '銘柄スクリーニングツール API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      screen: '/api/v1/stocks/screen',
      sectors: '/api/v1/sectors',
      refresh: '/api/v1/stocks/refresh',
    },
  });
});

/**
 * エラーハンドリング
 */
// 404 Not Found
app.use(notFoundHandler);

// グローバルエラーハンドラー
app.use(errorHandler);

/**
 * サーバー起動
 */
const server = app.listen(PORT, () => {
  console.log(`✅ サーバーが起動しました`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log(`📝 環境: ${process.env.NODE_ENV || 'development'}`);
});

/**
 * グレースフルシャットダウン
 */
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERMを受信しました。サーバーをシャットダウンします...');

  server.close(async () => {
    console.log('📡 HTTPサーバーをクローズしました');

    // データベース接続をクローズ
    await closeDatabaseConnection();
    console.log('💾 データベース接続をクローズしました');

    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINTを受信しました。サーバーをシャットダウンします...');

  server.close(async () => {
    console.log('📡 HTTPサーバーをクローズしました');

    // データベース接続をクローズ
    await closeDatabaseConnection();
    console.log('💾 データベース接続をクローズしました');

    process.exit(0);
  });
});

export default app;
