/**
 * CV PDF Generator — 5 Unique Templates
 *
 * Usage:
 *   npx tsx scripts/generate-cv.ts           # generate all 5
 *   npx tsx scripts/generate-cv.ts 1         # generate template 1 only
 *   npx tsx scripts/generate-cv.ts 3         # generate template 3 only
 *
 * Output: public/cv.pdf  (default / template 1)
 *         public/cv-{n}.pdf for the rest
 */

import { jsPDF } from 'jspdf';
import * as path from 'path';
import {
  PROFILE,
  SUMMARY,
  WORK_EXPERIENCE,
  PROJECTS,
  SKILLS,
  EDUCATION,
  type CVProject,
} from './cv-data';

// ============================================================
// Shared helpers
// ============================================================

const A4_W = 210;
const A4_H = 297;
const MARGIN = 14;
const PAGE_W = A4_W - MARGIN * 2;

function linkAnnotation(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  url: string,
) {
  doc.link(x, y - h + 1, w, h, { url });
}

function drawProjectLinks(
  doc: jsPDF,
  project: CVProject,
  x: number,
  y: number,
  fontSize: number,
  linkColor: [number, number, number],
): number {
  doc.setFontSize(fontSize);
  let cx = x;
  const links: { label: string; url: string }[] = [];
  if (project.androidUrl) links.push({ label: 'Android', url: project.androidUrl });
  if (project.iosUrl) links.push({ label: 'iOS', url: project.iosUrl });
  if (project.webUrl) links.push({ label: 'Web', url: project.webUrl });

  links.forEach((link, i) => {
    if (i > 0) {
      doc.setTextColor(120, 120, 120);
      doc.text(' · ', cx, y);
      cx += doc.getTextWidth(' · ');
    }
    doc.setTextColor(...linkColor);
    const tw = doc.getTextWidth(link.label);
    doc.text(link.label, cx, y);
    linkAnnotation(doc, cx, y, tw, fontSize * 0.35, link.url);
    // Underline
    doc.setDrawColor(...linkColor);
    doc.setLineWidth(0.15);
    doc.line(cx, y + 0.5, cx + tw, y + 0.5);
    cx += tw;
  });

  return cx - x; // width consumed
}

