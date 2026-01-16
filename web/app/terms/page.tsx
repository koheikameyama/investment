/**
 * 利用規約ページ
 */

import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: '利用規約 | AI株式分析ツール',
  description: '当サイトの利用規約・ご利用条件について',
};

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-surface-900 mb-2">
            利用規約
          </h1>
          <p className="text-sm text-surface-500 mb-8">
            最終更新日: 2026年1月16日
          </p>

          <div className="prose prose-slate max-w-none space-y-8">
            {/* はじめに */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                1. はじめに
              </h2>
              <p className="text-surface-700 leading-relaxed">
                本利用規約（以下「本規約」）は、AI株式分析ツール（以下「当サイト」）が提供するサービスの利用条件を定めるものです。
                当サイトをご利用いただく際には、本規約に同意いただいたものとみなします。
              </p>
            </section>

            {/* サービスの概要 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                2. サービスの概要
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトは、AIによる株式分析情報を提供するサービスです。
                ユーザーは当サイトを通じて、以下の情報を閲覧できます：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>株式銘柄の財務指標分析</li>
                <li>AIによる投資推奨（Buy/Sell/Hold）</li>
                <li>銘柄の基本情報</li>
                <li>その他の投資参考情報</li>
              </ul>
            </section>

            {/* 免責事項 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                3. 免責事項
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-amber-900 font-semibold">
                  ⚠️ 重要：投資判断について
                </p>
              </div>
              <ul className="list-disc list-inside space-y-3 text-surface-700">
                <li>
                  当サイトの情報は、投資判断の参考情報として提供されるものであり、
                  投資の勧誘を目的としたものではありません
                </li>
                <li>
                  投資に関する最終的な決定は、ユーザー自身の判断で行ってください
                </li>
                <li>
                  当サイトの情報に基づいて行った投資行為の結果について、
                  当サイトは一切の責任を負いかねます
                </li>
                <li>
                  株式投資にはリスクが伴います。元本割れの可能性があることをご理解ください
                </li>
                <li>
                  AI分析は過去のデータに基づくものであり、将来の結果を保証するものではありません
                </li>
              </ul>
            </section>

            {/* 情報の正確性 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                4. 情報の正確性
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトは、情報の正確性を保つよう努めますが、以下の点にご注意ください：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>
                  提供される情報は、データソースの更新タイミングにより遅延する場合があります
                </li>
                <li>
                  情報の完全性、正確性、有用性について保証するものではありません
                </li>
                <li>
                  誤った情報が含まれる可能性があり、それによる損害について責任を負いません
                </li>
              </ul>
            </section>

            {/* 禁止事項 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                5. 禁止事項
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                ユーザーは、当サイトの利用にあたり、以下の行為を行ってはなりません：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセス行為</li>
                <li>当サイトの情報を無断で商用利用する行為</li>
                <li>その他、当サイトが不適切と判断する行為</li>
              </ul>
            </section>

            {/* サービスの変更・中止 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                6. サービスの変更・中止
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトは、ユーザーへの事前の通知なく、サービスの内容を変更、追加、または中止することがあります。
                これによりユーザーに生じた損害について、当サイトは一切の責任を負いません。
              </p>
            </section>

            {/* 著作権・知的財産権 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                7. 著作権・知的財産権
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトのコンテンツ（テキスト、画像、ロゴ、デザインなど）に関する著作権、
                知的財産権は当サイトまたは権利者に帰属します。
                ユーザーは、当サイトの許可なく、これらを複製、転載、配布することはできません。
              </p>
            </section>

            {/* リンクについて */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                8. リンクについて
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトへのリンクは、原則として自由です。ただし、以下の場合はリンクをお断りすることがあります：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>公序良俗に反するサイトからのリンク</li>
                <li>当サイトの信用を毀損するおそれのあるサイトからのリンク</li>
                <li>フレーム内で当サイトを表示するリンク</li>
              </ul>
            </section>

            {/* プライバシー */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                9. プライバシー
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトのプライバシーに関する考え方については、
                <a
                  href="/privacy-policy"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  プライバシーポリシー
                </a>
                をご確認ください。
              </p>
            </section>

            {/* 利用規約の変更 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                10. 利用規約の変更
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトは、必要に応じて本規約を変更することがあります。
                変更後の利用規約は、本ページに掲載した時点で効力を生じるものとします。
                変更後も当サイトを継続して利用した場合、変更後の利用規約に同意したものとみなします。
              </p>
            </section>

            {/* 準拠法・管轄裁判所 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                11. 準拠法・管轄裁判所
              </h2>
              <p className="text-surface-700 leading-relaxed">
                本規約の解釈にあたっては、日本法を準拠法とします。
                当サイトに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                12. お問い合わせ
              </h2>
              <p className="text-surface-700 leading-relaxed">
                本利用規約に関するお問い合わせは、
                <a
                  href="/contact"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  お問い合わせページ
                </a>
                よりご連絡ください。
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
