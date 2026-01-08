/**
 * エラーハンドリングミドルウェア
 * アプリケーション全体のエラーを統一的に処理
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * カスタムエラーレスポンスの型定義
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}

/**
 * グローバルエラーハンドラー
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // エラーをログに記録
  console.error('[Error]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    error: err.message,
    stack: err.stack,
  });

  // Zodバリデーションエラー
  if (err instanceof ZodError) {
    const response: ErrorResponse = {
      error: 'Validation Error',
      message: '入力値が不正です',
      statusCode: 400,
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    };
    res.status(400).json(response);
    return;
  }

  // デフォルトのエラーレスポンス
  const statusCode = (err as any).statusCode || 500;
  const response: ErrorResponse = {
    error: err.name || 'Internal Server Error',
    message: err.message || 'サーバーエラーが発生しました',
    statusCode,
  };

  res.status(statusCode).json(response);
}

/**
 * 404 Not Foundハンドラー
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const response: ErrorResponse = {
    error: 'Not Found',
    message: `リクエストされたエンドポイント ${req.method} ${req.path} が見つかりません`,
    statusCode: 404,
  };
  res.status(404).json(response);
}

/**
 * 非同期ハンドラーのラッパー
 * async関数のエラーをキャッチしてnextに渡す
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
