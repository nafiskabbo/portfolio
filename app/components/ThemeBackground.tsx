'use client';

import { useTheme, Theme } from './ThemeProvider';
import { memo, useState, useEffect } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
  rotation: number;
  type: number;
}

// Generate deterministic default elements (for SSR)
function generateDefaultElements(count: number): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 17) % 100),          // Deterministic spread
    y: ((i * 23) % 100),          // Deterministic spread
    size: 20 + (i % 5) * 8,       // 20, 28, 36, 44, 52
    opacity: 0.1 + (i % 4) * 0.03, // 0.1, 0.13, 0.16, 0.19
    speed: 20 + (i % 6) * 5,      // 20, 25, 30, 35, 40, 45
    delay: -(i % 10) * 2.5,       // 0, -2.5, -5, ... -22.5
    rotation: (i * 37) % 360,     // Deterministic rotation
    type: i % 5,
  }));
}

// Generate random floating elements (for client-side)
function generateRandomElements(count: number): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 15,
    opacity: Math.random() * 0.2 + 0.08,
    speed: Math.random() * 25 + 20,
    delay: Math.random() * -25,
    rotation: Math.random() * 360,
    type: i % 5,
  }));
}

// Android floating elements - Material Design shapes + robot parts
const AndroidElements = memo(function AndroidElements({ elements }: { elements: FloatingElement[] }) {
  return (
    <>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow pointer-events-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.speed}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 0 ? (
            // Android robot head
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              style={{ opacity: el.opacity * 1.5, transform: `rotate(${el.rotation}deg)` }}
            >
              <path
                d="M17.523 15.34c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-11.05 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m11.4-6.02l2-3.46a.42.42 0 00-.15-.57.42.42 0 00-.57.15l-2.02 3.5C15.59 8.24 13.85 7.85 12 7.85s-3.59.39-5.14 1.1L4.84 5.45a.42.42 0 00-.57-.15.42.42 0 00-.15.57l2 3.46C2.69 11.19.34 14.66 0 18.76h24c-.34-4.1-2.69-7.57-6.13-9.44"
                fill="#3DDC84"
              />
            </svg>
          ) : el.type === 1 ? (
            // Rounded rectangle (Material FAB)
            <div
              className="rounded-2xl"
              style={{
                width: el.size,
                height: el.size * 0.65,
                background: `linear-gradient(135deg, rgba(61, 220, 132, ${el.opacity * 1.2}), rgba(0, 191, 165, ${el.opacity * 0.6}))`,
                transform: `rotate(${el.rotation}deg)`,
                boxShadow: `0 4px 20px rgba(61, 220, 132, ${el.opacity})`,
              }}
            />
          ) : el.type === 2 ? (
            // Circle (FAB style)
            <div
              className="rounded-full"
              style={{
                width: el.size * 0.8,
                height: el.size * 0.8,
                background: `radial-gradient(circle, rgba(118, 255, 3, ${el.opacity * 1.5}), transparent 70%)`,
              }}
            />
          ) : el.type === 3 ? (
            // Android antenna
            <svg width={el.size * 0.5} height={el.size} viewBox="0 0 20 40" style={{ opacity: el.opacity * 1.5 }}>
              <line x1="10" y1="40" x2="10" y2="10" stroke="#3DDC84" strokeWidth="2" strokeLinecap="round" />
              <circle cx="10" cy="6" r="6" fill="#76FF03" />
            </svg>
          ) : (
            // Material Design diamond
            <div
              className="rotate-45"
              style={{
                width: el.size * 0.6,
                height: el.size * 0.6,
                background: `linear-gradient(135deg, rgba(61, 220, 132, ${el.opacity}), rgba(0, 191, 165, ${el.opacity * 0.5}))`,
                borderRadius: '4px',
              }}
            />
          )}
        </div>
      ))}
    </>
  );
});

