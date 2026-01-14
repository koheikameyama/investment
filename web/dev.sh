#!/bin/bash

# 開発サーバー起動スクリプト
# 環境変数をクリアして.envファイルから読み込む

echo "🚀 開発サーバーを起動します..."
echo "📝 環境変数をクリアして.envファイルから読み込みます..."

# 環境変数をunset
unset DATABASE_URL
unset NODE_ENV

# 開発サーバーを起動
npm run dev
