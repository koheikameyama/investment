/**
 * グローバルエラーページ
 */

'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-surface-50">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-red-600 mb-4">エラー</h1>
            <h2 className="text-2xl font-semibold text-surface-900 mb-4">
              重大なエラーが発生しました
            </h2>
            <p className="text-surface-600 mb-2">
              {error.message || 'アプリケーションで予期しないエラーが発生しました。'}
            </p>
            {error.digest && (
              <p className="text-sm text-surface-500 mb-8">
                エラーID: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              再読み込み
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
