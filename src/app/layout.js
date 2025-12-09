import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Aashish Sachdeva - Full Stack Developer',
  description: 'Passionate full-stack developer creating elegant, high-performance digital solutions. Specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: 'Full Stack Developer, React, Next.js, Node.js, JavaScript, Web Development, Portfolio',
  author: 'Aashish Sachdeva',
  viewport: 'width=device-width, initial-scale=1',
};

// AppWrapper client component
const AppWrapper = dynamic(() => import('../components/AppWrapper'));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <Navbar />
          <main className="min-h-screen pt-16" style={{ background: 'transparent' }}>
            <div className="relative">
              {/* Content container */}
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </main>
          <Footer />
          <ScrollToTop />
        </AppWrapper>
      </body>
    </html>
  );
}
