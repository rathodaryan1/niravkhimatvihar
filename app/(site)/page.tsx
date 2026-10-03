import React from 'react';
import { dbStore } from '@/lib/db/store';

// Premium Jain Pilgrimage Editorial Components
import { Hero } from '@/components/marketing/Hero';
import { SearchWidget } from '@/components/marketing/SearchWidget';
import { IntroductionSection } from '@/components/marketing/IntroductionSection';
import { PalitanaExperienceSection } from '@/components/marketing/PalitanaExperienceSection';
import { RoomsShowcase } from '@/components/marketing/RoomsShowcase';
import { FacilitiesNumberedList } from '@/components/marketing/FacilitiesNumberedList';
import { BhojanshalaEditorial } from '@/components/marketing/BhojanshalaEditorial';
import { GalleryEditorial } from '@/components/marketing/GalleryEditorial';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { LocationSection } from '@/components/marketing/LocationSection';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export const revalidate = 60; // Revalidate every 60s for live room rate sync

export default async function HomePage() {
  const roomTypes = await dbStore.getRoomTypes();

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#FFFDF8]">
      {/* 00. Cinematic Full-Viewport Hero (100svh, typography reveal, scroll indicator) */}
      <Hero />

      {/* 01. Integrated Real-Time Availability & Booking Search */}
      <div id="search-section">
        <SearchWidget />
      </div>

      {/* 02. The Vihar: Asymmetrical Editorial Narrative ("A PLACE TO PAUSE") */}
      <IntroductionSection />

      {/* 03. Palitana Yatra: Sacred Shatrunjaya Pilgrimage ("WHERE THE JOURNEY BEGINS") */}
      <PalitanaExperienceSection />

      {/* 04. Rooms: Editorial Room Showcase with Dynamic DB Rates ("ROOMS FOR YOUR JOURNEY") */}
      <RoomsShowcase rooms={roomTypes} />

      {/* 05. Facilities: Interactive Typographic List with Hover Visual Preview (01-07) */}
      <FacilitiesNumberedList />

      {/* 06. Bhojanshala: Pure Satvik Jain Dining ("A MEAL IS PART OF THE JOURNEY") */}
      <BhojanshalaEditorial />

      {/* 07. Gallery: Irregular Masonry Editorial Chronicle with Lightbox Modal */}
      <GalleryEditorial />

      {/* 08. Testimonials: Minimalist Pilgrim Reflections Carousel */}
      <TestimonialsSection />

      {/* 09. Location & Transit: Taleti Road Positioning & Direct Helplines */}
      <LocationSection />

      {/* 10. Final Call to Action: Cinematic Climax ("YOUR JOURNEY BEGINS HERE") */}
      <CinematicCTA />
    </div>
  );
}
