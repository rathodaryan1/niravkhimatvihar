'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Camera,
  CheckCircle2,
} from 'lucide-react';

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  category: 'real' | 'property' | 'rooms' | 'temples' | 'dining';
  title: string;
  subtitle: string;
  gujaratiSubtitle?: string;
  src: string;
  poster?: string;
  isReal?: boolean;
  aspect: 'hero' | 'portrait' | 'landscape' | 'square';
  colSpan: string; // Tailwind grid span
}

export const GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: 'g-entry-gate',
    type: 'image',
    category: 'property',
    title: 'Main Entrance Gate (મુખ્ય પ્રવેશદ્વાર)',
    subtitle: 'Shri Khimat Shwetambar Murtipujak Jain Sangh Sankul Palitana',
    gujaratiSubtitle: 'શ્રી ખીમત શ્વેતામ્બર મૂર્તિ પૂજક જૈન સંઘ સંકુલ · મુખ્ય પ્રવેશદ્વાર',
    src: '/images/gallery/IMG_1430.JPG',
    isReal: true,
    aspect: 'hero',
    colSpan: 'md:col-span-8',
  },
  {
    id: 'g-real-video',
    type: 'video',
    category: 'real',
    title: 'Dharamshala Campus & Rooms Walkthrough',
    subtitle: '58-Second Authentic Video Tour',
    gujaratiSubtitle: '૫૮ સેકન્ડ પરિસર વીડિયો દર્શન',
    src: '/images/gallery/niravkhimatvihar.mp4',
    poster: '/images/gallery/nirav.jpeg',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'g-front-view',
    type: 'image',
    category: 'property',
    title: 'Front View & Campus Courtyard (ભવન દર્શન)',
    subtitle: 'Full Exterior Facade with Carved Jharokhas & Paved Courtyard',
    gujaratiSubtitle: 'શ્રી નીરવ ખીમત ભવન · બાહ્ય ભવ્ય દર્શન અને પટાંગણ',
    src: '/images/gallery/IMG_1425.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-entrance-porch',
    type: 'image',
    category: 'property',
    title: 'Carved Sandstone Entrance Porch & Main Plaque',
    subtitle: 'Pillared Portico, Granite Steps & Donor Dedication',
    gujaratiSubtitle: 'ભવ્ય પ્રવેશ પોર્ટિકો, નકશીદાર સ્તંભ અને મુખ્ય તકતી',
    src: '/images/gallery/IMG_1428.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-booking-window',
    type: 'image',
    category: 'property',
    title: 'Booking Window & Office (કાર્યાલય)',
    subtitle: 'Official Registration Counter, Check-in Desk & Palitana Pilgrim Map',
    gujaratiSubtitle: 'કાર્યાલય · બુકિંગ બારી, રજીસ્ટ્રેશન કાઉન્ટર અને યાત્રા નકશો',
    src: '/images/gallery/IMG_1416.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-seating-area',
    type: 'image',
    category: 'property',
    title: 'Swagat Khand — Welcome Seating Area (સ્વાગતખંડ)',
    subtitle: 'Ground Floor Reception Lounge with Luxury Sofas & Star Inlay Floor',
    gujaratiSubtitle: 'સ્વાગતખંડ · ગ્રાઉન્ડ ફ્લોર સોફા બેઠક વ્યવસ્થા અને પ્રતીક્ષા હોલ',
    src: '/images/gallery/IMG_1415.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-balcony-seating',
    type: 'image',
    category: 'property',
    title: 'Balcony Seating Area — Shatrunjaya Darshan (શેત્રુંજય દર્શન પરિસર)',
    subtitle: 'Upper Floor Lounge with Panoramic Glass Doors Facing Mount Shatrunjaya',
    gujaratiSubtitle: 'શેત્રુંજય દર્શન પરિસર · બાલ્કની બેઠક હોલ અને પર્વત દર્શન',
    src: '/images/gallery/IMG_1408.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-8',
  },
  {
    id: 'g-lift',
    type: 'image',
    category: 'property',
    title: 'Passenger Lift / Elevator (લીફ્ટ)',
    subtitle: 'Modern Stainless Steel Elevator with Gujarati Plaque & Digital Floor Display',
    gujaratiSubtitle: 'યાત્રિકો માટે આધુનિક લીફ્ટ સુવિધા',
    src: '/images/gallery/IMG_1412.JPG',
    isReal: true,
    aspect: 'portrait',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'g-room-4bed',
    type: 'image',
    category: 'rooms',
    title: '4-Bed Family Room (૪-બેડ ફેમિલી રૂમ)',
    subtitle: 'Clean Bedding, Study Desk, Electric Kettle & Scenic Window',
    gujaratiSubtitle: '૪-બેડ વિશાળ ફેમિલી એ/સી રૂમ · સ્વચ્છ પથારી અને ડેસ્ક',
    src: '/images/gallery/IMG_1400.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-room-deluxe-ac',
    type: 'image',
    category: 'rooms',
    title: 'Deluxe Air-Conditioned Bedroom (એ/સી રૂમ)',
    subtitle: 'Split Electrolux A/C, Bedside Stands & Attached Seating Sofa',
    gujaratiSubtitle: 'ડીલક્સ વાતાનુકુલિત રૂમ · સ્પ્લિટ એ/સી અને સોફા સેટિંગ',
    src: '/images/gallery/IMG_1403.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-bathroom',
    type: 'image',
    category: 'rooms',
    title: 'Modern Attached Bathroom (સ્વચ્છ બાથરૂમ)',
    subtitle: 'Western Wall-Hung Commode, Grey Slate Tiles & 24h Hot Water Geyser',
    gujaratiSubtitle: 'વેસ્ટર્ન કમોડ અને ૨૪ કલાક ગરમ પાણી સાથે અટેચ્ડ બાથરૂમ',
    src: '/images/gallery/IMG_1407.JPG',
    isReal: true,
    aspect: 'portrait',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'g-room-suite-lounge',
    type: 'image',
    category: 'rooms',
    title: 'Executive Suite Living Lounge (સુઇટ લિવિંગ રૂમ)',
    subtitle: 'Plush Sofa Suite, Throw Pillows, Dining Table & Ample Natural Light',
    gujaratiSubtitle: 'એક્ઝિક્યુટિવ સુઇટ લિવિંગ રૂમ અને ડાઇનિંગ બેઠક',
    src: '/images/gallery/IMG_E1394.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-8',
  },
  {
    id: 'g-ukalelu-pani',
    type: 'image',
    category: 'property',
    title: 'Sacred Ukalelu Pani Pavilion (ઉકાળેલું પાણી મંડપ)',
    subtitle: 'Ornate Terracotta Carved Mandap in Foyer Providing Shastrokta Boiled Water',
    gujaratiSubtitle: 'ગ્રાઉન્ડ ફ્લોર ઉકાળેલું પાણી મંડપ · શાસ્ત્રોક્ત જળ વ્યવસ્થા',
    src: '/images/gallery/IMG_1414.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-bhojanshala',
    type: 'image',
    category: 'dining',
    title: 'Shastrokta Jain Bhojanshala (ભોજનશાળા)',
    subtitle: 'Spacious Dining Hall with Stainless Steel Seating for Navkarshi & Chouviyar',
    gujaratiSubtitle: 'વિશાળ જૈન ભોજનશાળા હોલ · નવકારશી અને ચોવિહાર વ્યવસ્થા',
    src: '/images/gallery/IMG_1417.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-kitchen',
    type: 'image',
    category: 'dining',
    title: 'Shuddha Jain Rasoi (શુદ્ધ જૈન રસોડું)',
    subtitle: 'Hygienic Kitchen with Bain-Marie Food Warmers & Heavy-Duty Stoves',
    gujaratiSubtitle: 'શુદ્ધ જૈન રસોડું · અત્યાધુનિક સ્ટેનલેસ સ્ટીલ સુવિધા',
    src: '/images/gallery/IMG_1419.JPG',
    isReal: true,
    aspect: 'landscape',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'g-atrium',
    type: 'image',
    category: 'property',
    title: 'Sky-Lit Multi-Floor Atrium & Corridors (સેન્ટ્રલ એટ્રીયમ)',
    subtitle: 'Stainless Steel Glass Balustrades with Daylight Pergola Skylight',
    gujaratiSubtitle: 'પ્રકાશિત સેન્ટ્રલ એટ્રીયમ અને ગ્લાસ રેલિંગ કોરિડોર',
    src: '/images/gallery/IMG_1411.JPG',
    isReal: true,
    aspect: 'portrait',
    colSpan: 'md:col-span-6',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Real Media (16)' },
  { key: 'property', label: 'Gate, Facade, Lift & Office' },
  { key: 'rooms', label: 'Rooms & Bathrooms' },
  { key: 'dining', label: 'Bhojanshala & Kitchen' },
];

