import Logo from "./Logo";

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Full-screen / inline loading state. Uses CSS-only animations (see index.css
 * `.dalni-pulse` + `.dalni-progress`) instead of multiple framer-motion infinite
 * tweens, so it paints cheaply while a lazy route is downloading.
 */
export default function LoadingFallback({ message = "جاري تحميل الصفحة بذكاء...", fullScreen = true }: LoadingFallbackProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4"
    : "w-full min-h-[300px] bg-slate-50/40 rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-6";

  return (
    <div id="loading-fallback-container" className={containerClasses} dir="rtl">
      {/* Decorative ambient background glows for full screen */}
      {fullScreen && (
        <>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative flex flex-col items-center max-w-sm text-center">
        {/* Pulsing ring behind the logo — CSS keyframes, no JS frames. */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/5 border border-primary/10 dalni-pulse-slow" />
          <div className="absolute w-16 h-16 rounded-full bg-accent/5 border border-accent/10 dalni-pulse-fast" />
          <div className="relative transform hover:scale-105 transition-transform">
            <Logo size={48} animated={true} light={false} />
          </div>
        </div>

        {/* Loading text */}
        <h3 className="text-lg font-black text-slate-850 tracking-tight mb-2">
          {message}
        </h3>

        {/* Subtle customized message */}
        <p className="text-xs text-slate-500 font-medium mb-5 max-w-xs leading-relaxed">
          نعمل على تسريع ظهور الملفات التجارية وحملات الإعلانات لنجاح مشروعك 🚀
        </p>

        {/* Custom premium sliding progress bar — CSS-only. */}
        <div className="w-40 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 shadow-inner">
          <div className="h-full w-1/3 bg-gradient-to-r from-primary to-accent rounded-full dalni-progress" />
        </div>
      </div>
    </div>
  );
}
