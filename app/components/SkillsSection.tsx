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
    gradient: 'from-cyan-500 to-blue-600',
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
    skills: [
      { name: 'TypeScript', icon: TypeScriptIcon, level: 88, color: 'bg-blue-500' },
      { name: 'JavaScript', icon: JavaScriptIcon, level: 90, color: 'bg-yellow-500' },
      { name: 'Node.js', icon: NodeIcon, level: 82, color: 'bg-green-500' },
    ],
  },
  {
    title: 'Database & Tools',
    icon: DatabaseIcon,
    gradient: 'from-green-500 to-emerald-600',
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
  },
  {
    title: 'Fast Delivery',
    description: 'Quick turnaround with consistent updates',
    icon: '🚀',
  },
  {
    title: 'Communication',
    description: 'Professional and easy collaboration',
    icon: '💬',
  },
  {
    title: 'Reliability',
    description: 'Focus on long-term stability, not shortcuts',
    icon: '🎯',
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
      className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Skills &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Specialized in mobile development with a strong foundation in web technologies and backend services.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map(({ title, icon: CategoryIcon, gradient, skills }, categoryIndex) => (
            <div
              key={title}
              className={`bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                  <CategoryIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {skills.map(({ name, icon: SkillIcon, level, color }, skillIndex) => (
                  <div key={name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <SkillIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-slate-300 text-sm font-medium">{name}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
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
          <h3 className="text-2xl font-bold text-white text-center mb-8">Why Clients Choose Me</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseMe.map(({ title, description, icon }, index) => (
              <div
                key={title}
                className="group p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <p className="text-slate-400 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