export function GalleryEditorial() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isInlineVideoPlaying, setIsInlineVideoPlaying] = useState(false);
  const [isInlineVideoMuted, setIsInlineVideoMuted] = useState(true);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'real') return item.isReal === true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const toggleInlineVideo = () => {
    if (!inlineVideoRef.current) return;
    if (inlineVideoRef.current.paused) {
      inlineVideoRef.current.play();
      setIsInlineVideoPlaying(true);
    } else {
      inlineVideoRef.current.pause();
      setIsInlineVideoPlaying(false);
    }
  };

  const toggleInlineMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inlineVideoRef.current) return;
    inlineVideoRef.current.muted = !inlineVideoRef.current.muted;
    setIsInlineVideoMuted(inlineVideoRef.current.muted);
  };

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-[#FFFDF8] text-[#241A15] border-t border-[#9B7049]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#9B7049]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Visual Chronicle · તસવીરો અને વીડિયો</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.05]">
              GALLERY & VIDEO TOUR.
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#3A2418]/80 font-light leading-relaxed">
            Authentic exterior photography and video tour of Shri Nirav Khimat Bhavan Dharamshala, clean rooms, pure satvik Bhojanshala, and Palitana foothills.
          </p>
        </div>

        {/* Featured Real Campus Video Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#241A15] border border-[#C7A15A]/40 shadow-xl p-6 sm:p-10 text-[#FFFDF8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/50 text-[#C7A15A] text-[11px] font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-[#C7A15A]" />
                <span>Featured Video Walkthrough · 58s</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-tight text-[#FFFDF8]">
                Real Video Tour of <br />
                <span className="italic text-[#C7A15A]">Nirav Khimat Vihar</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#F8F3E8]/80 leading-relaxed font-light">
                Take an authentic 58-second walkthrough of our Palitana Dharamshala premises. Experience our heritage facade, well-maintained corridors, peaceful rooms, and welcoming pilgrimage sanctuary.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={toggleInlineVideo}
                  className="inline-flex items-center gap-2 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all shadow-goldGlow cursor-pointer active:scale-95"
                >
                  {isInlineVideoPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Video</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Video Tour (58s)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => openLightbox(1)} // Index 1 is the video
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#F8F3E8] border border-white/20 px-5 py-3 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C7A15A]" />
                  <span>Fullscreen Lightbox</span>
                </button>
              </div>
            </div>

            {/* Right Video Player */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-2xl overflow-hidden aspect-video bg-black/60 border border-[#C7A15A]/30 group cursor-pointer shadow-2xl"
                onClick={toggleInlineVideo}
              >
                <video
                  ref={inlineVideoRef}
                  src="/images/gallery/niravkhimatvihar.mp4"
                  poster="/images/gallery/nirav.jpeg"
                  playsInline
                  muted={isInlineVideoMuted}
                  loop
                  onPlay={() => setIsInlineVideoPlaying(true)}
                  onPause={() => setIsInlineVideoPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Ambient Play Overlay Button */}
                {!isInlineVideoPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C7A15A] text-[#241A15] flex items-center justify-center shadow-goldGlow hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Sound & Fullscreen controls badge in top right */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={toggleInlineMute}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm cursor-pointer"
                    aria-label={isInlineVideoMuted ? 'Unmute' : 'Mute'}
                  >
                    {isInlineVideoMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#C7A15A]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(1);
                    }}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm cursor-pointer"
                    aria-label="Expand to fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Bottom title pill */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
                  <div className="bg-[#241A15]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C7A15A]/40 text-[11px] text-[#FFFDF8]">
                    <span className="font-serif text-[#C7A15A] font-bold mr-2">LIVE TOUR</span>
                    <span>Shri Nirav Khimat Bhavan Dharamshala</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[#9B7049]/20 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#241A15] text-[#C7A15A] border border-[#C7A15A] shadow-sm font-semibold'
                  : 'bg-white text-[#3A2418]/80 hover:bg-[#F8F3E8] border border-[#9B7049]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`${item.colSpan} group relative rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all border border-[#9B7049]/20 ${
                  item.aspect === 'hero'
                    ? 'aspect-[16/10] sm:aspect-[16/9]'
                    : item.aspect === 'portrait'
                    ? 'aspect-[3/4] sm:aspect-[4/3] md:aspect-auto'
                    : 'aspect-[4/3]'
                }`}
              >
                {/* Media representation */}
                {item.type === 'video' ? (
                  <div className="absolute inset-0 bg-black">
                    <img
                      src={item.poster || item.src}
                      alt={item.title}
                      className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#C7A15A]/90 text-[#241A15] flex items-center justify-center shadow-goldGlow group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                  />
                )}

                {/* Dark Gradient Overlay for Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/95 via-[#241A15]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge (Real Photo / Video indicator) */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  {item.isReal && (
                    <div className="bg-[#241A15]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#C7A15A]/60 flex items-center gap-1.5 shadow-sm">
                      {item.type === 'video' ? (
                        <Film className="w-3 h-3 text-[#C7A15A]" />
                      ) : (
                        <Camera className="w-3 h-3 text-[#C7A15A]" />
                      )}
                      <span className="text-[10px] uppercase tracking-widest text-[#FFFDF8] font-serif font-bold">
                        {item.type === 'video' ? 'Real Video Tour' : 'Real Photo'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Story Content */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                  <div className="space-y-1 max-w-[85%]">
                    {item.gujaratiSubtitle && (
                      <span className="text-[11px] text-[#C7A15A] font-serif font-medium block">
                        {item.gujaratiSubtitle}
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-[#F8F3E8]/80 font-bold block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#FFFDF8] leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {item.type === 'video' ? (
                      <Play className="w-4 h-4 text-[#C7A15A] fill-current" />
                    ) : (
                      <ZoomIn className="w-4 h-4 text-[#C7A15A]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal (Supports Image & Video) */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-xl select-none"
            onClick={closeLightbox}
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg group"
              aria-label="Close lightbox"
            >
              <span className="text-xs uppercase tracking-wider font-medium text-white/80 group-hover:text-white hidden sm:inline">
                Close
              </span>
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-30 cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Media Viewer Area */}
            <div
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[lightboxIndex].type === 'video' ? (
                <div className="w-full max-h-[75vh] flex justify-center bg-black rounded-2xl overflow-hidden border border-[#C7A15A]/40 shadow-2xl">
                  <video
                    src={filteredItems[lightboxIndex].src}
                    poster={filteredItems[lightboxIndex].poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                  />
                </div>
              ) : (
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
                />
              )}

              {/* Lightbox Caption */}
              <div className="pt-4 text-center max-w-2xl px-4 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  {filteredItems[lightboxIndex].isReal && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[10px] uppercase font-bold text-[#C7A15A] tracking-wider">
                      Real Asset
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-widest text-[#C7A15A] font-bold">
                    {filteredItems[lightboxIndex].subtitle}
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-light">
                  {filteredItems[lightboxIndex].title}
                </h4>
                {filteredItems[lightboxIndex].gujaratiSubtitle && (
                  <p className="text-xs text-[#F8F3E8]/70 font-serif">
                    {filteredItems[lightboxIndex].gujaratiSubtitle}
                  </p>
                )}
                <div className="text-[11px] text-white/50 pt-1">
                  {lightboxIndex + 1} of {filteredItems.length}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-30 cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
