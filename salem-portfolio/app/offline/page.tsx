'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);

  // Try to reload the homepage when back online
  useEffect(() => {
    const handleOnline = () => {
      window.location.href = '/';
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    // Small delay for UX feedback, then try to navigate home
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#07152E] flex flex-col items-center justify-center px-6 text-white"
    >
      {/* Logo */}
      <div className="mb-8 opacity-90">
        <Image
          src="/logo.png"
          alt="سعي — م. سالم رزق"
          width={80}
          height={80}
          className="rounded-xl"
          priority
        />
      </div>

      {/* Icon */}
      <div className="mb-6 p-5 rounded-full bg-white/10 border border-white/20">
        <WifiOff className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
      </div>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
        لا يوجد اتصال بالإنترنت
      </h1>

      {/* Subtitle */}
      <p className="text-white/60 text-base sm:text-lg text-center max-w-sm mb-2 leading-relaxed">
        يبدو أنك غير متصل حالياً. تحقق من اتصالك وحاول مجدداً.
      </p>
      <p className="text-white/40 text-sm text-center mb-10">
        ستنتقل تلقائياً للموقع بمجرد عودة الاتصال.
      </p>

      {/* Retry button */}
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#146CFF] hover:bg-[#0756D7] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base shadow-lg shadow-blue-900/40 active:scale-95"
      >
        <RefreshCw
          className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`}
          strokeWidth={2.5}
        />
        {isRetrying ? 'جاري المحاولة...' : 'حاول مجدداً'}
      </button>

      {/* Footer credit */}
      <p className="mt-16 text-white/25 text-xs">
        سعي للتسويق الرقمي — م. سالم رزق
      </p>
    </div>
  );
}
