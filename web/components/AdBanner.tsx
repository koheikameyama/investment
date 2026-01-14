/**
 * Google AdSense広告バナーコンポーネント
 */

'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  /**
   * 広告スロットID（AdSenseダッシュボードから取得）
   */
  adSlot: string;

  /**
   * 広告フォーマット
   */
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';

  /**
   * レスポンシブ対応
   */
  fullWidthResponsive?: boolean;

  /**
   * カスタムクラス
   */
  className?: string;
}

// グローバルなGoogle AdSenseの型定義
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Google AdSenseバナー広告コンポーネント
 *
 * 使用例:
 * <AdBanner adSlot="1234567890" adFormat="auto" />
 */
export const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // 既に読み込み済みの場合はスキップ
    if (isLoadedRef.current) return;

    try {
      // Google AdSenseの広告をプッシュ
      if (typeof window !== 'undefined' && adRef.current) {
        // 既に広告が読み込まれているかチェック
        const isAdLoaded = adRef.current.getAttribute('data-adsbygoogle-status');

        if (!isAdLoaded) {
          const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
          adsbygoogle.push({});
          isLoadedRef.current = true;
        }
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7558679080857597"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};
