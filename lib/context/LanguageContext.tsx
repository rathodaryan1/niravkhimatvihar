'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    brand_name: 'Shri Nirav Khimat Bhavan',
    brand_sub: 'Palitana · Jain Dharamshala',
    nav_home: 'Home',
    nav_about: 'About',
    nav_facilities: 'Facilities',
    nav_rooms: 'Rooms',
    nav_bhojnalay: 'Bhojanshala',
    nav_palitana: 'Palitana',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    nav_my_booking: 'My Booking',
    btn_online_booking: 'Book A Room',

    // Hero
    hero_title: 'A Quiet Place for Your Palitana Yatra.',
    hero_location: 'Taleti Road · Palitana · Gujarat',
    hero_desc: 'A peaceful stay for pilgrims visiting Palitana. Pure satvik Jain dining, serene air-conditioned accommodation, and dedicated yatri hospitality near sacred Mount Shatrunjaya.',

    // Search Widget
    search_checkin_out: 'Check-in & Check-out',
    search_arrival_time: 'Arrival time',
    search_members: 'Yatriks',
    search_night: 'night',
    search_nights: 'nights',
    search_yatriks: 'yatriks',
    search_yatrik: 'yatrik',
    search_check_rooms: 'Check Available Rooms',
    search_book_by_phone: 'Prefer to book by phone? Call',

    // About
    about_title: 'A Place to Pause.',
    about_desc: 'Shri Nirav Khimat Bhavan is situated on Taleti Road (Behind Sanchori Bhavan) in Palitana, providing clean air-conditioned rooms, elevator mobility, hot water facilities, and a pure satvik Bhojanshala.',
    about_trust_note: 'A dedicated pilgrimage property established for yatriks visiting the supreme sacred tirtha of Mount Shatrunjaya.',

    // Bhojanshala Section
    bhoj_title: 'Pure Satvik Bhojanshala',
    bhoj_subtitle: 'A meal is part of the journey.',
    bhoj_navkarshi: 'Navkarshi (Breakfast)',
    bhoj_navkarshi_time: '08:00 AM – 09:00 AM',
    bhoj_lunch: 'Lunch Satvik Thali',
    bhoj_lunch_time: '12:00 PM – 01:30 PM',
    bhoj_tea: 'Evening Herbal Tea',
    bhoj_tea_time: '04:00 PM – 04:30 PM',
    bhoj_chauvihar: 'Chauvihar (Dinner)',
    bhoj_chauvihar_time: '05:00 PM – Sunset (Panchang)',

    // Contact
    contact_title: 'Find Your Way to Palitana.',
    contact_subtitle: 'Have questions or need pilgrimage assistance? Reach out to our management.',
    contact_dharamshala: 'Dharamshala Address',
    contact_dharamshala_addr: 'B/H Sanchori Bhavan, Sarvaiya Nagar, Taleti Road, Palitana, Gujarat – 364270, India',
    contact_get_directions: 'Get Directions →',
    contact_trust_office: 'Trust Office',
    contact_trust_office_addr: 'Shree Nirav Khimat Bhavan Trust, Jamnagar & Palitana, Gujarat',
    contact_call: 'Phone Numbers',
    contact_email: 'Email',
    contact_whatsapp: 'WhatsApp Yatri Help',

    // Footer
    footer_rights: 'All rights reserved.',
    footer_tag: 'Shri Nirav Khimat Bhavan, Palitana',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms & Conditions',
    footer_refund: 'Refund & Cancellation',
    footer_admin: 'Admin Login',
  },
  gu: {
    // Brand & Header
    brand_name: 'શ્રી નીરવ ખીમત ભવન',
    brand_sub: 'પાલીતાણા · જૈન ધર્મશાળા',
    nav_home: 'મુખ્ય પૃષ્ઠ',
    nav_about: 'અમારા વિશે',
    nav_facilities: 'સુવિધાઓ',
    nav_rooms: 'રૂમ્સ',
    nav_bhojnalay: 'ભોજનાલય',
    nav_palitana: 'પાલીતાણા',
    nav_gallery: 'ગેલેરી',
    nav_contact: 'સંપર્ક',
    nav_my_booking: 'મારું બુકિંગ',
    btn_online_booking: 'રૂમ બુક કરો',

    // Hero
    hero_title: 'તમારી પાલીતાણા યાત્રા માટે શાંત અને પવિત્ર આવાસ.',
    hero_location: 'તળેટી રોડ · પાલીતાણા · ગુજરાત',
    hero_desc: 'શ્રી શત્રુંજય ગિરિરાજની યાત્રાએ પધારતા યાત્રિકો માટે શાંત, સ્વચ્છ અને સાત્વિક આવાસ અને શુદ્ધ ભોજનાલયની પવિત્ર સુવિધા.',

    // Search Widget
    search_checkin_out: 'ચેક-ઇન અને ચેક-આઉટ',
    search_arrival_time: 'આગમન સમય',
    search_members: 'યાત્રિકોની સંખ્યા',
    search_night: 'રાત',
    search_nights: 'રાત',
    search_yatriks: 'યાત્રિકો',
    search_yatrik: 'યાત્રિક',
    search_check_rooms: 'ઉપલબ્ધ રૂમ્સ તપાસો',
    search_book_by_phone: 'ફોન દ્વારા બુકિંગ કરવા માટે સંપર્ક કરો:',

    // About
    about_title: 'વિશ્રાંતિ અને પવિત્રતાનું સ્થાન.',
    about_desc: 'શ્રી નીરવ ખીમત ભવન તળેટી રોડ (સાંચોરી ભવન પાછળ) પાલીતાણા ખાતે સ્થિત છે જેમાં સ્વચ્છ એસી રૂમ્સ, લિફ્ટ, ૨૪ કલાક ગરમ પાણી અને શુદ્ધ સાત્વિક ભોજનાલય ઉપલબ્ધ છે.',
    about_trust_note: 'શ્રી શત્રુંજય મહાતીર્થની યાત્રાએ આવતા ભવ્ય જીવો માટે સમર્પિત પવિત્ર ધર્મશાળા.',

    // Bhojanshala Section
    bhoj_title: 'શુદ્ધ સાત્વિક ભોજનાલય',
    bhoj_subtitle: 'શાસ્ત્રોક્ત મર્યાદા અનુસાર શુદ્ધ જૈન ભોજન વ્યવસ્થા.',
    bhoj_navkarshi: 'નવકારશી',
    bhoj_navkarshi_time: 'સવારે ૦૮:૦૦ થી ૦૯:૦૦',
    bhoj_lunch: 'બપોરનું સાત્વિક ભોજન',
    bhoj_lunch_time: 'બપોરે ૧૨:૦૦ થી ૦૧:૩૦',
    bhoj_tea: 'સાંજની હર્બલ ચા',
    bhoj_tea_time: 'સાંજે ૦૪:૦૦ થી ૦૪:૩૦',
    bhoj_chauvihar: 'ચૌવિહાર',
    bhoj_chauvihar_time: 'સાંજે ૦૫:૦૦ થી સૂર્યાસ્ત (પંચાંગ મુજબ)',

    // Contact
    contact_title: 'પાલીતાણા તળેટી માર્ગદર્શન.',
    contact_subtitle: 'કોઈપણ પૂછપરછ કે સહાય માટે અમારો સંપર્ક કરો.',
    contact_dharamshala: 'ધર્મશાળા સરનામું',
    contact_dharamshala_addr: 'સાંચોરી ભવન પાછળ, સરવૈયા નગર, તળેટી રોડ, પાલીતાણા, ગુજરાત – ૩૬૪૨૭૦',
    contact_get_directions: 'દિશા-નિર્દેશ મેળવો →',
    contact_trust_office: 'ટ્રસ્ટ કાર્યાલય',
    contact_trust_office_addr: 'શ્રી નીરવ ખીમત ભવન ટ્રસ્ટ, જામનગર અને પાલીતાણા, ગુજરાત',
    contact_call: 'ફોન નંબર્સ',
    contact_email: 'ઇમેઇલ',
    contact_whatsapp: 'વોટ્સએપ યાત્રિક હેલ્પ',

    // Footer
    footer_rights: 'સર્વાધિકાર સુરક્ષિત.',
    footer_tag: 'શ્રી નીરવ ખીમત ભવન, પાલીતાણા',
    footer_privacy: 'ગોપનીયતા નીતિ',
    footer_terms: 'નિયમો અને શરતો',
    footer_refund: 'રીફંડ અને કેન્સલેશન',
    footer_admin: 'એડમિન લૉગિન',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('nkb_lang') as Language;
    if (saved === 'en' || saved === 'gu') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nkb_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
