import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to EduConsult</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your educational consulting platform connecting students with schools and opportunities
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/sign-in"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}