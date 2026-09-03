'use client';

import {
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  AutomationIcon,
} from './Icons';
import { useTheme, type Theme } from './ThemeProvider';

const techBadges: {
  id: Theme;
  icon: typeof AndroidIcon;
  label: string;
  themeColor: string;
}[] = [
  {
    id: 'android',
    icon: AndroidIcon,
    label: 'Android',
    themeColor:
      'from-green-500/20 to-green-600/10 border-green-500/40 text-green-400 hover:bg-green-500/30',
  },
  {
    id: 'ios',
    icon: AppleIcon,
    label: 'iOS',
    themeColor:
      'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400 hover:bg-blue-500/30',
  },
  {
    id: 'flutter',
    icon: FlutterIcon,
    label: 'Flutter',
    themeColor:
      'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30',
  },
  {
    id: 'automation',
    icon: AutomationIcon,
    label: 'AI Automation',
    themeColor:
      'from-fuchsia-500/20 to-amber-500/10 border-fuchsia-500/50 text-fuchsia-200 hover:bg-fuchsia-500/20',
  },
];

export function HeroThemeBadges() {
  const { theme, setTheme, isTransitioning } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-5 sm:mb-6">
      {techBadges.map(({ id, icon: Icon, label, themeColor }) => (
        <button
          key={id}
          type="button"
          onClick={(e) => {
            if (!isTransitioning) {
              setTheme(id, true, e.nativeEvent);
            }
          }}
          disabled={isTransitioning}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r ${themeColor} border backdrop-blur-md transition-all duration-300 hover:scale-105 disabled:opacity-70 ${
            theme === id
              ? 'ring-2 ring-offset-2 ring-offset-[var(--theme-background)] ring-[var(--theme-primary)]'
              : ''
          }`}
          title={`Switch to ${label} theme`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
}
