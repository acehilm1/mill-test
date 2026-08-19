import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Millwright Vision Pro — Spatial computing, beautifully.',
  description:
    'Millwright Vision Pro is a premium VR headset blending cinematic displays, eye-tracking, and an aluminum chassis. Discover the next era of spatial computing.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Millwright Vision Pro',
    description:
      'Premium VR headset blending cinematic displays, eye-tracking, and an aluminum chassis.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 text-ink-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}