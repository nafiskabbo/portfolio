'use client';

import { useTheme, Theme, themeConfig } from './ThemeProvider';
import { memo, useMemo } from 'react';

interface Mascot2DProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'right' | 'center';
  className?: string;
  variant?: 'default' | 'minimal';
}

// Android Robot Mascot - 2D with 3D illusion effect
const AndroidMascot = memo(function AndroidMascot({ size }: { size: number }) {
  return (
    <div 
      className="relative animate-float-slow"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Shadow for 3D illusion */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-md"
        style={{
          width: size * 0.6,
          height: size * 0.15,
          background: 'radial-gradient(ellipse, rgba(61, 220, 132, 0.4), transparent 70%)',
        }}
      />
      
      {/* Main body with 3D transform */}
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'rotateX(5deg) rotateY(-5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Robot Head */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          {/* Head dome */}
          <defs>
            <linearGradient id="android-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76FF03" />
              <stop offset="50%" stopColor="#3DDC84" />
              <stop offset="100%" stopColor="#00BFA5" />
            </linearGradient>
            <filter id="android-glow">
              <feGaussianBlur stdDeviation="2" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Antennas */}
          <line x1="35" y1="25" x2="30" y2="15" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="25" x2="70" y2="15" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="13" r="3" fill="#76FF03" filter="url(#android-glow)" />
          <circle cx="70" cy="13" r="3" fill="#76FF03" filter="url(#android-glow)" />
          
          {/* Head */}
          <path 
            d="M20 55 Q20 25 50 25 Q80 25 80 55 L80 55 Q80 60 75 60 L25 60 Q20 60 20 55 Z" 
            fill="url(#android-head-grad)"
            filter="url(#android-glow)"
          />
          
          {/* Eyes */}
          <circle cx="35" cy="42" r="5" fill="#ffffff" opacity="0.95" />
          <circle cx="65" cy="42" r="5" fill="#ffffff" opacity="0.95" />
          <circle cx="36" cy="43" r="2" fill="#1A2F1E" />
          <circle cx="66" cy="43" r="2" fill="#1A2F1E" />
          
          {/* Body */}
          <rect x="25" y="62" width="50" height="28" rx="6" fill="url(#android-head-grad)" />
          
          {/* Arms */}
          <rect x="12" y="65" width="10" height="20" rx="5" fill="url(#android-head-grad)" />
          <rect x="78" y="65" width="10" height="20" rx="5" fill="url(#android-head-grad)" />
          
          {/* Highlight for 3D effect */}
          <ellipse cx="45" cy="35" rx="15" ry="8" fill="rgba(255,255,255,0.15)" />
        </svg>
      </div>
    </div>
  );
});

// iOS Sphere Mascot - Sleek orb with orbital rings
const IOSMascot = memo(function IOSMascot({ size }: { size: number }) {
  return (
    <div 
      className="relative animate-float-slow"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Shadow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-lg"
        style={{
          width: size * 0.5,
          height: size * 0.12,
          background: 'radial-gradient(ellipse, rgba(10, 132, 255, 0.5), transparent 70%)',
        }}
      />
      
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'rotateX(10deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="ios-sphere-grad" cx="35%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#64D2FF" />
              <stop offset="40%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#5E5CE6" />
            </radialGradient>
            <linearGradient id="ios-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BF5AF2" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#5E5CE6" stopOpacity="1" />
              <stop offset="100%" stopColor="#BF5AF2" stopOpacity="0.8" />
            </linearGradient>
            <filter id="ios-glow">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer orbital ring */}
          <ellipse 
            cx="50" cy="50" rx="45" ry="15" 
            fill="none" 
            stroke="url(#ios-ring-grad)" 
            strokeWidth="2"
            transform="rotate(-20 50 50)"
            opacity="0.6"
          />
          
          {/* Main sphere */}
          <circle 
            cx="50" cy="50" r="30" 
            fill="url(#ios-sphere-grad)"
            filter="url(#ios-glow)"
          />
          
          {/* Inner orbital ring */}
          <ellipse 
            cx="50" cy="50" rx="38" ry="12" 
            fill="none" 
            stroke="url(#ios-ring-grad)" 
            strokeWidth="1.5"
            transform="rotate(15 50 50)"
            opacity="0.4"
          />
          
          {/* Shine highlight */}
          <ellipse cx="40" cy="40" rx="12" ry="8" fill="rgba(255,255,255,0.3)" />
          
          {/* Orbiting dots */}
          <circle cx="85" cy="35" r="4" fill="#BF5AF2" filter="url(#ios-glow)" />
          <circle cx="20" cy="60" r="3" fill="#64D2FF" filter="url(#ios-glow)" />
          <circle cx="70" cy="80" r="3" fill="#5E5CE6" filter="url(#ios-glow)" />
        </svg>
      </div>
    </div>
  );
});