// iOS floating elements - SF Symbols style + Apple design
const IOSElements = memo(function IOSElements({ elements }: { elements: FloatingElement[] }) {
  return (
    <>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow pointer-events-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.speed}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 0 ? (
            // Apple logo
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              style={{ opacity: el.opacity * 1.8, transform: `rotate(${el.rotation * 0.1}deg)` }}
            >
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="#007AFF"
              />
            </svg>
          ) : el.type === 1 ? (
            // iOS-style app icon (rounded square)
            <div
              className="rounded-[22%]"
              style={{
                width: el.size,
                height: el.size,
                background: `linear-gradient(180deg, rgba(0, 122, 255, ${el.opacity * 1.5}) 0%, rgba(88, 86, 214, ${el.opacity}) 100%)`,
                boxShadow: `0 4px 20px rgba(0, 122, 255, ${el.opacity * 0.8})`,
              }}
            />
          ) : el.type === 2 ? (
            // iOS blur orb
            <div
              className="rounded-full blur-xl"
              style={{
                width: el.size * 2,
                height: el.size * 2,
                background: `radial-gradient(circle, rgba(0, 122, 255, ${el.opacity * 1.8}), transparent 70%)`,
              }}
            />
          ) : el.type === 3 ? (
            // SF Symbol style - gear
            <svg width={el.size} height={el.size} viewBox="0 0 24 24" style={{ opacity: el.opacity * 1.5 }}>
              <circle cx="12" cy="12" r="3" fill="none" stroke="#5856D6" strokeWidth="1.5" />
              <path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="#5856D6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            // Dynamic Island style pill
            <div
              className="rounded-full"
              style={{
                width: el.size * 1.8,
                height: el.size * 0.5,
                background: `linear-gradient(90deg, rgba(0, 122, 255, ${el.opacity}), rgba(175, 82, 222, ${el.opacity * 0.7}))`,
                filter: 'blur(1px)',
              }}
            />
          )}
        </div>
      ))}
    </>
  );
});

// Flutter floating elements - Birds and widgets
const FlutterElements = memo(function FlutterElements({ elements }: { elements: FloatingElement[] }) {
  return (
    <>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow pointer-events-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.speed}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 0 ? (
            // Flutter bird logo
            <svg
              width={el.size}
              height={el.size}
              viewBox="0 0 24 24"
              style={{ opacity: el.opacity * 1.8, transform: `rotate(${el.rotation * 0.2}deg)` }}
            >
              <path
                d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"
                fill="#54C5F8"
              />
            </svg>
          ) : el.type === 1 ? (
            // Widget container (Material style)
            <div
              className="rounded-xl border-2"
              style={{
                width: el.size,
                height: el.size,
                borderColor: `rgba(84, 197, 248, ${el.opacity * 2.5})`,
                background: `rgba(1, 87, 155, ${el.opacity * 0.4})`,
                boxShadow: `inset 0 0 15px rgba(84, 197, 248, ${el.opacity * 0.5})`,
              }}
            />
          ) : el.type === 2 ? (
            // Hot reload lightning
            <svg width={el.size} height={el.size * 1.5} viewBox="0 0 24 36" style={{ opacity: el.opacity * 2 }}>
              <path d="M13 2L4 20h7v14l9-18h-7V2z" fill="#FF6D00" />
            </svg>
          ) : el.type === 3 ? (
            // Dart arrow
            <svg width={el.size} height={el.size} viewBox="0 0 24 24" style={{ opacity: el.opacity * 1.5, transform: `rotate(${el.rotation}deg)` }}>
              <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="#54C5F8" strokeWidth="1.5" />
              <polygon points="12,6 18,12 12,18 6,12" fill="rgba(84, 197, 248, 0.3)" />
            </svg>
          ) : (
            // Floating orb
            <div
              className="rounded-full"
              style={{
                width: el.size * 0.7,
                height: el.size * 0.7,
                background: `radial-gradient(circle, rgba(255, 109, 0, ${el.opacity * 1.8}), transparent 70%)`,
              }}
            />
          )}
        </div>
      ))}
    </>
  );
});

