# ドキュメント目次

AI株式分析ツールの設計書・戦略書・デプロイ情報をまとめています。

---

## 📋 ドキュメント構成

### 🎯 戦略・ビジョン（strategy/）

サービスの方向性、ビジョン、将来構想に関するドキュメント

| ドキュメント | 概要 | 更新日 |
|-------------|------|--------|
| [STRATEGY.md](./strategy/STRATEGY.md) | **統合戦略書**：二本柱並行開発戦略（メイントラック + イノベーショントラック）、4つの進化軸、統合ロードマップ、リソース配分計画 | 2026-01-15 |
| [archive/](./strategy/archive/) | 過去の戦略ドキュメント（VISION_AND_STRATEGY.md, ADVANCED_FEATURES_PROPOSAL.md） | - |

---

### 🏗️ 設計（design/）

技術設計、アーキテクチャ、実装方針に関するドキュメント

| ドキュメント | 概要 | 更新日 |
|-------------|------|--------|
| [ENHANCED_ANALYSIS_DESIGN.md](./design/ENHANCED_ANALYSIS_DESIGN.md) | 高精度分析システム設計書（データ収集、センチメント分析、テクニカル分析、Mastraハイブリッド構成） | 2026-01-14 |

---

### 🚀 デプロイ・運用（deployment/）

デプロイ手順、環境構築、運用に関するドキュメント

| ドキュメント | 概要 | 更新日 |
|-------------|------|--------|
| [デプロイ概要](./deployment/README.md) | デプロイ全体の概要とナビゲーション | 2026-01-14 |
| [DEPLOYMENT.md](./deployment/DEPLOYMENT.md) | Vercel + Supabaseでのデプロイ手順、環境変数設定、トラブルシューティング | 2026-01-08 |
| [vercel_supabase/](./deployment/vercel_supabase/) | Vercel + Supabase環境の詳細設定 | - |

---

## 🗺️ ドキュメントマップ

### 初めての方へ

```
1. サービス理解
   └─ strategy/STRATEGY.md
      「このサービスが何を目指しているか（統合戦略書）」

2. 技術設計理解
   └─ design/ENHANCED_ANALYSIS_DESIGN.md
      「どのように実装するか」

3. デプロイ
   └─ deployment/DEPLOYMENT.md
      「どうやって動かすか」
```

### 開発者向け

```
実装前:
  ├─ design/ENHANCED_ANALYSIS_DESIGN.md（必読）
  └─ strategy/STRATEGY.md（優先順位判断・全体戦略）

実装中:
  └─ design/ENHANCED_ANALYSIS_DESIGN.md（参照）

デプロイ時:
  └─ deployment/DEPLOYMENT.md

新機能検討時:
  └─ strategy/STRATEGY.md（メイントラック・イノベーショントラック両方）
```

---

## 📊 ドキュメント統計

- **総ドキュメント数**: 5ファイル（+ アーカイブ2件）
- **総行数**: 約2,700行（統合により効率化）
- **最終更新**: 2026-01-15

---

## 🔄 更新履歴

### 2026-01-15
- **STRATEGY.md作成**：VISION_AND_STRATEGY.mdとADVANCED_FEATURES_PROPOSAL.mdを統合
- 二本柱並行開発戦略（メイントラック + イノベーショントラック）を策定
- 古い戦略ドキュメントをstrategy/archive/に移動
- README.md更新（統合戦略書への参照に変更）

### 2026-01-14
- ドキュメント構成を整理（カテゴリ別ディレクトリ化）
- README.md作成（本ファイル）
- VISION_AND_STRATEGY.md追加
- ADVANCED_FEATURES_PROPOSAL.md追加
- ENHANCED_ANALYSIS_DESIGN.md更新（Mastraハイブリッド構成追加）

### 2026-01-08
- DEPLOYMENT.md作成
- Vercel + Supabase環境の初期構築

---

## 📝 ドキュメント作成ガイドライン

新しいドキュメントを追加する際は、以下を守ってください：

1. **適切なディレクトリに配置**
   - 戦略・ビジョン → `strategy/`
   - 技術設計 → `design/`
   - デプロイ・運用 → `deployment/`

2. **Markdownフォーマット**
   - 見出しを適切に使用
   - コードブロックで技術情報を記載
   - 図表を活用

3. **メタ情報を含める**
   - 作成日
   - バージョン
   - 更新履歴

4. **このREADME.mdを更新**
   - 新規ドキュメントを目次に追加
   - 更新履歴に記載

---

## 📞 お問い合わせ

ドキュメントに関する質問・提案がある場合は、GitHubのIssueまたはPull Requestでお知らせください。
