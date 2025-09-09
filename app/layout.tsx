import { auth } from '@/lib/auth';
import { BookMarkedIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from '../components/theme-provider';
import './globals.css';
import Nav from './nav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Book & Mark',
  description: 'Social Bookmark',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
          <div className='container flex flex-col justify-between h-screen mx-auto'>
            <header className='flex justify-between border-b-2'>
              <Link
                href='/'
                className='flex items-center text-3xl font-semibold tracking-tight text-green-500'
              >
                <BookMarkedIcon size={28} /> Bookmark
              </Link>

              <Nav />
            </header>
            <main className='flex-1'>{children}</main>
            <footer className='text-center text-green-500'>
              &#169; Beadskode 2025 all rights reserved.
            </footer>
          </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
