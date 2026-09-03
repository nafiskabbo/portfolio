'use client';

import {
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  AutomationIcon,
  NextJsIcon,
} from './Icons';
import { useTheme, type Theme } from './ThemeProvider';

const techStack: { icon: typeof AndroidIcon; label: string; theme: Theme }[] = [
  { icon: AndroidIcon, label: 'Android', theme: 'android' },
  { icon: AppleIcon, label: 'iOS', theme: 'ios' },
  { icon: FlutterIcon, label: 'Flutter', theme: 'flutter' },
  { icon: NextJsIcon, label: 'Next.js', theme: 'web' },
  { icon: AutomationIcon, label: 'AI / Automation', theme: 'automation' },
];

export function FooterThemeSwitcher() {
  const { theme, setTheme, isTransitioning } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-slate-500 text-xs mr-1">Theme:</span>
      {techStack.map(({ icon: Icon, label, theme: targetTheme }) => {
        const isActive = theme === targetTheme;
        return (
          <button
            key={label}
            type="button"
            onClick={(e) => {
              if (!isTransitioning) {
                setTheme(targetTheme, true, e.nativeEvent);
              }
            }}
            disabled={isTransitioning}
            className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-70 ${
              isActive
                ? 'ring-2 ring-offset-2 ring-[var(--theme-primary)] ring-offset-[var(--theme-background)]'
                : ''
            }`}
            style={{
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
            }}
            title={`Switch to ${label} theme`}
          >
            <Icon
              className="w-4 h-4 transition-colors"
              style={{ color: isActive ? 'var(--theme-primary)' : 'white' }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function FooterNextJsLink() {
  const { setTheme, isTransitioning } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        if (!isTransitioning) {
          setTheme('web', true, e.nativeEvent);
        }
      }}
      className="font-medium hover:underline cursor-pointer"
      style={{ color: 'var(--theme-primary)' }}
    >
      Next.js
    </button>
  );
}
