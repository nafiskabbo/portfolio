export interface ProjectCategoryOption {
  value: string;
  label: string;
}

export const projectCategoryOptions: ProjectCategoryOption[] = [
  { value: '', label: 'Select project type' },
  { value: 'Mobile App - Flutter', label: 'Mobile App - Flutter' },
  { value: 'Mobile App - Android', label: 'Mobile App - Android' },
  { value: 'Mobile App - iOS', label: 'Mobile App - iOS' },
  { value: 'Web Application', label: 'Web Application' },
  { value: 'AI / ML Integration', label: 'AI / ML Integration' },
  { value: 'Other', label: 'Other' },
];
