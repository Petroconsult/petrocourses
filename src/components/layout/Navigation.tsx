'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/training', label: 'Overview' },
    { href: '/training/courses', label: 'All Courses' },
    { href: '/training/enroll', label: 'Enroll' },
  ];

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-4 border-b-2 transition ${
                pathname === item.href
                  ? 'border-orange-500 text-orange-600 font-semibold'
                  : 'border-transparent hover:border-gray-300 text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}