// Flutter Bird Mascot
const FlutterMascot = memo(function FlutterMascot({ size }: { size: number }) {
  return (
    <div 
      className="relative animate-float-slow"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Shadow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-md"
        style={{
          width: size * 0.5,
          height: size * 0.12,
          background: 'radial-gradient(ellipse, rgba(84, 197, 248, 0.4), transparent 70%)',
        }}
      />
      
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'rotateX(5deg) rotateY(5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="flutter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="50%" stopColor="#54C5F8" />
              <stop offset="100%" stopColor="#01579B" />
            </linearGradient>
            <linearGradient id="flutter-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#01579B" />
              <stop offset="100%" stopColor="#0288D1" />
            </linearGradient>
            <filter id="flutter-glow">
              <feGaussianBlur stdDeviation="2" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Bird Body */}
          <ellipse cx="50" cy="55" rx="25" ry="22" fill="url(#flutter-grad)" filter="url(#flutter-glow)" />
          
          {/* Head */}
          <circle cx="65" cy="40" r="15" fill="url(#flutter-grad)" />
          
          {/* Beak */}
          <polygon points="78,42 88,38 78,35" fill="#FF6D00" />
          
          {/* Eye */}
          <circle cx="70" cy="36" r="4" fill="#ffffff" />
          <circle cx="71" cy="37" r="2" fill="#01579B" />
          
          {/* Wing */}
          <path 
            d="M30 45 Q20 35 25 55 Q30 75 50 70 Q35 60 30 45 Z"
            fill="url(#flutter-wing-grad)"
          />
          
          {/* Tail */}
          <path 
            d="M25 55 L15 60 L25 65 Z"
            fill="url(#flutter-wing-grad)"
          />
          
          {/* Highlight */}
          <ellipse cx="55" cy="48" rx="10" ry="6" fill="rgba(255,255,255,0.2)" />
          
          {/* Hot reload spark */}
          <circle cx="20" cy="30" r="5" fill="#FF6D00" opacity="0.8" filter="url(#flutter-glow)" />
        </svg>
      </div>
    </div>
  );
});

// Web/Code Cube Mascot
const WebMascot = memo(function WebMascot({ size }: { size: number }) {
  return (
    <div 
      className="relative animate-float-slow"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Shadow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-md"
        style={{
          width: size * 0.5,
          height: size * 0.12,
          background: 'radial-gradient(ellipse, rgba(244, 114, 182, 0.4), transparent 70%)',
        }}
      />
      
      <div 
        className="relative w-full h-full"
        style={{
          transform: 'rotateX(15deg) rotateY(-15deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="web-top-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9A8D4" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
            <linearGradient id="web-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="web-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <filter id="web-glow">
              <feGaussianBlur stdDeviation="2" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* 3D Cube */}
          {/* Top face */}
          <polygon 
            points="50,15 80,30 50,45 20,30" 
            fill="url(#web-top-grad)"
            filter="url(#web-glow)"
          />
          
          {/* Left face */}
          <polygon 
            points="20,30 50,45 50,80 20,65" 
            fill="url(#web-left-grad)"
          />
          
          {/* Right face */}
          <polygon 
            points="80,30 50,45 50,80 80,65" 
            fill="url(#web-right-grad)"
          />
          
          {/* Code symbols */}
          <text x="35" y="55" fill="#34D399" fontSize="12" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
          
          {/* Wireframe edges for depth */}
          <line x1="50" y1="15" x2="80" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="50" y1="15" x2="20" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="50" y1="45" x2="50" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          
          {/* Floating brackets */}
          <text x="10" y="25" fill="#34D399" fontSize="14" fontFamily="monospace" opacity="0.7">{'{'}</text>
          <text x="82" y="75" fill="#34D399" fontSize="14" fontFamily="monospace" opacity="0.7">{'}'}</text>
          
          {/* Terminal cursor */}
          <rect x="45" y="85" width="10" height="2" fill="#34D399" filter="url(#web-glow)">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  );
});

// Export the main Mascot2D component
export function Mascot2D({ 
  size = 'medium', 
  position = 'right',
  className = '',
  variant = 'default'
}: Mascot2DProps) {
  const { theme } = useTheme();
  
  const sizeValue = useMemo(() => {
    switch (size) {
      case 'small': return 80;
      case 'large': return 200;
      default: return 120;
    }
  }, [size]);

  const positionClass = useMemo(() => {
    switch (position) {
      case 'left': return 'left-0';
      case 'right': return 'right-0';
      case 'center': return 'left-1/2 -translate-x-1/2';
      default: return 'right-0';
    }
  }, [position]);

  const renderMascot = () => {
    switch (theme) {
      case 'android':
        return <AndroidMascot size={sizeValue} />;
      case 'ios':
        return <IOSMascot size={sizeValue} />;
      case 'flutter':
        return <FlutterMascot size={sizeValue} />;
      case 'web':
        return <WebMascot size={sizeValue} />;
      default:
        return <AndroidMascot size={sizeValue} />;
    }
  };

  return (
    <div className={`${positionClass} ${className}`}>
      {renderMascot()}
    </div>
  );
}

// Compact mascot for inline use
export function MascotIcon({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const config = themeConfig[theme];
  
  return (
    <div 
      className={`relative w-12 h-12 animate-float-slow ${className}`}
      style={{ perspective: '500px' }}
    >
      <div 
        className="w-full h-full rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${config.primary}, ${config.secondary})`,
          transform: 'rotateX(10deg) rotateY(-10deg)',
          boxShadow: `0 10px 30px ${config.glow}`,
        }}
      />
    </div>
  );
}

// Export individual mascots for direct use
export { AndroidMascot, IOSMascot, FlutterMascot, WebMascot };
