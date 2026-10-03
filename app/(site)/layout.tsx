import React from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { MobileStickyBookingBar } from '@/components/marketing/MobileStickyBookingBar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileStickyBookingBar />
    </div>
  );
}
