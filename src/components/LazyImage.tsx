import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  wrapperClassName = "relative overflow-hidden w-full h-full rounded-2xl bg-slate-900",
  fallbackSrc,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={wrapperClassName} ref={imgRef}>
      {/* Premium dark shimmer skeleton */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {isInView && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setHasError(true);
            setIsLoaded(true);
            if (onError) onError(e);
          }}
          className={`${className} transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
}
