import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import dynamic from 'next/dynamic';
import Background3D from '../components/Background3D';

export const metadata = {
  title: 'Aashish Sachdeva',
  description: 'My professional portfolio showcasing my skills and projects',
};

// AppWrapper client component
const AppWrapper = dynamic(() => import('../components/AppWrapper'));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background3D />
        <AppWrapper>
          <Navbar />
          <main className="min-h-screen pt-16 sm:backdrop-blur-2xl sm:from-gray-900 sm:to-gray-950">
            <div className="relative">
              {/* Background overlay for small devices - only for main content */}
              <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-transparent sm:hidden z-0" style={{ height: 'calc(100vh - 4rem)' }} />
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
