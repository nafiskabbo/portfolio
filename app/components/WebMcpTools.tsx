'use client';

import { useEffect } from 'react';
import { ALL_PROJECTS } from '../data/projects';

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

interface ModelContext {
  registerTool: (tool: ModelContextTool) => () => void;
}

interface NavigatorWithModelContext extends Navigator {
  modelContext?: ModelContext;
}

const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

export function WebMcpTools() {
  useEffect(() => {
    const nav = navigator as NavigatorWithModelContext;
    if (!nav.modelContext?.registerTool) return;

    const unregister: Array<() => void> = [];

    unregister.push(
      nav.modelContext.registerTool({
        name: 'navigate_to_section',
        description: 'Scroll to a section on the portfolio homepage.',
        inputSchema: {
          type: 'object',
          properties: {
            section: {
              type: 'string',
              enum: [...SECTIONS],
              description: 'Homepage section id',
            },
          },
          required: ['section'],
        },
        execute: async (input) => {
          const section = String(input.section ?? 'home');
          const hash = section === 'home' ? '#home' : `#${section}`;
          window.location.hash = hash;
          const el = document.getElementById(section);
          el?.scrollIntoView({ behavior: 'smooth' });
          return { success: true, section };
        },
      })
    );

    unregister.push(
      nav.modelContext.registerTool({
        name: 'list_projects',
        description: 'List all portfolio projects with titles, platforms, and URLs.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['ai', 'mobile', 'fintech', 'utility', 'open-source'],
              description: 'Optional category filter (open-source includes emu8086web)',
            },
          },
        },
        execute: async (input) => {
          const category = input.category as string | undefined;
          const projects = ALL_PROJECTS.filter(
            (p) => !category || p.category === category
          ).map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            platform: p.platform,
            category: p.category,
            url: `${window.location.origin}/projects/${p.id}`,
          }));
          return { projects, count: projects.length };
        },
      })
    );

    unregister.push(
      nav.modelContext.registerTool({
        name: 'get_project',
        description: 'Get details for a specific portfolio project by id.',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'Project slug (e.g. emu8086web, heal-tone, deenhub, santa-chat, emaisha-pay)',
            },
          },
          required: ['id'],
        },
        execute: async (input) => {
          const id = String(input.id);
          const project = ALL_PROJECTS.find((p) => p.id === id);
          if (!project) {
            return { error: 'Project not found', id, availableIds: ALL_PROJECTS.map((p) => p.id) };
          }
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            platform: project.platform,
            category: project.category,
            tags: project.tags,
            featured: Boolean(project.featured),
            links: project.links,
            url: `${window.location.origin}/projects/${project.id}`,
          };
        },
      })
    );

    unregister.push(
      nav.modelContext.registerTool({
        name: 'open_chat',
        description: 'Open the portfolio AI chat assistant page.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
        execute: async () => {
          window.location.href = '/chat';
          return { success: true, url: `${window.location.origin}/chat` };
        },
      })
    );

    return () => {
      for (const fn of unregister) fn();
    };
  }, []);

  return null;
}
