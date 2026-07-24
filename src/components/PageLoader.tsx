'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loader on route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // smooth 450ms transition loader

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0b0e]/90 backdrop-blur-md transition-all duration-300 animate-fade-in-up">
      <div className="relative flex flex-col items-center gap-4">
        {/* Pulsing Outer Glow ring */}
        <div className="absolute w-24 h-24 bg-[#3B82F6]/30 rounded-full blur-xl animate-ping" />
        
        {/* Animated LB Logo */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <img
            src="/logo-transparent.png"
            alt="LogicBlaze Loading..."
            className="w-14 h-14 object-contain animate-bounce"
          />
        </div>

        {/* Loading Spinner ring & Brand text */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono font-bold text-gray-300 tracking-wider uppercase">
            Loading <span className="text-[#3B82F6]">LogicBlaze</span>...
          </span>
        </div>
      </div>
    </div>
  );
}
