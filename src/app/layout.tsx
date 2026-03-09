import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { validateEnvironment, getIntegrationStatus } from '@/lib/integration-setup';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Petrocourses',
  description: 'Leading provider of petroleum and gas training and consulting services',
};

// Validate environment on server startup
validateEnvironment();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log integration status in development
  if (process.env.NODE_ENV === 'development') {
    const status = getIntegrationStatus();
    console.log('📊 Integration Status:', status);
  }

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased bg-gray-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}