# 本番環境デプロイ手順

## GitHub Actions による無料自動実行

このプロジェクトでは、GitHub Actionsを使用して毎日自動で株式分析を実行します。**完全無料**で動作します。

## 必要な準備

### 1. PostgreSQLデータベース（無料）

以下のいずれかの無料PostgreSQLサービスを使用してください：

#### **Supabase**（おすすめ）
- URL: https://supabase.com/
- 無料プラン: 500MB、無制限リクエスト
- セットアップ:
  1. アカウント作成
  2. 新規プロジェクト作成
  3. Database → Connection string をコピー
  4. `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres` の形式

#### **Neon**
- URL: https://neon.tech/
- 無料プラン: 10GB、常時稼働
- セットアップ:
  1. アカウント作成
  2. 新規プロジェクト作成
  3. Connection string をコピー

### 2. GitHubリポジトリのシークレット設定

GitHubリポジトリで環境変数を設定します：

1. GitHubリポジトリページを開く
2. **Settings** → **Secrets and variables** → **Actions** をクリック
3. **New repository secret** をクリック
4. 以下の2つのシークレットを追加：

#### `DATABASE_URL`
```
postgresql://user:password@host:5432/database
```

#### `OPENAI_API_KEY`
```
sk-proj-...
```

### 3. データベースのセットアップ

ローカルでスキーマを本番DBに反映します：

```bash
# .envファイルに本番DBのURLを設定
DATABASE_URL="postgresql://..."

# スキーマを本番DBに適用
npx prisma db push

# シードデータを投入
npm run db:seed
```

## 実行スケジュール

- **自動実行**: 毎日 UTC 0:00（日本時間 9:00）
- **手動実行**: GitHubのActionsタブから実行可能

## 手動実行方法

1. GitHubリポジトリページを開く
2. **Actions** タブをクリック
3. **Daily Stock Analysis** を選択
4. **Run workflow** → **Run workflow** をクリック

## ログの確認

1. **Actions** タブを開く
2. 実行履歴から該当のワークフローをクリック
3. **analyze** ジョブをクリックしてログを確認

## コスト

- **GitHub Actions**: 無料（月2,000分まで、1回あたり約3分）
- **PostgreSQL**: 無料（Supabase/Neonの無料プラン）
- **OpenAI API**: 約¥0.61/日（30銘柄）

**月間コスト**: 約¥18（OpenAI APIのみ）

## トラブルシューティング

### エラーが発生した場合

1. Actionsタブでログを確認
2. エラーメッセージを確認
3. DATABASE_URLとOPENAI_API_KEYが正しく設定されているか確認

### 実行時刻を変更したい場合

`.github/workflows/daily-analysis.yml` の `cron` を編集：

```yaml
schedule:
  - cron: '0 0 * * *'  # UTC時刻で指定
```

**日本時間への変換**:
- JST 9:00 → UTC 0:00 → `'0 0 * * *'`
- JST 12:00 → UTC 3:00 → `'0 3 * * *'`
- JST 21:00 → UTC 12:00 → `'0 12 * * *'`

## 注意事項

- 初回実行時は全銘柄を分析します（約37秒）
- 2回目以降は当日分をスキップします（約2.5秒）
- BRK.Bはデータ取得失敗のため常にスキップされます