// ============================================================
// TEMPLATE 1 — "Midnight Mono"
// Dark sidebar, monospaced accents, clean left-right split
// ============================================================
function template1(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const sideW = 62;
  const mainX = sideW + 8;
  const mainW = A4_W - mainX - MARGIN;

  // === SIDEBAR ===
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, sideW, A4_H, 'F');

  // Name
  let sy = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(PROFILE.name, 10, sy);

  sy += 6;
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(61, 220, 132); // green
  doc.text(PROFILE.subtitle, 10, sy);

  // Contact
  sy += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('CONTACT', 10, sy);
  sy += 1;
  doc.setDrawColor(61, 220, 132);
  doc.setLineWidth(0.4);
  doc.line(10, sy, 52, sy);

  sy += 5;
  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);

  const contactItems = [
    { label: PROFILE.email, url: `mailto:${PROFILE.email}` },
    { label: PROFILE.phone, url: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
    { label: PROFILE.linkedin, url: PROFILE.linkedinUrl },
    { label: PROFILE.github, url: PROFILE.githubUrl },
    { label: PROFILE.portfolio, url: PROFILE.portfolioUrl },
  ];

  contactItems.forEach((c) => {
    doc.setTextColor(56, 189, 248); // cyan
    const tw = doc.getTextWidth(c.label);
    doc.text(c.label, 10, sy);
    linkAnnotation(doc, 10, sy, tw, 3, c.url);
    sy += 4.5;
  });

  // Skills
  sy += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('SKILLS', 10, sy);
  sy += 1;
  doc.setDrawColor(61, 220, 132);
  doc.line(10, sy, 52, sy);
  sy += 5;

  const skillSections = [
    { title: 'Mobile', items: SKILLS.mobile },
    { title: 'Architecture', items: SKILLS.architecture },
    { title: 'Backend', items: SKILLS.backend },
    { title: 'Tools', items: SKILLS.tools },
  ];

  skillSections.forEach((section) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(section.title, 10, sy);
    sy += 4;
    doc.setFont('courier', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(203, 213, 225);
    section.items.forEach((item) => {
      doc.text(`> ${item}`, 10, sy);
      sy += 3.5;
    });
    sy += 2;
  });

  // Education
  sy += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('EDUCATION', 10, sy);
  sy += 1;
  doc.setDrawColor(61, 220, 132);
  doc.line(10, sy, 52, sy);
  sy += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text(EDUCATION.degree, 10, sy, { maxWidth: 44 });
  sy += 7;
  doc.setFont('courier', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  doc.text(EDUCATION.institution, 10, sy, { maxWidth: 44 });
  sy += 7;
  doc.setTextColor(61, 220, 132);
  doc.text(EDUCATION.period, 10, sy);

  // === MAIN CONTENT ===
  let my = 22;

  // Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('SUMMARY', mainX, my);
  my += 1.5;
  doc.setDrawColor(61, 220, 132);
  doc.setLineWidth(0.6);
  doc.line(mainX, my, mainX + 30, my);
  my += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(SUMMARY, mainW);
  doc.text(summaryLines, mainX, my);
  my += summaryLines.length * 3.8 + 4;

  // Experience
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('EXPERIENCE', mainX, my);
  my += 1.5;
  doc.setDrawColor(61, 220, 132);
  doc.line(mainX, my, mainX + 30, my);
  my += 5;

  WORK_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, mainX, my);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(61, 220, 132);
    doc.text(exp.period, mainX + mainW - doc.getTextWidth(exp.period), my);
    my += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.company, mainX, my);
    my += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(exp.description, mainW);
    doc.text(descLines, mainX, my);
    my += descLines.length * 3.5 + 4;
  });

  // Projects
  my += 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('KEY PROJECTS', mainX, my);
  my += 1.5;
  doc.setDrawColor(61, 220, 132);
  doc.line(mainX, my, mainX + 30, my);
  my += 5;

  PROJECTS.forEach((project) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(project.name, mainX, my);
    my += 3.5;

    // Tech + Links on same line
    doc.setFont('courier', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(project.tech, mainX, my);

    // Links
    const techW = doc.getTextWidth(project.tech + '  ');
    drawProjectLinks(doc, project, mainX + techW, my, 6.5, [56, 189, 248]);

    my += 4;

    // Highlights
    project.highlights.forEach((h) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(`• ${h}`, mainW - 2);
      doc.text(lines, mainX + 2, my);
      my += lines.length * 3.2 + 1;
    });

    my += 3;
  });

  return doc;
}

