# 銘柄スクリーニングツール

日本株・米国株を対象とした銘柄スクリーニングツール。複数の財務指標で銘柄を効率的にフィルタリングできます。

## 特徴

- 📊 **複数の財務指標でフィルタリング**: 時価総額、PER、PBR、ROE、配当利回り、株価など
- 🌏 **日本株・米国株に対応**: タブで簡単に市場を切り替え
- 🔄 **Yahoo Finance APIと連携**: リアルタイムの銘柄データを取得
- 📱 **レスポンシブデザイン**: デスクトップ、タブレット、モバイルに対応
- ⚡ **高速検索**: データベースキャッシングとインデックス最適化

## 技術スタック

### バックエンド
- **言語**: TypeScript
- **フレームワーク**: Express.js
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **外部API**: yahoo-finance2

### フロントエンド
- **言語**: TypeScript
- **フレームワーク**: React
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **HTTP通信**: Axios

## セットアップ

### 前提条件

- Node.js 18以上
- PostgreSQL 14以上
- npm または yarn

### バックエンドのセットアップ

```bash
cd backend
npm install
cp .env.example .env
# .envファイルを編集してデータベース接続情報を設定
npm run prisma:generate
npm run prisma:migrate
npx tsx src/scripts/refresh-data.ts
npm run dev
```

### フロントエンドのセットアップ

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 使い方

1. ブラウザで `http://localhost:5173` にアクセス
2. 日本株/米国株のタブを選択
3. フィルタ条件を入力（任意）
4. 「検索」ボタンをクリック
5. 検索結果をソート・ページネーションで閲覧

## APIドキュメント

詳細なAPIドキュメントは `/backend/README.md` を参照してください。

### 主要エンドポイント

- `GET /api/v1/stocks/screen` - 銘柄スクリーニング
- `GET /api/v1/sectors` - セクターリスト取得
- `POST /api/v1/stocks/refresh` - データ更新
- `GET /api/v1/health` - ヘルスチェック

## データ更新

Yahoo Finance APIから銘柄データを取得・更新するには:

```bash
cd backend
npx tsx src/scripts/refresh-data.ts
```

または、ブラウザ上で「データ更新」ボタンをクリックしてください。

## 開発

### バックエンド開発サーバー

```bash
cd backend
npm run dev
```

### フロントエンド開発サーバー

```bash
cd frontend
npm run dev
```

### データベース管理

Prisma Studioを使用してデータベースを視覚的に管理できます:

```bash
cd backend
npm run prisma:studio
```

## 本番環境へのデプロイ

### バックエンド

```bash
cd backend
npm run build
npm start
```

### フロントエンド

```bash
cd frontend
npm run build
```

ビルドされたファイルは `frontend/dist` に出力されます。

## 免責事項

⚠️ **重要**: 本ツールは投資助言ではありません。投資判断は自己責任で行ってください。

- データソース: Yahoo Finance API
- 提供されるデータの精度には限界があります
- 重要な投資判断を行う際は、複数の情報源を参照してください

## ライセンス

MIT

## 貢献

プルリクエストを歓迎します。大きな変更を加える場合は、まずissueを開いて変更内容を議論してください。

## サポート

問題が発生した場合は、GitHubのissueを作成してください。
