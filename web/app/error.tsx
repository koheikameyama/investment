/**
 * エラーページ
 */

'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-600 mb-4">エラー</h1>
        <h2 className="text-2xl font-semibold text-surface-900 mb-4">
          問題が発生しました
        </h2>
        <p className="text-surface-600 mb-2">
          {error.message || '予期しないエラーが発生しました。'}
        </p>
        {error.digest && (
          <p className="text-sm text-surface-500 mb-8">
            エラーID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            再試行
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-surface-200 text-surface-900 rounded-lg hover:bg-surface-300 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
