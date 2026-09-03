'use client';

import type { RefObject } from 'react';
import {
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  KotlinIcon,
  SwiftIcon,
  JavaScriptIcon,
  TypeScriptIcon,
  NodeJsIcon,
  FirebaseIcon,
  SupabaseIcon,
  MongoDBIcon,
  SQLIcon,
  MobileIcon,
  WebIcon,
  DatabaseIcon,
  AIIcon,
  CodeIcon,
  AutomationIcon,
  NextJsIcon,
} from './Icons';
import { useTheme, type Theme } from './ThemeProvider';
import { useReveal } from './Reveal';

const skillThemeMap: Record<string, Theme> = {
  Android: 'android',
  Kotlin: 'android',
  iOS: 'ios',
  Swift: 'ios',
  Flutter: 'flutter',
  TypeScript: 'web',
  JavaScript: 'web',
  'Node.js': 'web',
  'Next.js': 'web',
  Automation: 'automation',
  Chatbots: 'automation',
  'LLM APIs': 'automation',
  n8n: 'automation',
};

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: MobileIcon,
    skills: [
      { name: 'Android', icon: AndroidIcon, level: 92, color: 'bg-green-500' },
      { name: 'iOS', icon: AppleIcon, level: 85, color: 'bg-blue-500' },
      { name: 'Flutter', icon: FlutterIcon, level: 95, color: 'bg-cyan-500' },
      { name: 'Kotlin', icon: KotlinIcon, level: 90, color: 'bg-purple-500' },
      { name: 'Swift', icon: SwiftIcon, level: 85, color: 'bg-orange-500' },
    ],
  },
  {
    title: 'Web Development',
    icon: WebIcon,
    skills: [
      { name: 'TypeScript', icon: TypeScriptIcon, level: 88, color: 'bg-blue-500' },
      { name: 'JavaScript', icon: JavaScriptIcon, level: 90, color: 'bg-yellow-500' },
      { name: 'Node.js', icon: NodeJsIcon, level: 88, color: 'bg-green-600' },
      { name: 'Next.js', icon: NextJsIcon, level: 85, color: 'bg-white' },
    ],
  },
  {
    title: 'Database & Backend',
    icon: DatabaseIcon,
    skills: [
      { name: 'Firebase', icon: FirebaseIcon, level: 90, color: 'bg-amber-500' },
      { name: 'Supabase', icon: SupabaseIcon, level: 85, color: 'bg-emerald-500' },
      { name: 'MongoDB', icon: MongoDBIcon, level: 80, color: 'bg-green-600' },
      { name: 'SQL', icon: SQLIcon, level: 85, color: 'bg-blue-600' },
    ],
  },
  {
    title: 'AI & Automation',
    icon: AutomationIcon,
    skills: [
      { name: 'n8n', icon: AutomationIcon, level: 88, color: 'bg-amber-500' },
      { name: 'Chatbots', icon: AIIcon, level: 90, color: 'bg-violet-500' },
      { name: 'LLM APIs', icon: CodeIcon, level: 88, color: 'bg-cyan-500' },
    ],
  },
];

export function SkillsGrid() {
  const { ref: sectionRef, visible: isVisible } = useReveal();
  const { theme, setTheme, isTransitioning } = useTheme();

  return (
    <div ref={sectionRef as RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {skillCategories.map(({ title, icon: CategoryIcon, skills }, categoryIndex) => (
        <div
          key={title}
          className={`theme-card rounded-xl p-4 lg:p-5 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${categoryIndex * 100}ms` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
              }}
            >
              <CategoryIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
          </div>

          <div className="space-y-3">
            {skills.map(({ name, icon: SkillIcon, level, color }, skillIndex) => {
              const isClickable = skillThemeMap[name];
              const isActive = isClickable && skillThemeMap[name] === theme;

              return (
                <div
                  key={name}
                  className={`group ${isClickable ? 'cursor-pointer' : ''}`}
                  onClick={(e) => {
                    const targetTheme = skillThemeMap[name];
                    if (targetTheme && !isTransitioning) {
                      setTheme(targetTheme, true, e.nativeEvent);
                    }
                  }}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (!isClickable) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const targetTheme = skillThemeMap[name];
                      if (targetTheme && !isTransitioning) {
                        setTheme(targetTheme, true);
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div
                      className={`flex items-center gap-1.5 transition-all duration-200 ${
                        isClickable ? 'hover:scale-105' : ''
                      }`}
                    >
                      <SkillIcon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? '' : 'text-slate-400 group-hover:text-white'
                        }`}
                        style={isActive ? { color: 'var(--theme-primary)' } : {}}
                      />
                      <span
                        className={`text-xs font-medium transition-colors ${
                          isActive ? '' : 'text-slate-300'
                        }`}
                        style={isActive ? { color: 'var(--theme-primary)' } : {}}
                      >
                        {name}
                      </span>
                      {isClickable && (
                        <span className="text-[8px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          click
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 text-[10px]">{level}%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'var(--theme-border)' }}
                  >
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isVisible ? `${level}%` : '0%',
                        transitionDelay: `${categoryIndex * 150 + skillIndex * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
