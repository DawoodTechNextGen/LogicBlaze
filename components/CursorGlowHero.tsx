'use client';

import { useState, useRef, MouseEvent, ReactNode } from 'react';

interface CursorGlowHeroProps {
  children: ReactNode;
}

export default function CursorGlowHero({ children }: CursorGlowHeroProps): JSX.Element {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 500, y: 300 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const bgGlowImage = isHovered
    ? `
      radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(31, 167, 230, 0.22), rgba(61, 30, 109, 0.08) 45%, transparent 80%),
      radial-gradient(circle at 50% -10%, rgba(31, 167, 230, 0.15) 0%, rgba(91, 77, 245, 0.05) 50%, transparent 70%),
      radial-gradient(rgba(8, 27, 51, 0.05) 1px, transparent 1px)
    `
    : `
      radial-gradient(circle at 50% -10%, rgba(31, 167, 230, 0.18) 0%, rgba(91, 77, 245, 0.06) 45%, transparent 70%),
      radial-gradient(rgba(8, 27, 51, 0.05) 1px, transparent 1px)
    `;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-page)',
        backgroundImage: bgGlowImage,
        backgroundSize: isHovered ? '100% 100%, 100% 100%, 32px 32px' : '100% 100%, 32px 32px',
        transition: 'background-image 0.05s ease-out'
      }}
    >
      {/* Ambient Mouse Tracking Halo Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(31, 167, 230, 0.15), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
