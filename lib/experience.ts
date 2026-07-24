/** Career start — July 2020. Used for dynamic “years of experience” across SEO + UI. */
export const CAREER_START = new Date(2020, 6, 1);

/** Whole years completed since July 2020 (floors partial years). */
export function getYearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  const monthDiff = now.getMonth() - CAREER_START.getMonth();
  const dayDiff = now.getDate() - CAREER_START.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }
  return Math.max(years, 0);
}

/** Display label e.g. `6+` */
export function getYearsOfExperienceLabel(now: Date = new Date()): string {
  return `${getYearsOfExperience(now)}+`;
}
