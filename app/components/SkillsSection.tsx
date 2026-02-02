'use client';

import { useEffect, useRef, useState } from 'react';
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
  RocketIcon,
  CheckCircleIcon,
  UserCheckIcon,
  NextJsIcon,
} from './Icons';
import { useTheme, Theme } from './ThemeProvider';

// Map skills to themes
const skillThemeMap: Record<string, Theme> = {
  'Android': 'android',
  'Kotlin': 'android',
  'iOS': 'ios',
  'Swift': 'ios',
  'Flutter': 'flutter',
  'TypeScript': 'web',
  'JavaScript': 'web',
  'Node.js': 'web',
  'Next.js': 'web',
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
    icon: AIIcon,
    skills: [
      { name: 'AI Integration', icon: AIIcon, level: 85, color: 'bg-violet-500' },
      { name: 'ML Features', icon: CodeIcon, level: 78, color: 'bg-pink-500' },
      { name: 'Automation', icon: RocketIcon, level: 88, color: 'bg-indigo-500' },
    ],
  },
];

const whyChooseMe = [
  {
    title: 'Clean & Scalable Code',
    description: 'Maintainable, well-documented code with strong architecture patterns.',
    icon: CodeIcon,
    features: ['SOLID Principles', 'Design Patterns'],
  },
  {
    title: 'Fast Delivery',
    description: 'Efficient workflows ensure your project launches on time.',
    icon: RocketIcon,
    features: ['Agile Process', 'Quick Iterations'],
  },
  {
    title: 'Clear Communication',
    description: 'Regular updates and responsive communication throughout.',
    icon: UserCheckIcon,
    features: ['24/7 Available', 'Progress Reports'],
  },
  {
    title: 'Quality Guaranteed',
    description: 'Rigorous testing and post-launch support for success.',
    icon: CheckCircleIcon,
    features: ['Unit Testing', 'Free Bug Fixes'],
  },
];

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme, setTheme, isTransitioning } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSkillClick = (skillName: string) => {
    const targetTheme = skillThemeMap[skillName];
    if (targetTheme && !isTransitioning) {
      setTheme(targetTheme, true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--theme-surface) 0%, var(--theme-background) 100%)' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-1/4 right-0 w-64 h-64 lg:w-80 lg:h-80 rounded-full blur-3xl"
        style={{ background: 'var(--theme-glow)' }}
      />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="theme-badge inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            Tech Stack
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Skills &{' '}
            <span className="theme-gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Specialized in mobile development with a strong foundation in web technologies.
            <span className="text-slate-500 text-xs block mt-1">Click on any skill to change the theme!</span>
          </p>
        </div>

        {/* Skills Grid - Compact */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {skillCategories.map(({ title, icon: CategoryIcon, skills }, categoryIndex) => (
            <div
              key={title}
              className={`theme-card rounded-xl p-4 lg:p-5 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                >
                  <CategoryIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {skills.map(({ name, icon: SkillIcon, level, color }, skillIndex) => {
                  const isClickable = skillThemeMap[name];
                  const isActive = isClickable && skillThemeMap[name] === theme;
                  
                  return (
                    <div 
                      key={name} 
                      className={`group ${isClickable ? 'cursor-pointer' : ''}`}
                      onClick={() => isClickable && handleSkillClick(name)}
                      role={isClickable ? 'button' : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className={`flex items-center gap-1.5 transition-all duration-200 ${isClickable ? 'hover:scale-105' : ''}`}>
                          <SkillIcon 
                            className={`w-3.5 h-3.5 transition-colors ${isActive ? '' : 'text-slate-400 group-hover:text-white'}`}
                            style={isActive ? { color: 'var(--theme-primary)' } : {}}
                          />
                          <span 
                            className={`text-xs font-medium transition-colors ${isActive ? '' : 'text-slate-300'}`}
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
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--theme-border)' }}>
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? `${level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 150) + (skillIndex * 80)}ms`,
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

        {/* Why Choose Me - Compact Grid */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="text-center mb-6">
            <span className="theme-badge inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase mb-3">
              Why Work With Me
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why Clients{' '}
              <span className="theme-gradient-text">Choose Me</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whyChooseMe.map(({ title, description, icon: Icon, features }) => (
              <div
                key={title}
                className="group theme-card p-4 rounded-xl overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-2 line-clamp-2">{description}</p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-1">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: 'var(--theme-background)', color: 'var(--theme-primary)' }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
