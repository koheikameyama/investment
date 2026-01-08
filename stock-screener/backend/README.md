# 銘柄スクリーニングツール - バックエンド

TypeScript + Express + Prismaで構築された銘柄スクリーニングツールのバックエンドAPI

## 技術スタック

- **フレームワーク**: Express.js
- **言語**: TypeScript
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **外部API**: yahoo-finance2
- **バリデーション**: Zod

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、必要な値を設定してください。

```bash
cp .env.example .env
```

### 3. データベースのセットアップ

PostgreSQLデータベースを作成し、Prismaマイグレーションを実行します。

```bash
# Prisma Clientを生成
npm run prisma:generate

# マイグレーションを実行
npm run prisma:migrate
```

### 4. 初期データの投入

Yahoo Finance APIから銘柄データを取得してデータベースに保存します。

```bash
npx tsx src/scripts/refresh-data.ts
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

サーバーは `http://localhost:3001` で起動します。

## APIエンドポイント

### 銘柄スクリーニング

```
GET /api/v1/stocks/screen
```

クエリパラメータ:
- `market`: 市場（JP/US）- 必須
- `marketCapMin`: 時価総額最小値
- `marketCapMax`: 時価総額最大値
- `perMin`: PER最小値
- `perMax`: PER最大値
- `pbrMin`: PBR最小値
- `pbrMax`: PBR最大値
- `roeMin`: ROE最小値
- `roeMax`: ROE最大値
- `dividendYieldMin`: 配当利回り最小値
- `dividendYieldMax`: 配当利回り最大値
- `priceMin`: 株価最小値
- `priceMax`: 株価最大値
- `sectors`: セクター（カンマ区切り）
- `sortBy`: ソートフィールド
- `sortOrder`: ソート順（asc/desc）
- `page`: ページ番号
- `pageSize`: 1ページあたりの件数

### セクターリスト取得

```
GET /api/v1/sectors?market=JP
```

### データ更新

```
POST /api/v1/stocks/refresh
```

### ヘルスチェック

```
GET /api/v1/health
```

## スクリプト

- `npm run dev`: 開発サーバー起動（ホットリロード有効）
- `npm run build`: TypeScriptをビルド
- `npm start`: 本番サーバー起動
- `npm run prisma:generate`: Prisma Clientを生成
- `npm run prisma:migrate`: マイグレーションを実行
- `npm run prisma:studio`: Prisma Studioを起動

## ディレクトリ構造

```
backend/
├── src/
│   ├── config/          # 設定ファイル
│   ├── controllers/     # コントローラー
│   ├── middleware/      # ミドルウェア
│   ├── models/          # データモデル
│   ├── routes/          # ルート定義
│   ├── scripts/         # スクリプト
│   ├── services/        # サービス層
│   ├── validators/      # バリデーション
│   └── server.ts        # エントリーポイント
├── prisma/
│   └── schema.prisma    # Prismaスキーマ
└── tests/               # テスト
```

## 注意事項

- Yahoo Finance APIのレート制限に注意してください
- データ更新は手動で実行する必要があります
- 本番環境では環境変数を適切に設定してください
