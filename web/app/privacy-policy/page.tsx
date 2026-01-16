/**
 * プライバシーポリシーページ
 */

import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | AI株式分析ツール',
  description: '当サイトのプライバシーポリシー・個人情報の取り扱いについて',
};

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-surface-900 mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-surface-500 mb-8">
            最終更新日: 2026年1月16日
          </p>

          <div className="prose prose-slate max-w-none space-y-8">
            {/* 基本方針 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                1. 基本方針
              </h2>
              <p className="text-surface-700 leading-relaxed">
                AI株式分析ツール（以下「当サイト」）は、ユーザーの個人情報保護の重要性を認識し、
                個人情報の保護に関する法律（個人情報保護法）を遵守するとともに、
                以下のプライバシーポリシーに従って、個人情報を適切に取り扱います。
              </p>
            </section>

            {/* 収集する情報 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                2. 収集する情報
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトでは、以下の情報を収集することがあります：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>アクセス解析のための匿名化された情報（Google Analytics）</li>
                <li>Cookieおよび類似技術による情報</li>
                <li>お問い合わせ時に提供いただく情報（メールアドレス等）</li>
              </ul>
            </section>

            {/* Google AdSense */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                3. Google AdSenseについて
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトはGoogle AdSenseを使用して広告を配信しています。
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>
                  Googleはユーザーの興味に応じた広告を配信するため、Cookieを使用します
                </li>
                <li>
                  Cookieを無効にすることで、パーソナライズ広告の配信を無効にできます
                </li>
                <li>
                  詳細は
                  <a
                    href="https://policies.google.com/technologies/ads?hl=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    Googleのポリシーと規約
                  </a>
                  をご確認ください
                </li>
              </ul>
            </section>

            {/* アクセス解析 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                4. アクセス解析ツールについて
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトでは、サービス向上のためGoogle Analyticsを使用しています。
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>
                  Google Analyticsはトラフィックデータの収集のためCookieを使用します
                </li>
                <li>収集されるデータは匿名で、個人を特定するものではありません</li>
                <li>
                  詳細は
                  <a
                    href="https://policies.google.com/privacy?hl=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    Googleプライバシーポリシー
                  </a>
                  をご確認ください
                </li>
              </ul>
            </section>

            {/* Cookieについて */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                5. Cookieについて
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                Cookieとは、Webサイトがユーザーのコンピュータに一時的にデータを保存する仕組みです。
                当サイトでは以下の目的でCookieを使用します：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>サイトの利便性向上</li>
                <li>アクセス解析</li>
                <li>広告配信の最適化</li>
              </ul>
              <p className="text-surface-700 leading-relaxed mt-3">
                ブラウザの設定でCookieを無効にすることができますが、
                一部機能が利用できなくなる場合があります。
              </p>
            </section>

            {/* 個人情報の利用目的 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                6. 個人情報の利用目的
              </h2>
              <p className="text-surface-700 leading-relaxed mb-3">
                当サイトで収集した個人情報は、以下の目的で利用します：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>お問い合わせへの対応</li>
                <li>サービスの改善・品質向上</li>
                <li>重要なお知らせの配信</li>
              </ul>
            </section>

            {/* 個人情報の第三者提供 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                7. 個人情報の第三者提供
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトは、以下の場合を除き、個人情報を第三者に提供することはありません：
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-700 mt-3">
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
              </ul>
            </section>

            {/* 免責事項 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                8. 免責事項
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトの情報は投資判断の参考情報として提供されるものであり、
                投資の勧誘を目的としたものではありません。
                投資に関する最終的な決定はユーザーご自身の判断で行ってください。
                当サイトの情報に基づいて行った投資行為の結果について、
                当サイトは一切の責任を負いかねます。
              </p>
            </section>

            {/* プライバシーポリシーの変更 */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                9. プライバシーポリシーの変更
              </h2>
              <p className="text-surface-700 leading-relaxed">
                当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">
                10. お問い合わせ
              </h2>
              <p className="text-surface-700 leading-relaxed">
                本プライバシーポリシーに関するお問い合わせは、
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
