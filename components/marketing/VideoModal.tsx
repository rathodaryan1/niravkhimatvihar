'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  poster,
  title = 'Shri Nirav Khimat Bhavan — Palitana',
  subtitle = 'Official Dharamshala Video Walkthrough · 58 Seconds',
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Lock background body scrolling completely while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Pause video whenever modal closes
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6 overflow-hidden select-none"
          onClick={handleClose}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Top Close Button (Always visible & fixed high z-index) */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg group"
            aria-label="Close video"
          >
            <span className="text-xs uppercase tracking-wider font-medium text-white/80 group-hover:text-white hidden sm:inline">
              Close
            </span>
            <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Modal Content Box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1A120E] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C7A15A]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player Container */}
            <div className="relative w-full bg-black flex items-center justify-center overflow-hidden flex-1 max-h-[75vh]">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-auto max-h-[75vh] object-contain bg-black focus:outline-none"
              />
            </div>

            {/* Video Footer Info Bar */}
            <div className="px-5 py-4 bg-[#241A15] border-t border-[#C7A15A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#FFFDF8]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#C7A15A] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C7A15A]" />
                  <span>{subtitle}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#FFFDF8] tracking-tight">
                  {title}
                </h4>
              </div>

              <div className="text-[11px] text-[#F8F3E8]/60 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Taleti Road, Palitana</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
