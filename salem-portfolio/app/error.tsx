'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service if needed
    console.error('[GlobalError]', error);
  }, [error]);

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
          width={72}
          height={72}
          className="rounded-xl"
          priority
        />
      </div>

      {/* Icon */}
      <p className="text-6xl mb-6">⚠️</p>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
        حدث خطأ غير متوقع
      </h1>

      <p className="text-white/60 text-base text-center max-w-sm mb-10 leading-relaxed">
        نأسف على ذلك. يمكنك المحاولة مجدداً أو العودة للصفحة الرئيسية.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="px-7 py-3.5 rounded-full bg-[#146CFF] hover:bg-[#0756D7] transition-all duration-200 font-semibold shadow-lg shadow-blue-900/40 active:scale-95"
        >
          حاول مجدداً
        </button>
        <Link
          href="/"
          className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 font-semibold text-center active:scale-95"
        >
          الرئيسية
        </Link>
      </div>

      <p className="mt-16 text-white/25 text-xs">
        سعي للتسويق الرقمي — م. سالم رزق
      </p>
    </div>
  );
}
