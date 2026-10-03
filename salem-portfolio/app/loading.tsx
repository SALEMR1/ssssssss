export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FBFCFF] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo pulse */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-saey-blue to-saey-violet animate-pulse" />
        {/* Skeleton bar */}
        <div className="flex flex-col gap-2 items-center">
          <div className="h-2.5 w-32 rounded-full bg-saey-blue/20 animate-pulse" />
          <div className="h-2 w-20 rounded-full bg-saey-blue/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
