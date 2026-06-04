import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { ThemeProvider } from '@/components/ThemeProvider';
import dynamic from 'next/dynamic';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Load client-only components dynamically to prevent SSR hydration errors
const AppWrapper = dynamic(() => import('../components/AppWrapper'));

export const metadata = {
  title: 'Aashish Sachdeva - Full Stack Developer',
  description: 'Passionate full-stack developer creating elegant, high-performance digital solutions. Specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: 'Full Stack Developer, React, Next.js, Node.js, JavaScript, Web Development, Portfolio',
  author: 'Aashish Sachdeva',
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="antialiased select-none">
        <ThemeProvider>
          <AppWrapper>
            <Navbar />
            <main className="min-h-screen pt-16 relative z-10">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
