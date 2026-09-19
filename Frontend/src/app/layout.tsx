import '@/index.css';
import Providers from './providers';
import type { Metadata } from 'next';
import { 
  Plus_Jakarta_Sans, 
  Playfair_Display, 
  Cormorant_Garamond, 
  Cinzel, 
  Alex_Brush,
  Montserrat
} from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ASRA Wedding Canvas — Customized Wedding Gifts & Bridal Luxuries',
  description: 'Customized Wedding Gifts & Bridal Luxuries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

        {/* Google Fonts Preconnect for Material Symbols */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} ${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${alexBrush.variable} ${montserrat.variable} bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
