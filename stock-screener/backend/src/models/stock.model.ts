/**
 * 銘柄モデル
 * データベース操作とビジネスロジックを提供
 */

import { Stock, Prisma } from '@prisma/client';
import prisma from '../config/database';

/**
 * スクリーニングフィルタ条件の型定義
 */
export interface ScreeningFilters {
  market: 'JP' | 'US';
  marketCapMin?: number;
  marketCapMax?: number;
  perMin?: number;
  perMax?: number;
  pbrMin?: number;
  pbrMax?: number;
  roeMin?: number;
  roeMax?: number;
  dividendYieldMin?: number;
  dividendYieldMax?: number;
  priceMin?: number;
  priceMax?: number;
  sectors?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

/**
 * スクリーニング結果の型定義
 */
export interface ScreeningResult {
  stocks: Stock[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 銘柄データモデルクラス
 */
export class StockModel {
  /**
   * 条件に基づいて銘柄をスクリーニング
   */
  static async screen(filters: ScreeningFilters): Promise<ScreeningResult> {
    const {
      market,
      marketCapMin,
      marketCapMax,
      perMin,
      perMax,
      pbrMin,
      pbrMax,
      roeMin,
      roeMax,
      dividendYieldMin,
      dividendYieldMax,
      priceMin,
      priceMax,
      sectors,
      sortBy = 'ticker',
      sortOrder = 'asc',
      page = 1,
      pageSize = 50,
    } = filters;

    // WHERE条件を構築
    const where: Prisma.StockWhereInput = {
      market,
      ...(marketCapMin !== undefined && { marketCap: { gte: marketCapMin } }),
      ...(marketCapMax !== undefined && { marketCap: { lte: marketCapMax } }),
      ...(perMin !== undefined && { per: { gte: perMin } }),
      ...(perMax !== undefined && { per: { lte: perMax } }),
      ...(pbrMin !== undefined && { pbr: { gte: pbrMin } }),
      ...(pbrMax !== undefined && { pbr: { lte: pbrMax } }),
      ...(roeMin !== undefined && { roe: { gte: roeMin } }),
      ...(roeMax !== undefined && { roe: { lte: roeMax } }),
      ...(dividendYieldMin !== undefined && { dividendYield: { gte: dividendYieldMin } }),
      ...(dividendYieldMax !== undefined && { dividendYield: { lte: dividendYieldMax } }),
      ...(priceMin !== undefined && { price: { gte: priceMin } }),
      ...(priceMax !== undefined && { price: { lte: priceMax } }),
      ...(sectors && sectors.length > 0 && { sector: { in: sectors } }),
    };

    // 総件数を取得
    const totalCount = await prisma.stock.count({ where });

    // ページネーション設定
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // ソート条件を構築
    const orderBy: Prisma.StockOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // データを取得
    const stocks = await prisma.stock.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      stocks,
      totalCount,
      page,
      pageSize,
      totalPages,
    };
  }

  /**
   * 特定の市場の全セクターリストを取得
   */
  static async getSectorsByMarket(market: 'JP' | 'US'): Promise<string[]> {
    const result = await prisma.stock.findMany({
      where: { market },
      select: { sector: true },
      distinct: ['sector'],
    });

    return result
      .map(r => r.sector)
      .filter((sector): sector is string => sector !== null)
      .sort();
  }

  /**
   * 銘柄データを作成または更新（upsert）
   */
  static async upsert(data: Prisma.StockCreateInput): Promise<Stock> {
    return prisma.stock.upsert({
      where: { ticker: data.ticker },
      update: {
        name: data.name,
        market: data.market,
        sector: data.sector,
        marketCap: data.marketCap,
        per: data.per,
        pbr: data.pbr,
        roe: data.roe,
        dividendYield: data.dividendYield,
        price: data.price,
        currency: data.currency,
        lastUpdated: new Date(),
      },
      create: data,
    });
  }

  /**
   * ティッカーシンボルで銘柄を取得
   */
  static async findByTicker(ticker: string): Promise<Stock | null> {
    return prisma.stock.findUnique({
      where: { ticker },
    });
  }

  /**
   * 最終更新日時を取得
   */
  static async getLastUpdated(market?: 'JP' | 'US'): Promise<Date | null> {
    const result = await prisma.stock.findFirst({
      where: market ? { market } : undefined,
      orderBy: { lastUpdated: 'desc' },
      select: { lastUpdated: true },
    });

    return result?.lastUpdated || null;
  }

  /**
   * 銘柄数を取得
   */
  static async count(market?: 'JP' | 'US'): Promise<number> {
    return prisma.stock.count({
      where: market ? { market } : undefined,
    });
  }
}
