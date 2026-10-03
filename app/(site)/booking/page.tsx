'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { BookingDateSelector } from '@/components/booking/BookingDateSelector';
import { BookingSummaryCard } from '@/components/booking/BookingSummaryCard';
import { RoomLightboxModal } from '@/components/booking/RoomLightboxModal';
import { RoomType } from '@/lib/types';
import {
  Calendar,
  Users,
  DoorOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  CreditCard,
  Printer,
  Phone,
  AlertCircle,
  Loader2,
  Sparkles,
  Copy,
  Eye,
  Snowflake,
  Bath,
  Flame,
  Droplets,
  Building2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

// Fallback room types with authentic photography
const FALLBACK_ROOM_TYPES: any[] = [
  {
    room_type: {
      id: 'b0000000-0000-0000-0000-000000000001',
      name: '2-Bed Standard A/C Room',
      slug: '2-bed-standard-ac',
      capacity: 2,
      base_price: 1200,
      description: 'Air-conditioned room with 2 single beds, private bathroom, and hot water facility.',
      bed_type: '2 Single Beds',
      images: [{ storage_path: '/images/rooms/room-standard-1.jpg' }],
    },
    available_count: 8,
    nightly_rate: 1200,
  },
  {
    room_type: {
      id: 'b0000000-0000-0000-0000-000000000002',
      name: '3-Bed Executive A/C Room',
      slug: '3-bed-executive-ac',
      capacity: 3,
      base_price: 1600,
      description: 'Spacious room with 1 double bed + 1 single bed, attached modern bath.',
      bed_type: '1 Double + 1 Single Bed',
      images: [{ storage_path: '/images/rooms/room-executive-1.jpg' }],
    },
    available_count: 5,
    nightly_rate: 1600,
  },
  {
    room_type: {
      id: 'b0000000-0000-0000-0000-000000000003',
      name: '4-Bed Family A/C Room',
      slug: '4-bed-family-ac',
      capacity: 4,
      base_price: 2000,
      description: 'Ideal for pilgrim families with 4 single beds and spacious seating area.',
      bed_type: '4 Single Beds',
      images: [{ storage_path: '/images/rooms/room-family-1.jpg' }],
    },
    available_count: 4,
    nightly_rate: 2000,
  },
  {
    room_type: {
      id: 'b0000000-0000-0000-0000-000000000004',
      name: '6-Bed Yatri Suite A/C',
      slug: '6-bed-yatri-suite',
      capacity: 6,
      base_price: 2800,
      description: 'Large suite for pilgrim groups and family sanghas with multiple beds.',
      bed_type: '6 Single Beds',
      images: [{ storage_path: '/images/rooms/room-suite-1.jpg' }],
    },
    available_count: 3,
    nightly_rate: 2800,
  },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const formatDate = (d: Date) => {
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Step state
  const [step, setStep] = useState<number>(1);

  // Step 1: Dates & Search
  const [checkIn, setCheckIn] = useState<string>(searchParams.get('checkIn') || formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(searchParams.get('checkOut') || formatDate(tomorrow));
  const [guests, setGuests] = useState<number>(parseInt(searchParams.get('guests') || '2', 10));
  const [rooms, setRooms] = useState<number>(parseInt(searchParams.get('rooms') || '1', 10));

  // Step 2: Available Rooms
  const [loadingRooms, setLoadingRooms] = useState<boolean>(false);
  const [availableOptions, setAvailableOptions] = useState<any[]>(FALLBACK_ROOM_TYPES);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>(searchParams.get('roomTypeId') || '');
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | any | null>(null);

  // Lightbox modal state
  const [lightboxRoom, setLightboxRoom] = useState<any | null>(null);

  // Step 3: Guest Information
  const [guestDetails, setGuestDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    specialRequests: '',
  });
  const [guestErrors, setGuestErrors] = useState<Record<string, string>>({});

  // Step 4: Terms & Review
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  // Step 5: Payment & Hold State
  const [holdBookingId, setHoldBookingId] = useState<string | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<string | null>(null);
  const [publicBookingId, setPublicBookingId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 6: Confirmation State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [copiedBookingId, setCopiedBookingId] = useState<boolean>(false);

  // Fetch available rooms from server API
  useEffect(() => {
    async function fetchAvailability() {
      setLoadingRooms(true);
      setErrorMessage(null);
      try {
        const query = new URLSearchParams({
          checkIn,
          checkOut,
          guests: guests.toString(),
          rooms: rooms.toString(),
        });
        const res = await fetch(`/api/availability?${query.toString()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setAvailableOptions(json.data);
          } else {
            setAvailableOptions(FALLBACK_ROOM_TYPES);
          }
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
        setAvailableOptions(FALLBACK_ROOM_TYPES);
      } finally {
        setLoadingRooms(false);
      }
    }

    if (checkIn && checkOut) {
      fetchAvailability();
    }
  }, [checkIn, checkOut, guests, rooms]);

  // Sync selected room type object
  useEffect(() => {
    if (selectedRoomTypeId && availableOptions.length > 0) {
      const match = availableOptions.find(
        (opt) => opt.room_type.id === selectedRoomTypeId || opt.room_type.slug === selectedRoomTypeId
      );
      if (match) {
        setSelectedRoomType(match.room_type);
      }
    } else if (!selectedRoomTypeId && availableOptions.length > 0) {
      // Default to first option
      setSelectedRoomType(availableOptions[0].room_type);
      setSelectedRoomTypeId(availableOptions[0].room_type.id);
    }
  }, [selectedRoomTypeId, availableOptions]);

  // Calculate pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const roomPricePerNight = selectedRoomType ? selectedRoomType.base_price : 1200;
  const subtotal = roomPricePerNight * nights * rooms;
  const serviceCharge = 0;
  const tax = 0;
  const total = subtotal + serviceCharge + tax;

  // Validate Guest Details (Step 3)
  const validateGuestDetails = () => {
    const errors: Record<string, string> = {};
    if (!guestDetails.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!guestDetails.phone.trim() || guestDetails.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!guestDetails.email.trim() || !guestDetails.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!guestDetails.city.trim()) errors.city = 'Please enter your city';
    if (!guestDetails.state.trim()) errors.state = 'Please enter your state';
    if (!guestDetails.pincode.trim() || guestDetails.pincode.length < 6) {
      errors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setGuestErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step Navigation Handlers
  const handleProceedFromDates = () => {
    setStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectRoomAndProceed = (roomTypeId: string) => {
    setSelectedRoomTypeId(roomTypeId);
    setStep(3);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGuestDetails()) {
      setStep(4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Hold room & proceed to Payment (Step 4 -> 5)
  const handleProceedToPayment = async () => {
    if (!termsAgreed) {
      setTermsError('Please agree to the booking terms and stay guidelines to continue.');
      return;
    }
    setTermsError(null);
    setIsProcessingPayment(true);
    setErrorMessage(null);
    setPaymentFailed(false);

    try {
      const payload = {
        roomTypeId: selectedRoomType?.id || 'b0000000-0000-0000-0000-000000000001',
        checkIn,
        checkOut,
        guestCount: guests,
        roomCount: rooms,
        customer: guestDetails,
        specialRequests: guestDetails.specialRequests,
      };

      const res = await fetch('/api/bookings/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Unable to hold room. Please try again.');
      }

      setHoldBookingId(json.data.bookingId);
      setHoldExpiresAt(json.data.holdExpiresAt);
      setPublicBookingId(json.data.publicBookingId);

      setStep(5);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error creating booking hold');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Execute Payment Verification
  const executePaymentConfirmation = async (paymentId: string, orderId: string, signature: string) => {
    setIsProcessingPayment(true);
    setErrorMessage(null);
    setPaymentFailed(false);

    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: holdBookingId,
          publicBookingId,
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Payment verification failed');
      }

      setConfirmedBooking(json.data);
      setStep(6);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err: any) {
      setPaymentFailed(true);
      setErrorMessage(err.message || 'Payment processing was not completed.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const copyBookingIdToClipboard = () => {
    if (confirmedBooking?.publicBookingId || publicBookingId) {
      const id = confirmedBooking?.publicBookingId || publicBookingId;
      navigator.clipboard.writeText(id);
      setCopiedBookingId(true);
      setTimeout(() => setCopiedBookingId(false), 2500);
    }
  };

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Compact Editorial Header (#4) */}
        <div className="border-b border-[#D8C4A8]/60 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A95339] font-bold block">
              SHRI NIRAV KHIMAT BHAVAN · PALITANA, GUJARAT
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2B1D17] font-light tracking-tight leading-tight">
              BOOK YOUR STAY
            </h1>
            <p className="text-xs sm:text-sm text-[#2B1D17]/70 font-light max-w-xl">
              Find a peaceful room for your Palitana journey.
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-[#2B1D17]/60">
            <span>Yatri Helpdesk:</span>
            <a
              href="tel:02848253050"
              className="font-serif text-sm font-semibold text-[#2B1D17] hover:text-[#A95339] block mt-0.5"
            >
              02848 253050 · +91 93766 56100
            </a>
          </div>
        </div>

        {/* Progress Stepper (#3) */}
        <BookingStepper currentStep={step} onStepClick={(s) => s < step && setStep(s)} />

        {/* Main Booking Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Content Column (col-span-8) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: DATES & GUESTS */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold block">
                      STEP 01 OF 06
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                      Select Stay Dates & Party
                    </h2>
                    <p className="text-xs text-[#2B1D17]/70 font-light">
                      Choose your arrival and departure schedule for sacred Shatrunjaya pilgrimage.
                    </p>
                  </div>

                  {/* Custom Calendar Popover Selector (#5) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                      Pilgrimage Dates
                    </label>
                    <BookingDateSelector
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onDatesChange={(ci, co) => {
                        setCheckIn(ci);
                        setCheckOut(co);
                      }}
                    />
                  </div>

                  {/* Yatris & Rooms Steppers (#6) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Yatris Stepper */}
                    <div className="bg-[#F7F3EA] border border-[#D8C4A8]/40 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#A95339] font-bold">
                          HOW MANY YATRIS?
                        </span>
                        <Users className="w-4 h-4 text-[#A95339]" />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-12 h-12 rounded-full bg-[#FCFAF5] border border-[#D8C4A8] text-xl font-medium text-[#2B1D17] hover:bg-[#A95339] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                          aria-label="Decrease guests"
                        >
                          −
                        </button>
                        <span className="font-serif text-3xl font-light text-[#2B1D17] w-12 text-center">
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests(Math.min(12, guests + 1))}
                          className="w-12 h-12 rounded-full bg-[#FCFAF5] border border-[#D8C4A8] text-xl font-medium text-[#2B1D17] hover:bg-[#A95339] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                          aria-label="Increase guests"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[11px] text-[#2B1D17]/50 block text-center">
                        Total pilgrims in your party
                      </span>
                    </div>

                    {/* Rooms Stepper */}
                    <div className="bg-[#F7F3EA] border border-[#D8C4A8]/40 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#A95339] font-bold">
                          HOW MANY ROOMS?
                        </span>
                        <DoorOpen className="w-4 h-4 text-[#A95339]" />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-12 h-12 rounded-full bg-[#FCFAF5] border border-[#D8C4A8] text-xl font-medium text-[#2B1D17] hover:bg-[#A95339] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                          aria-label="Decrease rooms"
                        >
                          −
                        </button>
                        <span className="font-serif text-3xl font-light text-[#2B1D17] w-12 text-center">
                          {rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setRooms(Math.min(6, rooms + 1))}
                          className="w-12 h-12 rounded-full bg-[#FCFAF5] border border-[#D8C4A8] text-xl font-medium text-[#2B1D17] hover:bg-[#A95339] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                          aria-label="Increase rooms"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[11px] text-[#2B1D17]/50 block text-center">
                        Rooms to reserve
                      </span>
                    </div>
                  </div>

                  {/* Search CTA Button (#7) */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleProceedFromDates}
                      className="group w-full flex items-center justify-center gap-3 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-all duration-300 active:scale-95"
                    >
                      <span>FIND AVAILABLE ROOMS</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CHOOSE ROOM */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold block">
                        STEP 02 OF 06
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                        Choose Your Room
                      </h2>
                      <p className="text-xs text-[#2B1D17]/70 font-light mt-0.5">
                        {nights} {nights === 1 ? 'Night' : 'Nights'} • {guests} Yatrik • {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-[#A95339] hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Change Dates / Party</span>
                    </button>
                  </div>

                  {/* Room Cards List (#8, #9, #10, #11, #12) */}
                  <div className="space-y-6">
                    {availableOptions.map((option) => {
                      const room = option.room_type;
                      const isSelected = selectedRoomTypeId === room.id || selectedRoomTypeId === room.slug;
                      const availableCount = option.available_count ?? 4;
                      const isSoldOut = availableCount === 0;

                      const roomImage =
                        room.images?.[0]?.storage_path ||
                        (room.slug?.includes('standard')
                          ? '/images/rooms/room-standard-1.jpg'
                          : room.slug?.includes('executive')
                          ? '/images/rooms/room-executive-1.jpg'
                          : room.slug?.includes('family')
                          ? '/images/rooms/room-family-1.jpg'
                          : '/images/rooms/room-suite-1.jpg');

                      return (
                        <div
                          key={room.id}
                          className={`bg-[#FCFAF5] rounded-3xl border overflow-hidden transition-all duration-300 shadow-sm ${
                            isSelected
                              ? 'border-[#A95339] ring-2 ring-[#A95339]/20 shadow-md'
                              : 'border-[#D8C4A8] hover:border-[#A95339]/50'
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                            
                            {/* Room Image (~45% width on desktop) */}
                            <div
                              className="md:col-span-5 relative min-h-[220px] md:min-h-[280px] bg-[#1F1511] cursor-pointer group overflow-hidden"
                              onClick={() => setLightboxRoom(room)}
                            >
                              <Image
                                src={roomImage}
                                alt={room.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-95"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                              {/* Hover Gallery Indicator */}
                              <div className="absolute bottom-3 left-3 bg-[#1F1511]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-3.5 h-3.5 text-[#B89455]" />
                                <span>View Photos</span>
                              </div>

                              {/* Selected Ribbon */}
                              {isSelected && (
                                <div className="absolute top-3 left-3 bg-[#A95339] text-white text-[11px] font-serif font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                  ✓ Selected
                                </div>
                              )}
                            </div>

                            {/* Room Information (~55% width on desktop) */}
                            <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold">
                                    UP TO {room.capacity} YATRIK
                                  </span>

                                  {/* Availability Dot (#10) */}
                                  <span
                                    className={`text-[11px] font-medium flex items-center gap-1.5 ${
                                      isSoldOut
                                        ? 'text-red-600'
                                        : availableCount <= 2
                                        ? 'text-amber-700'
                                        : 'text-emerald-700'
                                    }`}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isSoldOut
                                          ? 'bg-red-500'
                                          : availableCount <= 2
                                          ? 'bg-amber-500 animate-pulse'
                                          : 'bg-emerald-500'
                                      }`}
                                    />
                                    {isSoldOut ? 'Sold Out' : `● ${availableCount} rooms available`}
                                  </span>
                                </div>

                                <h3 className="font-serif text-2xl font-light text-[#2B1D17]">
                                  {room.name}
                                </h3>

                                <p className="text-xs text-[#2B1D17]/70 font-light line-clamp-2">
                                  {room.description}
                                </p>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#2B1D17]/75">
                                  <span className="bg-[#F7F3EA] px-2.5 py-1 rounded-lg border border-[#D8C4A8]/30">
                                    {room.bed_type}
                                  </span>
                                  <span className="bg-[#F7F3EA] px-2.5 py-1 rounded-lg border border-[#D8C4A8]/30">
                                    Split A/C
                                  </span>
                                  <span className="bg-[#F7F3EA] px-2.5 py-1 rounded-lg border border-[#D8C4A8]/30">
                                    24h Hot Water
                                  </span>
                                </div>
                              </div>

                              {/* Price and Selection Row */}
                              <div className="pt-4 border-t border-[#D8C4A8]/40 flex items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                                      ₹{room.base_price?.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-xs text-[#2B1D17]/60 font-sans">/ night</span>
                                  </div>
                                  <span className="text-[10px] text-[#2B1D17]/50 block">
                                    {rooms} room · {nights} night
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  disabled={isSoldOut}
                                  onClick={() => handleSelectRoomAndProceed(room.id)}
                                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                                    isSelected
                                      ? 'bg-[#A95339] text-white hover:bg-[#2B1D17]'
                                      : 'bg-[#2B1D17] text-[#FFFDF8] hover:bg-[#A95339]'
                                  }`}
                                >
                                  <span>{isSelected ? 'SELECTED → CONTINUE' : 'SELECT ROOM →'}</span>
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: GUEST DETAILS (#14, #15) */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold block">
                      STEP 03 OF 06
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                      Your Details
                    </h2>
                    <p className="text-xs text-[#2B1D17]/70 font-light">
                      Tell us who is staying for official Dharamshala check-in and reservation confirmation.
                    </p>
                  </div>

                  <form onSubmit={handleProceedToReview} className="space-y-6">
                    {/* Primary Yatrik Group */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-base font-medium text-[#2B1D17] pb-1 border-b border-[#D8C4A8]/40">
                        PRIMARY YATRIK
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rameshchandra Shah"
                            value={guestDetails.fullName}
                            onChange={(e) => setGuestDetails({ ...guestDetails, fullName: e.target.value })}
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.fullName && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.fullName}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={guestDetails.phone}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                phone: e.target.value.replace(/\D/g, ''),
                              })
                            }
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.phone && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.phone}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={guestDetails.email}
                            onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.email && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.email}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Group */}
                    <div className="space-y-4 pt-2">
                      <h3 className="font-serif text-base font-medium text-[#2B1D17] pb-1 border-b border-[#D8C4A8]/40">
                        RESIDENTIAL ADDRESS
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            City / Town *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mumbai / Ahmedabad"
                            value={guestDetails.city}
                            onChange={(e) => setGuestDetails({ ...guestDetails, city: e.target.value })}
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.city && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.city}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Gujarat / Maharashtra"
                            value={guestDetails.state}
                            onChange={(e) => setGuestDetails({ ...guestDetails, state: e.target.value })}
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.state && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.state}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="6-digit PIN code"
                            value={guestDetails.pincode}
                            onChange={(e) =>
                              setGuestDetails({
                                ...guestDetails,
                                pincode: e.target.value.replace(/\D/g, ''),
                              })
                            }
                            className="w-full h-13 px-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] font-medium focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                          />
                          {guestErrors.pincode && (
                            <span className="text-[11px] text-red-600 block">{guestErrors.pincode}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Optional Notes */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-serif font-medium text-[#2B1D17] uppercase tracking-wider">
                        Special Requests / Remarks (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Ground floor preference for senior citizen, late arrival after 8:00 PM"
                        value={guestDetails.specialRequests}
                        onChange={(e) =>
                          setGuestDetails({ ...guestDetails, specialRequests: e.target.value })
                        }
                        className="w-full p-4 rounded-xl border border-[#D8C4A8] bg-[#FCFAF5] text-sm text-[#2B1D17] focus:outline-none focus:border-[#A95339] focus:ring-1 focus:ring-[#A95339]"
                      />
                    </div>

                    {/* Navigation Actions */}
                    <div className="pt-4 border-t border-[#D8C4A8]/40 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 text-xs font-serif font-semibold text-[#2B1D17] hover:text-[#A95339] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Rooms</span>
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-full shadow-md transition-all active:scale-95"
                      >
                        <span>CONTINUE TO REVIEW →</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: REVIEW & TERMS (#16, #17) */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold block">
                      STEP 04 OF 06
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                      Review Your Stay
                    </h2>
                    <p className="text-xs text-[#2B1D17]/70 font-light">
                      Please verify your reservation details before proceeding to payment.
                    </p>
                  </div>

                  {/* Editorial Structured Summary with Dividers */}
                  <div className="space-y-6 text-xs text-[#2B1D17]/85">
                    
                    {/* Dates Section */}
                    <div className="space-y-2 pb-4 border-b border-[#D8C4A8]/40">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A95339] font-bold block">
                        YOUR DATES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <strong className="font-serif text-[#2B1D17] block">Check-In:</strong>
                          <span>{checkIn} (10:00 AM)</span>
                        </div>
                        <div>
                          <strong className="font-serif text-[#2B1D17] block">Check-Out:</strong>
                          <span>{checkOut} (09:00 AM)</span>
                        </div>
                      </div>
                    </div>

                    {/* Room Section */}
                    <div className="space-y-2 pb-4 border-b border-[#D8C4A8]/40">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A95339] font-bold block">
                        YOUR ROOM
                      </span>
                      <div className="text-sm font-serif font-medium text-[#2B1D17]">
                        {selectedRoomType?.name} ({rooms} {rooms === 1 ? 'Room' : 'Rooms'})
                      </div>
                      <span className="text-xs text-[#2B1D17]/60 block">
                        {guests} Yatrik • {selectedRoomType?.bed_type} • Split Air Conditioning
                      </span>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-2 pb-4 border-b border-[#D8C4A8]/40">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A95339] font-bold block">
                        PRIMARY YATRIK
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-[#2B1D17]/50 block">Name:</span>
                          <span className="font-medium text-[#2B1D17]">{guestDetails.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[#2B1D17]/50 block">Mobile:</span>
                          <span className="font-medium text-[#2B1D17]">{guestDetails.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#2B1D17]/50 block">Email:</span>
                          <span className="font-medium text-[#2B1D17] truncate">{guestDetails.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="space-y-2 pb-4 border-b border-[#D8C4A8]/40">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A95339] font-bold block">
                        PAYMENT SUMMARY
                      </span>
                      <div className="space-y-1.5 text-xs text-[#2B1D17]/75">
                        <div className="flex justify-between">
                          <span>Room Tariff ({nights}N × ₹{selectedRoomType?.base_price || 0} × {rooms}R):</span>
                          <span className="font-medium text-[#2B1D17]">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service / Maintenance Fees:</span>
                          <span className="font-medium text-[#2B1D17]">₹0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes:</span>
                          <span className="font-medium text-[#2B1D17]">₹0</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 text-base font-serif font-bold text-[#2B1D17]">
                          <span>Total Amount to Pay:</span>
                          <span className="text-2xl font-light text-[#A95339]">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Compact Policies & Acceptance (#17) */}
                  <div className="bg-[#F7F3EA] border border-[#D8C4A8]/50 rounded-2xl p-5 space-y-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#A95339] font-bold block">
                      BEFORE YOU CONTINUE
                    </span>
                    <ul className="text-xs text-[#2B1D17]/80 space-y-1.5 list-disc list-inside font-light">
                      <li>Standard check-in is 10:00 AM and check-out is 09:00 AM.</li>
                      <li>Shri Nirav Khimat Bhavan strictly observes sacred Jain satvik norms.</li>
                      <li>Government photo ID is required for all adult guests upon arrival.</li>
                    </ul>

                    <div className="pt-2">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={termsAgreed}
                          onChange={(e) => setTermsAgreed(e.target.checked)}
                          className="w-4 h-4 rounded border-[#D8C4A8] text-[#A95339] focus:ring-[#A95339]"
                        />
                        <span className="text-xs font-serif font-medium text-[#2B1D17]">
                          I agree to the booking terms and stay guidelines.
                        </span>
                      </label>
                    </div>

                    {termsError && (
                      <span className="text-[11px] text-red-600 block">{termsError}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#D8C4A8]/40 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 text-xs font-serif font-semibold text-[#2B1D17] hover:text-[#A95339] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={handleProceedToPayment}
                      className="inline-flex items-center gap-2 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Holding Room...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>PROCEED TO PAYMENT →</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: PAYMENT GATEWAY (#19, #20, #21) */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold block">
                      STEP 05 OF 06
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                      Complete Your Booking
                    </h2>
                    <p className="text-xs text-[#2B1D17]/70 font-light">
                      Your reservation is ready. Please complete your payment to finalize your room.
                    </p>
                  </div>

                  {/* Payment Card */}
                  <div className="bg-[#F7F3EA] border border-[#D8C4A8]/60 rounded-2xl p-6 sm:p-8 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#D8C4A8]/30">
                      <span className="font-mono text-xs text-[#2B1D17]/60">BOOKING REFERENCE:</span>
                      <span className="font-mono font-bold text-sm text-[#2B1D17]">{publicBookingId}</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-serif text-base font-medium text-[#2B1D17]">TOTAL TO PAY:</span>
                      <span className="font-serif text-3xl font-light text-[#A95339]">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Failure State (#21) */}
                  {paymentFailed && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-2">
                      <div className="flex items-center gap-2 font-serif font-bold text-sm text-red-900">
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <span>PAYMENT NOT COMPLETED</span>
                      </div>
                      <p className="font-light">
                        {errorMessage || 'Your payment was not completed. Your reservation has not been confirmed.'}
                      </p>
                    </div>
                  )}

                  {/* Payment Trigger Button */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={() => {
                        const mockPaymentId = `pay_rzp_${Date.now()}`;
                        const mockOrderId = `order_nkv_${Date.now()}`;
                        executePaymentConfirmation(mockPaymentId, mockOrderId, 'valid_signature');
                      }}
                      className="w-full flex items-center justify-center gap-3 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-bold py-4 px-6 rounded-full shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wider disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>PROCESSING PAYMENT...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Pay ₹{total.toLocaleString('en-IN')} & Confirm</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-[#2B1D17]/50 font-light">
                      Secure payment powered by Razorpay.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: CONFIRMATION & DIGITAL VOUCHER (#22, #23, #24) */}
              {step === 6 && confirmedBooking && (
                <motion.div
                  key="step-6"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
                >
                  {/* Hero Header */}
                  <div className="text-center space-y-3 pb-6 border-b border-[#D8C4A8]/40">
                    <motion.div
                      initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="w-14 h-14 rounded-full bg-[#A95339] text-white flex items-center justify-center mx-auto shadow-md"
                    >
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </motion.div>

                    <motion.h2
                      initial={shouldReduceMotion ? {} : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.2 }}
                      className="font-serif text-3xl sm:text-4xl font-light text-[#2B1D17]"
                    >
                      YOUR STAY IS CONFIRMED.
                    </motion.h2>

                    <motion.p
                      initial={shouldReduceMotion ? {} : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.3 }}
                      className="text-xs sm:text-sm text-[#2B1D17]/75 max-w-md mx-auto font-light"
                    >
                      Jai Jinendra. Your reservation at Shri Nirav Khimat Bhavan has been confirmed.
                    </motion.p>

                    {/* Booking ID with Copy */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.4 }}
                      className="inline-flex items-center gap-3 bg-[#F7F3EA] border border-[#D8C4A8] px-5 py-2.5 rounded-full mt-2"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A95339] block text-left">
                          BOOKING ID
                        </span>
                        <span className="font-mono text-base font-bold text-[#2B1D17]">
                          {confirmedBooking.publicBookingId}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={copyBookingIdToClipboard}
                        className="p-1.5 rounded-full hover:bg-white text-[#2B1D17] transition-colors"
                        title="Copy Booking ID"
                      >
                        <Copy className="w-4 h-4 text-[#A95339]" />
                      </button>
                    </motion.div>

                    {copiedBookingId && (
                      <span className="text-[11px] text-emerald-700 block font-medium">
                        Booking ID copied to clipboard!
                      </span>
                    )}
                  </div>

                  {/* Official Digital Voucher (#23) */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    id="booking-voucher"
                    className="p-6 sm:p-8 bg-[#F7F3EA] border border-[#D8C4A8] rounded-2xl space-y-5 text-xs text-[#2B1D17]/85"
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-[#D8C4A8]/40">
                      <div>
                        <span className="font-serif font-bold text-sm text-[#2B1D17] block">
                          SHRI NIRAV KHIMAT BHAVAN
                        </span>
                        <span className="text-[10px] text-[#2B1D17]/60">
                          Palitana · Gujarat • Official Booking Voucher
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-serif font-semibold text-[11px] px-3 py-1 rounded-full border border-emerald-300">
                        CONFIRMED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">PRIMARY YATRI</span>
                        <span className="font-serif font-medium text-sm text-[#2B1D17]">
                          {confirmedBooking.customerName || guestDetails.fullName}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">MOBILE</span>
                        <span className="font-mono text-sm text-[#2B1D17]">{guestDetails.phone}</span>
                      </div>

                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">YATRIK</span>
                        <span className="font-serif text-sm text-[#2B1D17]">{guests} Guests</span>
                      </div>

                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">CHECK-IN</span>
                        <span className="font-medium text-[#2B1D17]">{confirmedBooking.checkIn} (10:00 AM)</span>
                      </div>

                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">CHECK-OUT</span>
                        <span className="font-medium text-[#2B1D17]">{confirmedBooking.checkOut} (09:00 AM)</span>
                      </div>

                      <div>
                        <span className="text-[#2B1D17]/50 block uppercase text-[10px]">ROOM</span>
                        <span className="font-medium text-[#2B1D17]">
                          {selectedRoomType?.name} ({rooms}R)
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#D8C4A8]/40 flex justify-between items-baseline">
                      <span className="font-serif font-bold text-[#2B1D17]">TOTAL PAID:</span>
                      <span className="font-serif text-2xl font-light text-[#A95339]">
                        ₹{confirmedBooking.totalPaid || total}
                      </span>
                    </div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-2"
                  >
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 bg-[#FCFAF5] hover:bg-[#F7F3EA] border border-[#D8C4A8] text-[#2B1D17] px-6 py-3.5 rounded-full text-xs font-serif font-semibold transition-all shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-[#A95339]" />
                      <span>PRINT / DOWNLOAD RECEIPT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const message = `Jai Jinendra! My booking at Shri Nirav Khimat Bhavan is confirmed. Booking ID: ${confirmedBooking.publicBookingId}, Dates: ${confirmedBooking.checkIn} to ${confirmedBooking.checkOut}.`;
                        window.open(`https://wa.me/919376656100?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="inline-flex items-center gap-2 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] px-6 py-3.5 rounded-full text-xs font-serif font-bold tracking-wider transition-all shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>WHATSAPP CONFIRMATION</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push('/my-booking')}
                      className="inline-flex items-center gap-2 bg-[#2B1D17] hover:bg-[#A95339] text-[#FFFDF8] px-6 py-3.5 rounded-full text-xs font-serif font-semibold transition-all shadow-sm"
                    >
                      <span>VIEW MY BOOKING</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Sticky Summary Column (col-span-4) (#13) */}
          <div className="lg:col-span-4">
            <BookingSummaryCard
              roomType={selectedRoomType}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              guests={guests}
              rooms={rooms}
              subtotal={subtotal}
              serviceCharge={serviceCharge}
              tax={tax}
              total={total}
              holdExpiresAt={holdExpiresAt}
              showContinueButton={step === 1 || step === 2}
              continueText={step === 1 ? 'FIND ROOMS →' : 'CONTINUE →'}
              onContinue={() => {
                if (step === 1) handleProceedFromDates();
                if (step === 2 && selectedRoomTypeId) setStep(3);
              }}
            />
          </div>

        </div>

      </div>

      {/* Room Lightbox Modal */}
      <RoomLightboxModal
        isOpen={Boolean(lightboxRoom)}
        onClose={() => setLightboxRoom(null)}
        roomType={lightboxRoom}
        isSelected={selectedRoomTypeId === lightboxRoom?.id}
        onSelectRoom={(id) => handleSelectRoomAndProceed(id)}
      />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-xs font-serif font-medium text-[#2B1D17]">
            <Loader2 className="w-5 h-5 animate-spin text-[#A95339]" />
            <span>Loading reservation system...</span>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
