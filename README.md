# 🚀 AI株式分析ツール

AIを活用した日本株・米国株の投資分析プラットフォーム

## 📁 プロジェクト構造

```
stock-analyzer/
├── web/              # Next.jsウェブアプリケーション
├── batch/            # Python バッチ処理
├── prisma/           # データベーススキーマ
└── .github/          # CI/CD（GitHub Actions）
```

## 🎯 機能

### Webアプリケーション
- **リアルタイム分析表示**: 最新の株式分析結果を表示
- **フィルタリング**: 市場（日本/米国）、推奨（Buy/Sell/Hold）でフィルタ
- **分析詳細**: 各銘柄の詳細な分析理由、財務指標を表示
- **レスポンシブデザイン**: モバイル/デスクトップ対応

### バッチ処理
- **自動分析**: 毎日30銘柄（日本株15、米国株15）を自動分析
- **AI分析**: OpenAI GPT-4o-miniで投資判断を生成
- **並列処理**: 5ワーカーで高速処理（約37秒）
- **スキップ機能**: 当日分析済みデータは自動スキップ

## 🚀 クイックスタート

### 必要要件

- Node.js 22.11.0
- Python 3.11.6
- PostgreSQL 16

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd stock-analyzer
```

### 2. 依存関係のインストール

```bash
# すべてインストール
npm run install:all

# または個別に
npm run web:install      # Web依存関係
npm run batch:install    # Python依存関係
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集：

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/stock_analyzer_dev"
OPENAI_API_KEY="sk-proj-..."
```

### 4. データベースのセットアップ

```bash
# スキーマを適用
npm run db:push

# シードデータを投入
npm run db:seed
```

### 5. 開発サーバーの起動

```bash
# Webアプリケーション
npm run dev

# ブラウザで開く
open http://localhost:3000
```

## 📝 コマンド一覧

### Webアプリケーション

```bash
npm run dev          # 開発サーバー起動（ルートから実行可能）
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
```

### データベース

```bash
npm run db:generate  # Prismaクライアント生成
npm run db:push      # スキーマ適用
npm run db:studio    # Prisma Studio起動
npm run db:seed      # シードデータ投入
```

### バッチ処理

```bash
npm run batch        # バッチ実行（ルートから実行可能）
```

または直接実行：

```bash
cd batch
python3 batch_analysis.py
```

## 🌐 本番デプロイ

### Webアプリケーション（Vercel）

詳細は `DEPLOYMENT.md` を参照

### バッチ処理（GitHub Actions）

- **自動実行**: 毎日 UTC 0:00（日本時間 9:00）
- **手動実行**: GitHubのActionsタブから実行可能

セットアップ手順：
1. Supabase等で無料PostgreSQLデータベースを作成
2. GitHubリポジトリのSecretsに設定
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
3. GitHub Actionsが自動で実行されます

## 💰 コスト

- **Webホスティング（Vercel）**: 無料
- **バッチ実行（GitHub Actions）**: 無料
- **データベース（Supabase）**: 無料
- **OpenAI API**: 約¥18/月（30銘柄/日）

**合計**: 約¥18/月

## 🛠 技術スタック

### フロントエンド
- Next.js 15 (App Router + Turbopack)
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query

### バックエンド
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### バッチ処理
- Python 3.11
- OpenAI API
- yfinance
- ThreadPoolExecutor（並列処理）

## 📚 ドキュメント

- [デプロイ手順](./DEPLOYMENT.md)
- [バッチ処理詳細](./batch/README.md)

## 🤝 開発

### 開発フロー

1. featureブランチを作成
2. 変更をコミット
3. プルリクエストを作成
4. レビュー後マージ

### コード規約

- ESLint設定に従う
- コミットメッセージは明確に

## 📄 ライセンス

MIT

## 👤 作成者

Created with ❤️ using Claude Code
