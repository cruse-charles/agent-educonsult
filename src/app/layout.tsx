import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/globals.css';

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
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}