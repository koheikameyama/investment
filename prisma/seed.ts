/**
 * Prisma シードスクリプト
 * 初期銘柄データをデータベースに投入
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 主要銘柄リスト（日本株のみ）
const MAJOR_TICKERS = [
  // 日経225の主要銘柄
  { ticker: '7203', name: 'トヨタ自動車', sector: '自動車' },
  { ticker: '9984', name: 'ソフトバンクグループ', sector: 'テクノロジー' },
  { ticker: '6758', name: 'ソニーグループ', sector: 'テクノロジー' },
  { ticker: '6861', name: 'キーエンス', sector: '電気機器' },
  { ticker: '9433', name: 'KDDI', sector: '通信' },
  { ticker: '8306', name: '三菱UFJフィナンシャル・グループ', sector: '金融' },
  { ticker: '6098', name: 'リクルートホールディングス', sector: 'サービス' },
  { ticker: '4063', name: '信越化学工業', sector: '化学' },
  { ticker: '6902', name: 'デンソー', sector: '自動車部品' },
  { ticker: '7974', name: '任天堂', sector: 'ゲーム' },
  { ticker: '4502', name: '武田薬品工業', sector: '医薬品' },
  { ticker: '8035', name: '東京エレクトロン', sector: '半導体' },
  { ticker: '7267', name: 'ホンダ', sector: '自動車' },
  { ticker: '8058', name: '三菱商事', sector: '商社' },
  { ticker: '6367', name: 'ダイキン工業', sector: '機械' },
];

async function main() {
  console.log('🌱 シードデータを投入中...\n');

  // 日本株を登録
  console.log('📊 日本株を登録中...');
  for (const stock of MAJOR_TICKERS) {
    await prisma.stock.upsert({
      where: { ticker: stock.ticker },
      update: {},
      create: {
        ticker: stock.ticker,
        name: stock.name,
        market: 'JP',
        sector: stock.sector,
      },
    });
    console.log(`  ✓ ${stock.ticker} - ${stock.name}`);
  }

  // 登録結果を確認
  const totalStocks = await prisma.stock.count();

  console.log('\n✅ シードデータの投入が完了しました！');
  console.log(`   合計: ${totalStocks}銘柄（日本株のみ）\n`);
}

main()
  .catch((e) => {
    console.error('❌ シードデータの投入に失敗しました:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
