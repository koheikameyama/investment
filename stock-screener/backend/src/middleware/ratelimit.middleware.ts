/**
 * レート制限ミドルウェア
 * IPアドレスごとにAPIリクエスト数を制限
 */

import rateLimit from 'express-rate-limit';

/**
 * スクリーニングAPIのレート制限
 * デフォルト: 60リクエスト/分
 */
export const screeningRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1分
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '60', 10), // 最大60リクエスト
  message: {
    error: 'Too Many Requests',
    message: 'リクエスト数が制限を超えました。しばらくしてから再度お試しください。',
    statusCode: 429,
  },
  standardHeaders: true, // RateLimit-* ヘッダーを返す
  legacyHeaders: false, // X-RateLimit-* ヘッダーを無効化
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'リクエスト数が制限を超えました。しばらくしてから再度お試しください。',
      statusCode: 429,
    });
  },
});

/**
 * データ更新APIのレート制限
 * より厳しい制限: 5リクエスト/分
 */
export const refreshRateLimiter = rateLimit({
  windowMs: 60000, // 1分
  max: 5, // 最大5リクエスト
  message: {
    error: 'Too Many Requests',
    message: 'データ更新のリクエスト数が制限を超えました。しばらくしてから再度お試しください。',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'データ更新のリクエスト数が制限を超えました。しばらくしてから再度お試しください。',
      statusCode: 429,
    });
  },
});
