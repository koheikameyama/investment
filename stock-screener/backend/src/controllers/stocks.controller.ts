/**
 * 銘柄コントローラー
 * APIエンドポイントのハンドラー関数を提供
 */

import { Request, Response } from 'express';
import { StockModel } from '../models/stock.model';
import { screeningQuerySchema, sectorsQuerySchema } from '../validators/screening.validator';
import { asyncHandler } from '../middleware/error.middleware';

/**
 * 銘柄スクリーニングAPI
 * GET /api/v1/stocks/screen
 */
export const screenStocks = asyncHandler(async (req: Request, res: Response) => {
  // クエリパラメータをバリデーション
  const validatedQuery = screeningQuerySchema.parse(req.query);

  // スクリーニングを実行
  const result = await StockModel.screen(validatedQuery);

  // レスポンスを返却
  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * セクターリスト取得API
 * GET /api/v1/sectors
 */
export const getSectors = asyncHandler(async (req: Request, res: Response) => {
  // クエリパラメータをバリデーション
  const { market } = sectorsQuerySchema.parse(req.query);

  // セクターリストを取得
  const sectors = await StockModel.getSectorsByMarket(market);

  // レスポンスを返却
  res.status(200).json({
    success: true,
    data: {
      market,
      sectors,
      count: sectors.length,
    },
  });
});

/**
 * データ更新API
 * POST /api/v1/stocks/refresh
 */
export const refreshStockData = asyncHandler(async (req: Request, res: Response) => {
  // 非同期でデータ更新を実行（バックグラウンド処理）
  // 実際のデータ取得はタスクグループ4で実装

  // 最終更新日時を取得
  const lastUpdatedJP = await StockModel.getLastUpdated('JP');
  const lastUpdatedUS = await StockModel.getLastUpdated('US');

  // 即座にレスポンスを返却
  res.status(202).json({
    success: true,
    message: 'データ更新リクエストを受け付けました。処理が完了するまでしばらくお待ちください。',
    data: {
      status: 'processing',
      lastUpdated: {
        JP: lastUpdatedJP,
        US: lastUpdatedUS,
      },
    },
  });

  // TODO: バックグラウンドでYahoo Finance APIからデータを取得・更新
  // この処理はタスクグループ4で実装
});

/**
 * ヘルスチェックAPI
 * GET /api/v1/health
 */
export const healthCheck = asyncHandler(async (req: Request, res: Response) => {
  const stockCountJP = await StockModel.count('JP');
  const stockCountUS = await StockModel.count('US');
  const lastUpdatedJP = await StockModel.getLastUpdated('JP');
  const lastUpdatedUS = await StockModel.getLastUpdated('US');

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        stockCount: {
          JP: stockCountJP,
          US: stockCountUS,
          total: stockCountJP + stockCountUS,
        },
        lastUpdated: {
          JP: lastUpdatedJP,
          US: lastUpdatedUS,
        },
      },
    },
  });
});
