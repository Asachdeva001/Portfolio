import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import dynamic from 'next/dynamic';
import Background3D from '../components/Background3D';

export const metadata = {
  title: 'Portfolio',
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
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </AppWrapper>
      </body>
    </html>
  );
}