// ============================================================
// TEMPLATE 2 — "Bold Blocks"
// Full-width sections with bold colored headers, modern feel
// ============================================================
function template2(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const mx = MARGIN;
  const contentW = PAGE_W;

  // Header bar
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, A4_W, 36, 'F');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(PROFILE.name, mx, 17);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(61, 220, 132);
  doc.text(PROFILE.subtitle, mx, 25);

  // Contact line
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const contactStr = `${PROFILE.email}  ·  ${PROFILE.phone}  ·  ${PROFILE.linkedin}  ·  ${PROFILE.portfolio}`;
  doc.text(contactStr, mx, 32);

  // Clickable links in header
  let cx = mx;
  const contactParts = [
    { text: PROFILE.email, url: `mailto:${PROFILE.email}` },
    { text: '  ·  ', url: '' },
    { text: PROFILE.phone, url: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
    { text: '  ·  ', url: '' },
    { text: PROFILE.linkedin, url: PROFILE.linkedinUrl },
    { text: '  ·  ', url: '' },
    { text: PROFILE.portfolio, url: PROFILE.portfolioUrl },
  ];
  doc.setFontSize(7);
  contactParts.forEach((p) => {
    const tw = doc.getTextWidth(p.text);
    if (p.url) linkAnnotation(doc, cx, 32, tw, 3, p.url);
    cx += tw;
  });

  let y = 44;

  // Section helper
  function sectionHeader(title: string) {
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(mx - 2, y - 4, contentW + 4, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), mx, y);
    // Accent bar
    doc.setFillColor(61, 220, 132);
    doc.rect(mx - 2, y - 4, 1.5, 8, 'F');
    y += 8;
  }

  // Summary
  sectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const sLines = doc.splitTextToSize(SUMMARY, contentW);
  doc.text(sLines, mx, y);
  y += sLines.length * 3.8 + 6;

  // Experience
  sectionHeader('Work Experience');
  WORK_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role}  —  ${exp.company}`, mx, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.period, mx + contentW - doc.getTextWidth(exp.period), y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(exp.description, contentW);
    doc.text(lines, mx, y);
    y += lines.length * 3.5 + 4;
  });

  y += 2;

  // Projects
  sectionHeader('Key Projects');
  PROJECTS.forEach((project) => {
    // Project name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(project.name, mx, y);

    // Links next to name
    const nameW = doc.getTextWidth(project.name + '  ');
    drawProjectLinks(doc, project, mx + nameW, y, 7, [37, 99, 235]);

    y += 3.5;

    // Tech
    doc.setFont('courier', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(project.tech, mx, y);
    y += 4;

    project.highlights.forEach((h) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(`- ${h}`, contentW - 4);
      doc.text(lines, mx + 3, y);
      y += lines.length * 3.2 + 1;
    });
    y += 3;
  });

  // Skills (inline tags)
  y += 1;
  sectionHeader('Technical Skills');
  const allSkills = [
    ...SKILLS.mobile,
    ...SKILLS.architecture,
    ...SKILLS.backend,
    ...SKILLS.tools,
  ];

  let tagX = mx;
  const tagH = 5;
  const tagPadding = 2;
  doc.setFontSize(6.5);
  allSkills.forEach((skill) => {
    const tw = doc.getTextWidth(skill) + tagPadding * 2;
    if (tagX + tw > mx + contentW) {
      tagX = mx;
      y += tagH + 2;
    }
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(tagX, y - 3.5, tw, tagH, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(skill, tagX + tagPadding, y);
    tagX += tw + 2;
  });
  y += tagH + 6;

  // Education
  sectionHeader('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(EDUCATION.degree, mx, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`${EDUCATION.institution}  ·  ${EDUCATION.period}`, mx, y);

  return doc;
}

// ============================================================
// TEMPLATE 3 — "Neon Accent"
// White bg, neon green accent line on left, ultra-clean layout
// ============================================================
function template3(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const mx = MARGIN + 6; // Extra margin for accent line
  const contentW = A4_W - mx - MARGIN;

  // Accent strip
  doc.setFillColor(61, 220, 132);
  doc.rect(0, 0, 4, A4_H, 'F');

  // Header
  let y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(PROFILE.name, mx, y);

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(61, 220, 132);
  doc.text(PROFILE.subtitle, mx, y);

  // Contact row
  y += 8;
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  const contacts = [
    { text: PROFILE.email, url: `mailto:${PROFILE.email}` },
    { text: PROFILE.phone, url: '' },
    { text: PROFILE.linkedin, url: PROFILE.linkedinUrl },
    { text: PROFILE.portfolio, url: PROFILE.portfolioUrl },
  ];
  let cx = mx;
  contacts.forEach((c, i) => {
    if (i > 0) {
      doc.text('  |  ', cx, y);
      cx += doc.getTextWidth('  |  ');
    }
    if (c.url) {
      doc.setTextColor(37, 99, 235);
      const tw = doc.getTextWidth(c.text);
      doc.text(c.text, cx, y);
      linkAnnotation(doc, cx, y, tw, 3, c.url);
      cx += tw;
      doc.setTextColor(100, 116, 139);
    } else {
      doc.text(c.text, cx, y);
      cx += doc.getTextWidth(c.text);
    }
  });

  // Divider
  y += 5;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(mx, y, mx + contentW, y);
  y += 6;

  // Summary
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const sLines = doc.splitTextToSize(SUMMARY, contentW);
  doc.text(sLines, mx, y);
  y += sLines.length * 3.8 + 5;

  // Section helper
  function section(title: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), mx, y);
    y += 1.5;
    doc.setDrawColor(61, 220, 132);
    doc.setLineWidth(0.5);
    doc.line(mx, y, mx + 24, y);
    y += 5;
  }

  // Experience
  section('Experience');
  WORK_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, mx, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(61, 220, 132);
    doc.text(exp.period, mx + contentW - doc.getTextWidth(exp.period), y);
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.company, mx, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(exp.description, contentW);
    doc.text(lines, mx, y);
    y += lines.length * 3.5 + 4;
  });

  // Projects
  y += 1;
  section('Projects');
  PROJECTS.forEach((project) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(project.name, mx, y);

    const nw = doc.getTextWidth(project.name + '  ');
    drawProjectLinks(doc, project, mx + nw, y, 6.5, [61, 220, 132]);
    y += 3.5;

    doc.setFont('courier', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(project.tech, mx, y);
    y += 4;

    project.highlights.forEach((h) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(`– ${h}`, contentW - 3);
      doc.text(lines, mx + 2, y);
      y += lines.length * 3.2 + 1;
    });
    y += 3;
  });

  // Skills + Education side by side
  y += 1;
  const halfW = contentW / 2 - 3;

  // Skills
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('SKILLS', mx, y);
  doc.text('EDUCATION', mx + halfW + 6, y);
  y += 1.5;
  doc.setDrawColor(61, 220, 132);
  doc.setLineWidth(0.5);
  doc.line(mx, y, mx + 18, y);
  doc.line(mx + halfW + 6, y, mx + halfW + 24, y);
  y += 5;

  const skillY = y;
  Object.entries(SKILLS).forEach(([, items]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text(items.join(', '), mx, y, { maxWidth: halfW });
    y += 4;
  });

  // Education (right column)
  let ey = skillY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(EDUCATION.degree, mx + halfW + 6, ey, { maxWidth: halfW });
  ey += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(EDUCATION.institution, mx + halfW + 6, ey, { maxWidth: halfW });
  ey += 7;
  doc.setTextColor(61, 220, 132);
  doc.text(EDUCATION.period, mx + halfW + 6, ey);

  return doc;
}

// ============================================================
// TEMPLATE 4 — "Terminal Dark"
// Dark background throughout, monospace vibe, developer-focused
// ============================================================
function template4(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const mx = MARGIN;
  const contentW = PAGE_W;

  // Full dark bg
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, A4_W, A4_H, 'F');

  // Header
  let y = 18;
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(61, 220, 132);
  doc.text('$ whoami', mx, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(PROFILE.name, mx, y);

  y += 6;
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(61, 220, 132);
  doc.text(PROFILE.subtitle, mx, y);

  // Contact
  y += 7;
  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);
  const contactPairs = [
    { label: '', text: PROFILE.email, url: `mailto:${PROFILE.email}` },
    { label: '', text: PROFILE.phone, url: '' },
    { label: '', text: PROFILE.linkedin, url: PROFILE.linkedinUrl },
    { label: '', text: PROFILE.portfolio, url: PROFILE.portfolioUrl },
  ];
  let cx = mx;
  contactPairs.forEach((c, i) => {
    if (i > 0) {
      doc.setTextColor(100, 116, 139);
      doc.text(' | ', cx, y);
      cx += doc.getTextWidth(' | ');
    }
    if (c.url) {
      doc.setTextColor(56, 189, 248);
      const tw = doc.getTextWidth(c.text);
      doc.text(c.text, cx, y);
      linkAnnotation(doc, cx, y, tw, 3, c.url);
      cx += tw;
    } else {
      doc.setTextColor(203, 213, 225);
      doc.text(c.text, cx, y);
      cx += doc.getTextWidth(c.text);
    }
  });

  // Divider
  y += 5;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.3);
  doc.line(mx, y, mx + contentW, y);
  y += 5;

  function sectionTitle(title: string) {
    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(61, 220, 132);
    doc.text(`// ${title}`, mx, y);
    y += 5;
  }

  // Summary
  sectionTitle('SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  const sLines = doc.splitTextToSize(SUMMARY, contentW);
  doc.text(sLines, mx, y);
  y += sLines.length * 3.6 + 5;

  // Experience
  sectionTitle('EXPERIENCE');
  WORK_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(exp.role, mx, y);
    doc.setFont('courier', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(61, 220, 132);
    doc.text(exp.period, mx + contentW - doc.getTextWidth(exp.period), y);
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(exp.company, mx, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    const lines = doc.splitTextToSize(exp.description, contentW);
    doc.text(lines, mx, y);
    y += lines.length * 3.3 + 4;
  });

  // Projects
  y += 1;
  sectionTitle('PROJECTS');
  PROJECTS.forEach((project) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(project.name, mx, y);

    const nw = doc.getTextWidth(project.name + '  ');
    drawProjectLinks(doc, project, mx + nw, y, 6.5, [56, 189, 248]);
    y += 3.5;

    doc.setFont('courier', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(61, 220, 132);
    doc.text(`[${project.tech}]`, mx, y);
    y += 4;

    project.highlights.forEach((h) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(203, 213, 225);
      const lines = doc.splitTextToSize(`> ${h}`, contentW - 3);
      doc.text(lines, mx + 2, y);
      y += lines.length * 3 + 1;
    });
    y += 3;
  });

  // Skills
  y += 1;
  sectionTitle('SKILLS');
  const allSkills = [
    ...SKILLS.mobile,
    ...SKILLS.architecture,
    ...SKILLS.backend,
    ...SKILLS.tools,
  ];

  let tagX = mx;
  doc.setFontSize(6);
  allSkills.forEach((skill) => {
    const tw = doc.getTextWidth(skill) + 4;
    if (tagX + tw > mx + contentW) {
      tagX = mx;
      y += 6;
    }
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(tagX, y - 3.5, tw, 5, 1, 1, 'F');
    doc.setDrawColor(61, 220, 132);
    doc.setLineWidth(0.15);
    doc.roundedRect(tagX, y - 3.5, tw, 5, 1, 1, 'S');
    doc.setFont('courier', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(skill, tagX + 2, y);
    tagX += tw + 2;
  });
  y += 8;

  // Education
  sectionTitle('EDUCATION');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(EDUCATION.degree, mx, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(EDUCATION.institution, mx, y);
  y += 4;
  doc.setFont('courier', 'normal');
  doc.setTextColor(61, 220, 132);
  doc.text(EDUCATION.period, mx, y);

  return doc;
}

// ============================================================
// TEMPLATE 5 — "Dual Column"
// Modern two-column layout, colored top banner, balanced design
// ============================================================
function template5(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const mx = MARGIN;
  const contentW = PAGE_W;

  // Top banner
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 0, A4_W, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(PROFILE.name, mx, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(191, 219, 254);
  doc.text(PROFILE.subtitle, mx, 23);

  // Contact in banner
  doc.setFontSize(6.5);
  doc.setTextColor(219, 234, 254);
  let cx = mx;
  const bannerContacts = [
    { text: PROFILE.email, url: `mailto:${PROFILE.email}` },
    { text: PROFILE.phone, url: '' },
    { text: PROFILE.linkedin, url: PROFILE.linkedinUrl },
    { text: PROFILE.portfolio, url: PROFILE.portfolioUrl },
  ];
  bannerContacts.forEach((c, i) => {
    if (i > 0) {
      doc.text('  ·  ', cx, 29);
      cx += doc.getTextWidth('  ·  ');
    }
    const tw = doc.getTextWidth(c.text);
    doc.text(c.text, cx, 29);
    if (c.url) linkAnnotation(doc, cx, 29, tw, 3, c.url);
    cx += tw;
  });

  let y = 40;
  const colW = contentW / 2 - 4;
  const col2X = mx + colW + 8;

  // Left column: Summary + Experience + Education
  function leftSection(title: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(title.toUpperCase(), mx, y);
    y += 1.5;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.4);
    doc.line(mx, y, mx + 20, y);
    y += 5;
  }

  // Summary
  leftSection('Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const sLines = doc.splitTextToSize(SUMMARY, colW);
  doc.text(sLines, mx, y);
  y += sLines.length * 3.5 + 5;

  // Experience
  leftSection('Experience');
  WORK_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, mx, y);
    y += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(37, 99, 235);
    doc.text(`${exp.company} · ${exp.period}`, mx, y);
    y += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(exp.description, colW);
    doc.text(lines, mx, y);
    y += lines.length * 3.3 + 4;
  });

  // Skills
  leftSection('Skills');
  const skillGroups = [
    { title: 'Mobile', items: SKILLS.mobile },
    { title: 'Architecture', items: SKILLS.architecture },
    { title: 'Backend', items: SKILLS.backend },
    { title: 'Tools', items: SKILLS.tools },
  ];
  skillGroups.forEach((g) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(g.title + ':', mx, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(' ' + g.items.join(', '), mx + doc.getTextWidth(g.title + ': '), y, { maxWidth: colW - doc.getTextWidth(g.title + ': ') });
    y += 4.5;
  });

  y += 3;

  // Education
  leftSection('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(EDUCATION.degree, mx, y, { maxWidth: colW });
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(EDUCATION.institution, mx, y, { maxWidth: colW });
  y += 7;
  doc.setTextColor(37, 99, 235);
  doc.text(EDUCATION.period, mx, y);

  // Right column: Projects
  let ry = 40;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text('KEY PROJECTS', col2X, ry);
  ry += 1.5;
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.4);
  doc.line(col2X, ry, col2X + 20, ry);
  ry += 5;

  PROJECTS.forEach((project) => {
    // Card background
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(col2X - 2, ry - 4, colW + 4, 1, 1.5, 1.5, 'F'); // will expand below

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(project.name, col2X, ry);
    ry += 3;

    // Links
    drawProjectLinks(doc, project, col2X, ry, 6, [37, 99, 235]);
    ry += 3.5;

    doc.setFont('courier', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(100, 116, 139);
    doc.text(project.tech, col2X, ry);
    ry += 4;

    project.highlights.forEach((h) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(`• ${h}`, colW - 2);
      doc.text(lines, col2X + 1, ry);
      ry += lines.length * 3 + 1;
    });

    ry += 4;
  });

  return doc;
}

