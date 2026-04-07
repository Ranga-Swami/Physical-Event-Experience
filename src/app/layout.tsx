import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Venue Assistant | Event Experience',
  description: 'Real-time smart assistant for large-scale sporting venues to manage crowd flow, wait times, and navigation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link" style={{ 
          position: 'absolute', top: '-40px', left: '0', background: 'var(--accent-primary)', color: 'white', padding: '8px', zIndex: 100 
        }}>
          Skip to main content
        </a>
        <div className="app-container">
          <main id="main-content" className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
