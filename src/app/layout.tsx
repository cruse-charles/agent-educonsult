import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'EduConsult - Education Consulting Platform',
  description: 'Connect students with top educational institutions and consultants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}