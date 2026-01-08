/**
 * データベース接続設定
 * Prisma Clientのシングルトンインスタンスを提供
 */

import { PrismaClient } from '@prisma/client';

// Prisma Clientのシングルトンインスタンス
let prisma: PrismaClient;

/**
 * Prisma Clientインスタンスを取得
 * 開発環境ではホットリロード時に複数インスタンスが作成されないよう制御
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
    });
  }
  return prisma;
}

/**
 * データベース接続をクローズ
 * アプリケーション終了時に呼び出す
 */
export async function closeDatabaseConnection(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
  }
}

export default getPrismaClient();
