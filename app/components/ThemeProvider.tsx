'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type Theme = 'android' | 'ios' | 'flutter' | 'web';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, withAnimation?: boolean) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeConfig = {
  android: {
    name: 'Android',
    primary: '#3DDC84',
    secondary: '#34A853',
    accent: '#00C853',
    background: '#0a1a0f',
    surface: '#0f2515',
    border: '#1a3d1f',
    glow: 'rgba(61, 220, 132, 0.15)',
    gradient: 'from-green-500 to-emerald-600',
  },
  ios: {
    name: 'iOS',
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#AF52DE',
    background: '#0a0f1a',
    surface: '#0f1525',
    border: '#1a2540',
    glow: 'rgba(0, 122, 255, 0.15)',
    gradient: 'from-blue-500 to-indigo-600',
  },
  flutter: {
    name: 'Flutter',
    primary: '#02569B',
    secondary: '#54C5F8',
    accent: '#01579B',
    background: '#050a14',
    surface: '#0a1525',
    border: '#152540',
    glow: 'rgba(84, 197, 248, 0.15)',
    gradient: 'from-cyan-500 to-blue-600',
  },
  web: {
    name: 'Next.js',
    primary: '#FFFFFF',
    secondary: '#A855F7',
    accent: '#EC4899',
    background: '#09090b',
    surface: '#18181b',
    border: '#27272a',
    glow: 'rgba(168, 85, 247, 0.15)',
    gradient: 'from-purple-500 to-pink-600',
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

  const setTheme = useCallback((newTheme: Theme, withAnimation = true) => {
    if (newTheme === theme) return;
    
    if (withAnimation) {
      setIsTransitioning(true);
      
      // Add flash effect
      const flash = document.createElement('div');
      flash.className = 'theme-transition-flash';
      flash.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        background: ${themeConfig[newTheme].primary};
        opacity: 0;
        animation: theme-flash 0.6s ease-out forwards;
      `;
      document.body.appendChild(flash);
      
      // Apply theme after brief delay
      setTimeout(() => {
        setThemeState(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update URL
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('theme', newTheme);
        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
      }, 200);
      
      // Clean up
      setTimeout(() => {
        flash.remove();
        setIsTransitioning(false);
      }, 600);
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
  
  const handleClick = () => {
    setTheme(targetTheme, true);
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
