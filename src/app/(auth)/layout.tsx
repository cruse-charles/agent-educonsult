import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - EduConsult',
  description: 'Sign in to EduConsult',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">EduConsult</h1>
          <p className="text-slate-400">Education Consulting Platform</p>
        </div>
        <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-8">
          {children}
        </div>
        <p className="text-center text-slate-500 text-sm mt-6">
          © 2024 EduConsult. All rights reserved.
        </p>
      </div>
    </div>
  );
}