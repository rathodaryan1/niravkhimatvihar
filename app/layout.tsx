import type { Metadata } from 'next';
import { Inter, Hind_Vadodara, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindVadodara = Hind_Vadodara({
  subsets: ['gujarati', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-vadodara',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nirav Khimat Bhavan | Jain Dharamshala in Palitana',
  description:
    'Stay at Nirav Khimat Bhavan in Palitana with comfortable accommodation and facilities for your Palitana pilgrimage.',
  keywords: [
    'Palitana Dharamshala',
    'Jain Dharamshala Palitana',
    'Nirav Khimat Bhavan Palitana',
    'Nirav Khimat Bhavan',
    'Jain Yatrik Bhavan Palitana',
    'Palitana accommodation',
    'Shatrunjaya Yatra room booking',
    'Jain Bhojanshala Palitana',
  ],
  openGraph: {
    title: 'Nirav Khimat Bhavan | Jain Dharamshala in Palitana',
    description:
      'Stay at Nirav Khimat Bhavan in Palitana with comfortable accommodation and facilities for your Palitana pilgrimage.',
    url: 'https://niravkhimatbhavan.org',
    siteName: 'Shri Nirav Khimat Bhavan',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hindVadodara.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-[#FFFDF9] text-ink antialiased selection:bg-terracotta selection:text-white"
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

