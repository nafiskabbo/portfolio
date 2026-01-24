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
  NodeIcon,
  FirebaseIcon,
  SupabaseIcon,
  MongoDBIcon,
  SQLIcon,
  MobileIcon,
  WebIcon,
  DatabaseIcon,
} from './Icons';

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: MobileIcon,
    gradient: 'from-green-500 to-emerald-600',
    bgGlow: 'bg-green-500/10',
    skills: [
      { name: 'Flutter', icon: FlutterIcon, level: 95, color: 'bg-cyan-500' },
      { name: 'Kotlin', icon: KotlinIcon, level: 90, color: 'bg-purple-500' },
      { name: 'Swift', icon: SwiftIcon, level: 85, color: 'bg-orange-500' },
      { name: 'Android', icon: AndroidIcon, level: 92, color: 'bg-green-500' },
      { name: 'iOS', icon: AppleIcon, level: 85, color: 'bg-slate-400' },
    ],
  },
  {
    title: 'Web Development',
    icon: WebIcon,
    gradient: 'from-purple-500 to-pink-600',
    bgGlow: 'bg-purple-500/10',
    skills: [
      { name: 'TypeScript', icon: TypeScriptIcon, level: 88, color: 'bg-blue-500' },
      { name: 'JavaScript', icon: JavaScriptIcon, level: 90, color: 'bg-yellow-500' },
      { name: 'Node.js', icon: NodeIcon, level: 82, color: 'bg-green-500' },
    ],
  },
  {
    title: 'Database & Tools',
    icon: DatabaseIcon,
    gradient: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/10',
    skills: [
      { name: 'Firebase', icon: FirebaseIcon, level: 90, color: 'bg-amber-500' },
      { name: 'Supabase', icon: SupabaseIcon, level: 85, color: 'bg-emerald-500' },
      { name: 'MongoDB', icon: MongoDBIcon, level: 80, color: 'bg-green-600' },
      { name: 'SQL', icon: SQLIcon, level: 85, color: 'bg-blue-600' },
    ],
  },
];

const whyChooseMe = [
  {
    title: 'Clean Code',
    description: 'Strong problem-solving with maintainable architecture',
    icon: '💎',
    gradient: 'from-green-500/20 to-emerald-500/10',
  },
  {
    title: 'Fast Delivery',
    description: 'Quick turnaround with consistent updates',
    icon: '🚀',
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    title: 'Communication',
    description: 'Professional and easy collaboration',
    icon: '💬',
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    title: 'Reliability',
    description: 'Focus on long-term stability, not shortcuts',
    icon: '🎯',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
];

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-purple-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-green-500/8 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Tech Stack
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
            Skills &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Specialized in mobile development with a strong foundation in web technologies and backend services.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {skillCategories.map(({ title, icon: CategoryIcon, gradient, bgGlow, skills }, categoryIndex) => (
            <div
              key={title}
              className={`relative bg-slate-800/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-700/50 hover:border-green-500/30 transition-all duration-500 backdrop-blur-sm ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Background Glow */}
              <div className={`absolute -top-16 -right-16 w-32 h-32 sm:w-40 sm:h-40 ${bgGlow} rounded-full blur-3xl opacity-60`} />
              
              {/* Category Header */}
              <div className="relative flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
                  <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{title}</h3>
              </div>

              {/* Skills List */}
              <div className="relative space-y-4 sm:space-y-5">
                {skills.map(({ name, icon: SkillIcon, level, color }, skillIndex) => (
                  <div key={name} className="group">
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <SkillIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-slate-300 text-sm sm:text-base font-medium">{name}</span>
                      </div>
                      <span className="text-slate-500 text-xs sm:text-sm font-medium">{level}%</span>
                    </div>
                    <div className="h-2 sm:h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Me */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-8 sm:mb-10 lg:mb-12">Why Clients Choose Me</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {whyChooseMe.map(({ title, description, icon, gradient }) => (
              <div
                key={title}
                className={`group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${gradient} border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105 text-center backdrop-blur-sm overflow-hidden`}
              >
                <div className="absolute inset-0 bg-slate-900/70" />
                <div className="relative">
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 lg:mb-5">{icon}</div>
                  <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">{title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
