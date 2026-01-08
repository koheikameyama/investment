/**
 * ルートの統合
 * すべてのAPIルートを集約
 */

import { Router } from 'express';
import stocksRoutes from './stocks.routes';
import { getSectors, healthCheck } from '../controllers/stocks.controller';

const router = Router();

// 銘柄関連のルート
router.use('/stocks', stocksRoutes);

// セクターリスト取得
router.get('/sectors', getSectors);

// ヘルスチェック
router.get('/health', healthCheck);

export default router;
