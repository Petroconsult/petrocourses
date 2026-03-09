export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/training', label: 'Training' },
  { href: '/training/courses', label: 'Courses' },
  { href: '/advisory', label: 'Advisory' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'About' },
];