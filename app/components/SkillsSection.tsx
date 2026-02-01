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
  AIIcon,
  CodeIcon,
  RocketIcon,
  CheckCircleIcon,
  UserCheckIcon,
} from './Icons';

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: MobileIcon,
    gradient: 'from-green-500 to-emerald-600',
    bgGlow: 'bg-green-500/10',
    skills: [
      { name: 'Android', icon: AndroidIcon, level: 92, color: 'bg-green-500' },
      { name: 'iOS', icon: AppleIcon, level: 85, color: 'bg-slate-400' },
      { name: 'Flutter', icon: FlutterIcon, level: 95, color: 'bg-cyan-500' },
      { name: 'Kotlin', icon: KotlinIcon, level: 90, color: 'bg-purple-500' },
      { name: 'Swift', icon: SwiftIcon, level: 85, color: 'bg-orange-500' },
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
    title: 'Database & Backend',
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
  {
    title: 'AI & Automation',
    icon: AIIcon,
    gradient: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/10',
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
    description: 'I write maintainable, well-documented code with strong architecture patterns that scale with your business.',
    icon: CodeIcon,
    gradient: 'from-green-500 to-emerald-600',
    features: ['SOLID Principles', 'Design Patterns', 'Code Reviews'],
  },
  {
    title: 'Lightning Fast Delivery',
    description: 'Efficient workflows and proven methodologies ensure your project launches on time, every time.',
    icon: RocketIcon,
    gradient: 'from-cyan-500 to-blue-600',
    features: ['Agile Process', 'Daily Updates', 'Quick Iterations'],
  },
  {
    title: 'Clear Communication',
    description: 'Regular updates, transparent progress tracking, and responsive communication throughout the project.',
    icon: UserCheckIcon,
    gradient: 'from-purple-500 to-pink-600',
    features: ['24/7 Availability', 'Progress Reports', 'Video Calls'],
  },
  {
    title: 'Quality Guaranteed',
    description: 'Rigorous testing, bug-free delivery, and post-launch support to ensure long-term success.',
    icon: CheckCircleIcon,
    gradient: 'from-amber-500 to-orange-600',
    features: ['Unit Testing', 'QA Process', 'Free Bug Fixes'],
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
      className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-bold tracking-wide uppercase mb-6">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Skills &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Specialized in mobile development with a strong foundation in web technologies, backend services, and AI automation.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skillCategories.map(({ title, icon: CategoryIcon, gradient, bgGlow, skills }, categoryIndex) => (
            <div
              key={title}
              className={`relative bg-slate-800/50 rounded-2xl p-7 lg:p-8 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Background Glow */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 ${bgGlow} rounded-full blur-3xl opacity-60`} />

              {/* Category Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
                  <CategoryIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
              </div>

              {/* Skills List */}
              <div className="relative space-y-4">
                {skills.map(({ name, icon: SkillIcon, level, color }, skillIndex) => (
                  <div key={name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <SkillIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-slate-300 text-sm font-medium">{name}</span>
                      </div>
                      <span className="text-slate-500 text-xs font-medium">{level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
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

        {/* Why Choose Me - Redesigned */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold tracking-wide uppercase mb-4">
              Why Work With Me
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Why Clients{' '}
              <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                Choose Me
              </span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {whyChooseMe.map(({ title, description, icon: Icon, gradient, features }, index) => (
              <div
                key={title}
                className="group relative p-6 lg:p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative flex flex-col lg:flex-row gap-5">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg lg:text-xl mb-2">{title}</h4>
                    <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-4">{description}</p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-medium"
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
