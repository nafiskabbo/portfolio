'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type Theme = 'android' | 'ios' | 'flutter' | 'web';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, withAnimation?: boolean, clickEvent?: MouseEvent) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeConfig = {
  android: {
    name: 'Android',
    primary: '#3DDC84',
    secondary: '#00BFA5',
    accent: '#76FF03',
    background: '#0D1F12',
    surface: '#1A2F1E',
    border: '#2E4A33',
    glow: 'rgba(61, 220, 132, 0.2)',
    gradient: 'from-green-400 to-teal-500',
    pattern: 'android',
  },
  ios: {
    name: 'iOS',
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#AF52DE',
    background: '#000000',
    surface: '#1C1C1E',
    border: '#3A3A3C',
    glow: 'rgba(0, 122, 255, 0.25)',
    gradient: 'from-blue-500 to-indigo-600',
    pattern: 'ios',
  },
  flutter: {
    name: 'Flutter',
    primary: '#54C5F8',
    secondary: '#01579B',
    accent: '#FF6D00',
    background: '#0A1929',
    surface: '#132F4C',
    border: '#1E4976',
    glow: 'rgba(84, 197, 248, 0.25)',
    gradient: 'from-cyan-400 to-blue-600',
    pattern: 'flutter',
  },
  web: {
    name: 'Next.js',
    primary: '#F472B6',
    secondary: '#A78BFA',
    accent: '#34D399',
    background: '#0F0A1A',
    surface: '#1A1525',
    border: '#2D2640',
    glow: 'rgba(244, 114, 182, 0.2)',
    gradient: 'from-pink-400 to-purple-500',
    pattern: 'web',
  },
} as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('android');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize theme from URL or localStorage
  useEffect(() => {
    const urlTheme = searchParams.get('theme') as Theme | null;
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    const validThemes: Theme[] = ['android', 'ios', 'flutter', 'web'];
    
    let initialTheme: Theme = 'android';
    
    if (urlTheme && validThemes.includes(urlTheme)) {
      initialTheme = urlTheme;
    } else if (savedTheme && validThemes.includes(savedTheme)) {
      initialTheme = savedTheme;
    }
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [searchParams]);

  const applyTheme = (newTheme: Theme) => {
    const config = themeConfig[newTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', config.primary);
    root.style.setProperty('--theme-secondary', config.secondary);
    root.style.setProperty('--theme-accent', config.accent);
    root.style.setProperty('--theme-background', config.background);
    root.style.setProperty('--theme-surface', config.surface);
    root.style.setProperty('--theme-border', config.border);
    root.style.setProperty('--theme-glow', config.glow);
    
    // Update data attribute for CSS selectors
    root.setAttribute('data-theme', newTheme);
  };

  const setTheme = useCallback((newTheme: Theme, withAnimation = true, clickEvent?: MouseEvent) => {
    if (newTheme === theme) return;
    
    if (withAnimation) {
      setIsTransitioning(true);
      
      // Get click position for radial effect origin
      const x = clickEvent?.clientX ?? window.innerWidth / 2;
      const y = clickEvent?.clientY ?? window.innerHeight / 2;
      
      // Calculate max distance to corners for proper coverage
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y)
      );
      
      // Create container for effects
      const effectsContainer = document.createElement('div');
      effectsContainer.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        overflow: hidden;
      `;
      document.body.appendChild(effectsContainer);
      
      // Radial wipe effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, ${themeConfig[newTheme].primary}40, ${themeConfig[newTheme].secondary}20, transparent 70%);
        transform: translate(-50%, -50%);
        animation: theme-ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      `;
      effectsContainer.appendChild(ripple);
      
      // Add CSS animation dynamically
      const style = document.createElement('style');
      style.textContent = `
        @keyframes theme-ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: ${maxDistance * 2.5}px;
            height: ${maxDistance * 2.5}px;
            opacity: 0;
          }
        }
        @keyframes particle-float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Create particles explosion
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 4 + Math.random() * 8;
        const delay = Math.random() * 0.2;
        
        particle.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${i % 2 === 0 ? themeConfig[newTheme].primary : themeConfig[newTheme].secondary};
          --tx: ${tx}px;
          --ty: ${ty}px;
          animation: particle-float 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards;
          box-shadow: 0 0 ${size}px ${themeConfig[newTheme].primary}80;
        `;
        effectsContainer.appendChild(particle);
      }
      
      // Flash overlay for smooth color transition
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, ${themeConfig[newTheme].primary}15, ${themeConfig[newTheme].secondary}10);
        opacity: 0;
        animation: theme-flash-new 0.5s ease-out forwards;
      `;
      
      const flashStyle = document.createElement('style');
      flashStyle.textContent = `
        @keyframes theme-flash-new {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(flashStyle);
      effectsContainer.appendChild(flash);
      
      // Apply theme after brief delay
      setTimeout(() => {
        setThemeState(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update URL
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('theme', newTheme);
        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
      }, 150);
      
      // Clean up
      setTimeout(() => {
        effectsContainer.remove();
        style.remove();
        flashStyle.remove();
        setIsTransitioning(false);
      }, 1000);
    } else {
      setThemeState(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    }
  }, [theme, pathname, router, searchParams]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'android', setTheme: () => {}, isTransitioning: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper component for clickable theme triggers
interface ThemeTriggerProps {
  targetTheme: Theme;
  children: ReactNode;
  className?: string;
  as?: 'button' | 'span' | 'div';
}

export function ThemeTrigger({ targetTheme, children, className = '', as = 'button' }: ThemeTriggerProps) {
  const { setTheme, theme } = useTheme();
  const Component = as;
  
  const handleClick = (e: React.MouseEvent) => {
    setTheme(targetTheme, true, e.nativeEvent);
  };
  
  const isActive = theme === targetTheme;
  
  return (
    <Component
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-300 ${isActive ? 'ring-2 ring-[var(--theme-primary)] ring-offset-2 ring-offset-[var(--theme-background)]' : ''} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${themeConfig[targetTheme].name} theme`}
    >
      {children}
    </Component>
  );
}
