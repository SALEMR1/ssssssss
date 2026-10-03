import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة — 404 | سعي · م. سالم رزق',
  robots: { index: false, follow: false },
};

export default function NotFound() {
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

      {/* 404 number */}
      <p className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-[#146CFF] to-[#6A3DFF] bg-clip-text text-transparent leading-none mb-4">
        404
      </p>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
        الصفحة غير موجودة
      </h1>

      {/* Subtitle */}
      <p className="text-white/60 text-base sm:text-lg text-center max-w-sm mb-10 leading-relaxed">
        الرابط الذي تبحث عنه غير موجود أو تم نقله. ارجع للصفحة الرئيسية.
      </p>

      {/* Back home */}
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full bg-[#146CFF] hover:bg-[#0756D7] transition-all duration-200 font-semibold text-base shadow-lg shadow-blue-900/40 active:scale-95"
      >
        العودة للرئيسية
      </Link>

      {/* Footer credit */}
      <p className="mt-16 text-white/25 text-xs">
        سعي للتسويق الرقمي — م. سالم رزق
      </p>
    </div>
  );
}
