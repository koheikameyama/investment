/**
 * スクリーニングリクエストのバリデーション
 * Zodスキーマを使用した型安全なバリデーション
 */

import { z } from 'zod';

/**
 * スクリーニングクエリパラメータのスキーマ
 */
export const screeningQuerySchema = z.object({
  market: z.enum(['JP', 'US'], {
    required_error: '市場を指定してください',
    invalid_type_error: '市場は"JP"または"US"である必要があります',
  }),
  marketCapMin: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  marketCapMax: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  perMin: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  perMax: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  pbrMin: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  pbrMax: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  roeMin: z.string().transform(Number).pipe(z.number()).optional(),
  roeMax: z.string().transform(Number).pipe(z.number()).optional(),
  dividendYieldMin: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  dividendYieldMax: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  priceMin: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  priceMax: z.string().transform(Number).pipe(z.number().nonnegative()).optional(),
  sectors: z.union([z.string(), z.array(z.string())]).optional().transform(val => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }),
  sortBy: z.string().optional().default('ticker'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.string().transform(Number).pipe(z.number().int().positive()).optional().default('1'),
  pageSize: z.string().transform(Number).pipe(z.number().int().positive().max(100)).optional().default('50'),
}).refine(
  (data) => {
    // 最小値が最大値を超えないことを検証
    const checks = [
      { min: data.marketCapMin, max: data.marketCapMax, name: '時価総額' },
      { min: data.perMin, max: data.perMax, name: 'PER' },
      { min: data.pbrMin, max: data.pbrMax, name: 'PBR' },
      { min: data.roeMin, max: data.roeMax, name: 'ROE' },
      { min: data.dividendYieldMin, max: data.dividendYieldMax, name: '配当利回り' },
      { min: data.priceMin, max: data.priceMax, name: '株価' },
    ];

    for (const check of checks) {
      if (check.min !== undefined && check.max !== undefined && check.min > check.max) {
        return false;
      }
    }
    return true;
  },
  {
    message: '最小値は最大値以下である必要があります',
  }
);

/**
 * セクター取得クエリパラメータのスキーマ
 */
export const sectorsQuerySchema = z.object({
  market: z.enum(['JP', 'US'], {
    required_error: '市場を指定してください',
    invalid_type_error: '市場は"JP"または"US"である必要があります',
  }),
});

export type ScreeningQuery = z.infer<typeof screeningQuerySchema>;
export type SectorsQuery = z.infer<typeof sectorsQuerySchema>;
