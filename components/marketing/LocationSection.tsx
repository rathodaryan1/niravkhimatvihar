'use client';

import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export function LocationSection() {
  const propertyInfo = {
    address: 'B/H Sanchori Bhavan, Sarvaiya Nagar, Taleti Road, Palitana, Gujarat – 364270, India',
    primaryPhone: '02848 253050',
    secondaryPhone: '+91 93766 56100',
    whatsapp: '+91 93766 56100',
    email: 'contact@niravkhimatbhavan.org',
    mapsUrl: 'https://maps.google.com/?q=Nirav+Khimat+Bhavan+Taleti+Road+Palitana',
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#FFFDF8] text-[#241A15] border-t border-[#9B7049]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#9B7049]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Transit & Inquiries · સંપર્ક અને સરનામું</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.05]">
              FIND YOUR WAY <br />
              <span className="italic font-normal text-[#9B7049]">to Palitana.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#3A2418]/80 font-light leading-relaxed">
            Conveniently situated on Taleti Road behind Sanchori Bhavan, welcoming pilgrims arriving for sacred Shatrunjaya Yatra.
          </p>
        </div>

        {/* 2-Column Location & Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Physical Location & Directions (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F3E8] p-8 sm:p-10 rounded-3xl border border-[#9B7049]/25 space-y-8 shadow-sm">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9B7049] font-bold block">
                DHARAMSHALA LOCATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#241A15]">
                Shri Nirav Khimat Bhavan
              </h3>
              <p className="text-sm text-[#3A2418]/85 leading-relaxed font-light">
                {propertyInfo.address}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href={propertyInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3A2418] hover:bg-[#241A15] text-[#F8F3E8] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#C7A15A]" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <span className="text-xs text-[#9B7049] font-medium">
                Landmark: Behind Sanchori Bhavan
              </span>
            </div>

            {/* Transit Proximities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#9B7049]/20 text-xs">
              <div>
                <span className="text-[#9B7049] block font-medium">Shatrunjaya Taleti:</span>
                <span className="font-bold text-[#241A15]">~8 Min Walk / 500m</span>
              </div>
              <div>
                <span className="text-[#9B7049] block font-medium">Railway Station:</span>
                <span className="font-bold text-[#241A15]">~2.5 km</span>
              </div>
              <div>
                <span className="text-[#9B7049] block font-medium">Bus Station:</span>
                <span className="font-bold text-[#241A15]">~2.0 km</span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Helplines (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-[#9B7049]/25 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9B7049] font-bold block">
                DIRECT COMMUNICATION
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#241A15]">
                Management & Helpdesk
              </h3>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone */}
              <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#9B7049]/20 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9B7049] font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C7A15A]" />
                  Reception & Office Phones
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1 font-serif text-lg font-bold text-[#241A15]">
                  <a href={`tel:${propertyInfo.primaryPhone}`} className="hover:text-[#9B7049] transition-colors">
                    {propertyInfo.primaryPhone}
                  </a>
                  <span className="text-[#9B7049]/40 hidden sm:inline">/</span>
                  <a href={`tel:${propertyInfo.secondaryPhone}`} className="hover:text-[#9B7049] transition-colors">
                    {propertyInfo.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#1E7E34] font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  Official WhatsApp Yatri Help
                </span>
                <a
                  href={`https://wa.me/${propertyInfo.whatsapp.replace(/\D/g, '')}?text=Jai%20Jinendra,%20I%20would%20like%20to%20inquire%20about%20staying%20at%20Shri%20Nirav%20Khimat%20Bhavan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7E34] hover:underline"
                >
                  <span>Chat directly on WhatsApp →</span>
                </a>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#9B7049]/20 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9B7049] font-bold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C7A15A]" />
                  Official Email
                </span>
                <a href={`mailto:${propertyInfo.email}`} className="text-xs font-semibold text-[#241A15] hover:text-[#9B7049] block truncate pt-0.5">
                  {propertyInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
