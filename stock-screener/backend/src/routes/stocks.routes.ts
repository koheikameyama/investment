/**
 * 銘柄関連のルート定義
 * APIエンドポイントとコントローラーをマッピング
 */

import { Router } from 'express';
import {
  screenStocks,
  getSectors,
  refreshStockData,
  healthCheck,
} from '../controllers/stocks.controller';
import { screeningRateLimiter, refreshRateLimiter } from '../middleware/ratelimit.middleware';

const router = Router();

/**
 * GET /api/v1/stocks/screen
 * 銘柄スクリーニング
 */
router.get('/screen', screeningRateLimiter, screenStocks);

/**
 * POST /api/v1/stocks/refresh
 * データ更新
 */
router.post('/refresh', refreshRateLimiter, refreshStockData);

export default router;