// Web floating elements - Code and terminal
const WebElements = memo(function WebElements({ elements }: { elements: FloatingElement[] }) {
  const codeSymbols = ['</', '/>', '{', '}', '()', '=>', '&&', '[ ]', '::'];

  return (
    <>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow pointer-events-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.speed}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 0 ? (
            // Code symbol
            <span
              className="font-mono font-bold"
              style={{
                fontSize: el.size * 0.9,
                color: `rgba(244, 114, 182, ${el.opacity * 2.5})`,
                textShadow: `0 0 10px rgba(244, 114, 182, ${el.opacity})`,
              }}
            >
              {codeSymbols[el.id % codeSymbols.length]}
            </span>
          ) : el.type === 1 ? (
            // Terminal window
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: el.size * 1.5,
                height: el.size,
                background: `rgba(26, 21, 37, ${el.opacity * 3})`,
                border: `1px solid rgba(167, 139, 250, ${el.opacity * 2})`,
              }}
            >
              <div className="flex gap-1 p-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ opacity: el.opacity * 4 }} />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" style={{ opacity: el.opacity * 4 }} />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ opacity: el.opacity * 4 }} />
              </div>
            </div>
          ) : el.type === 2 ? (
            // Cursor blink
            <div
              className="animate-pulse"
              style={{
                width: 3,
                height: el.size,
                background: `rgba(52, 211, 153, ${el.opacity * 4})`,
                boxShadow: `0 0 10px rgba(52, 211, 153, ${el.opacity * 2})`,
              }}
            />
          ) : el.type === 3 ? (
            // Next.js logo style
            <svg width={el.size} height={el.size} viewBox="0 0 24 24" style={{ opacity: el.opacity * 1.5 }}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="#F472B6" strokeWidth="1" />
              <path d="M8 8v8l8-8" fill="#F472B6" fillOpacity="0.5" />
            </svg>
          ) : (
            // Gradient line
            <div
              className="rounded"
              style={{
                width: el.size * 2.5,
                height: 3,
                background: `linear-gradient(90deg, rgba(167, 139, 250, ${el.opacity * 3}), transparent)`,
              }}
            />
          )}
        </div>
      ))}
    </>
  );
});

interface ThemeBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function ThemeBackground({ className = '', intensity = 'medium' }: ThemeBackgroundProps) {
  const { theme } = useTheme();
  const elementCount = intensity === 'low' ? 12 : intensity === 'medium' ? 20 : 30;

  // Start with deterministic elements, then randomize on client
  const [elements, setElements] = useState<FloatingElement[]>(() => generateDefaultElements(elementCount));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setElements(generateRandomElements(elementCount));
    setMounted(true);
  }, [elementCount]);

  const renderElements = () => {
    switch (theme) {
      case 'android':
        return <AndroidElements elements={elements} />;
      case 'ios':
        return <IOSElements elements={elements} />;
      case 'flutter':
        return <FlutterElements elements={elements} />;
      case 'web':
        return <WebElements elements={elements} />;
      default:
        return <AndroidElements elements={elements} />;
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none theme-bg-animated ${className}`}
      style={{ background: 'var(--theme-background)' }}
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, var(--theme-glow), transparent 50%),
            radial-gradient(ellipse at 70% 80%, color-mix(in srgb, var(--theme-secondary) 15%, transparent), transparent 50%)
          `,
        }}
      />

      {/* Animated floating elements - only show after mount to avoid flicker */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {renderElements()}
      </div>

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Compact background for smaller sections
export function ThemeBackgroundCompact({ className = '' }: { className?: string }) {
  const { theme } = useTheme();

  // Start with deterministic elements, then randomize on client
  const [elements, setElements] = useState<FloatingElement[]>(() => generateDefaultElements(8));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setElements(generateRandomElements(8));
    setMounted(true);
  }, []);

  const renderMiniElements = () => {
    switch (theme) {
      case 'android':
        return <AndroidElements elements={elements} />;
      case 'ios':
        return <IOSElements elements={elements} />;
      case 'flutter':
        return <FlutterElements elements={elements} />;
      case 'web':
        return <WebElements elements={elements} />;
      default:
        return <AndroidElements elements={elements} />;
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: 'var(--theme-background)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%, var(--theme-glow), transparent 40%),
            radial-gradient(ellipse at 100% 50%, color-mix(in srgb, var(--theme-secondary) 12%, transparent), transparent 40%)
          `,
        }}
      />

      {/* Mini floating elements */}
      <div className={`absolute inset-0 overflow-hidden opacity-70 transition-opacity duration-500 ${mounted ? 'opacity-70' : 'opacity-0'}`}>
        {renderMiniElements()}
      </div>
    </div>
  );
}