// ============================================================
// Main — generate PDFs
// ============================================================
const templates = [template1, template2, template3, template4, template5];
const labels = [
  'Midnight Mono',
  'Bold Blocks',
  'Neon Accent',
  'Terminal Dark',
  'Dual Column',
];

async function main() {
  const arg = process.argv[2];
  const outDir = path.resolve(__dirname, '..', 'public');

  if (arg) {
    const idx = parseInt(arg, 10) - 1;
    if (idx < 0 || idx >= templates.length) {
      console.error(`Template ${arg} not found. Use 1-${templates.length}`);
      process.exit(1);
    }
    const doc = templates[idx]();
    const filename = idx === 0 ? 'cv.pdf' : `cv-${idx + 1}.pdf`;
    const outputPath = path.join(outDir, filename);
    const buffer = Buffer.from(doc.output('arraybuffer'));
    const fs = await import('fs');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Template ${idx + 1} "${labels[idx]}" → ${outputPath}`);
  } else {
    const fs = await import('fs');
    for (let i = 0; i < templates.length; i++) {
      const doc = templates[i]();
      const filename = i === 0 ? 'cv.pdf' : `cv-${i + 1}.pdf`;
      const outputPath = path.join(outDir, filename);
      const buffer = Buffer.from(doc.output('arraybuffer'));
      fs.writeFileSync(outputPath, buffer);
      console.log(`✓ Template ${i + 1} "${labels[i]}" → ${outputPath}`);
    }
    console.log(`\nAll ${templates.length} CVs generated in ${outDir}`);
  }
}

main().catch(console.error);
