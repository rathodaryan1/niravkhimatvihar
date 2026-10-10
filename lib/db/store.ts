import type {
  Admin,
  AuditLog,
  Booking,
  BookingRoom,
  Customer,
  GalleryItem,
  Payment,
  Room,
  RoomBlock,
  RoomType,
} from '../types';
import {
  calculateAuthoritativePrice,
  calculateNights,
  generatePublicBookingId,
  getHoldExpirationDate,
  isHoldActive,
  isRoomUnavailable,
} from '../booking/logic';

// Initial Mock Seed Store
const INITIAL_ROOM_TYPES: RoomType[] = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: '2-Bed Standard A/C Room',
    slug: '2-bed-standard-ac',
    description:
      'Spacious and serene air-conditioned accommodation ideal for yatris and couples. Features clean attached washroom with 24-hour hot water, comfortable twin beds, and peaceful ambiance designed for restful stay after Shatrunjaya Yatra.',
    short_description: 'Serene air-conditioned room for 2 guests with attached modern bath & hot water.',
    capacity: 2,
    base_price: 1200,
    currency: 'INR',
    bed_type: '2 Single Beds',
    room_size_sqft: 180,
    is_active: true,
    amenities: [
      { id: 'am-1', room_type_id: 'b0000000-0000-0000-0000-000000000001', name: 'Split Air Conditioning', icon_name: 'Snowflake' },
      { id: 'am-2', room_type_id: 'b0000000-0000-0000-0000-000000000001', name: 'Attached Bathroom', icon_name: 'Bath' },
      { id: 'am-3', room_type_id: 'b0000000-0000-0000-0000-000000000001', name: '24-Hour Hot Water', icon_name: 'Flame' },
      { id: 'am-4', room_type_id: 'b0000000-0000-0000-0000-000000000001', name: 'Pure RO Water', icon_name: 'Droplets' },
      { id: 'am-5', room_type_id: 'b0000000-0000-0000-0000-000000000001', name: 'Daily Housekeeping', icon_name: 'Sparkles' },
    ],
    images: [
      { id: 'img-1', storage_path: '/images/gallery/IMG_1403.JPG', alt_text: '2-Bed Standard A/C Bedroom with comfortable cots and sofa', is_featured: true, sort_order: 1 },
      { id: 'img-1b', storage_path: '/images/gallery/IMG_1407.JPG', alt_text: 'Modern Attached Bathroom with Western Commode & Hot Water', is_featured: false, sort_order: 2 },
      { id: 'img-1c', storage_path: '/images/gallery/IMG_1412.JPG', alt_text: 'Modern Lift / Elevator Access to Room Floors', is_featured: false, sort_order: 3 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: '3-Bed Executive A/C Room',
    slug: '3-bed-executive-ac',
    description:
      'Comfortable air-conditioned family room accommodating up to 3 guests. Equipped with superior split A/C, attached modern bathroom with Western commode, continuous hot water, luggage wardrobe, and clean linen.',
    short_description: 'Spacious A/C room for 3 guests with premium bedding and pristine attached bath.',
    capacity: 3,
    base_price: 1600,
    currency: 'INR',
    bed_type: '3 Single Beds / 1 Queen + 1 Single',
    room_size_sqft: 240,
    is_active: true,
    amenities: [
      { id: 'am-6', room_type_id: 'b0000000-0000-0000-0000-000000000002', name: 'Split Air Conditioning', icon_name: 'Snowflake' },
      { id: 'am-7', room_type_id: 'b0000000-0000-0000-0000-000000000002', name: 'Attached Bathroom', icon_name: 'Bath' },
      { id: 'am-8', room_type_id: 'b0000000-0000-0000-0000-000000000002', name: '24-Hour Hot Water', icon_name: 'Flame' },
      { id: 'am-9', room_type_id: 'b0000000-0000-0000-0000-000000000002', name: 'Luggage Wardrobe', icon_name: 'DoorClosed' },
      { id: 'am-10', room_type_id: 'b0000000-0000-0000-0000-000000000002', name: 'Pure RO Water', icon_name: 'Droplets' },
    ],
    images: [
      { id: 'img-3', storage_path: '/images/gallery/IMG_1402.JPG', alt_text: '3-Bed Executive Room with Split A/C & Sofa Seating', is_featured: true, sort_order: 1 },
      { id: 'img-3b', storage_path: '/images/gallery/IMG_1406.JPG', alt_text: 'Comfortable Single Cot Beds and Clean Linen', is_featured: false, sort_order: 2 },
      { id: 'img-3c', storage_path: '/images/gallery/IMG_1407.JPG', alt_text: 'Clean Attached Bathroom with Western Commode', is_featured: false, sort_order: 3 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: '4-Bed Family A/C Room',
    slug: '4-bed-family-ac',
    description:
      'Designed for pilgrim families visiting Palitana together. Features spacious quarters with 4 comfortable beds, study desk with kettle, large windows with scenic views, attached bathroom, and 24-hour hot water.',
    short_description: 'Large family A/C room for 4 guests with spacious quarters and dedicated amenities.',
    capacity: 4,
    base_price: 2000,
    currency: 'INR',
    bed_type: '4 Single Beds',
    room_size_sqft: 320,
    is_active: true,
    amenities: [
      { id: 'am-11', room_type_id: 'b0000000-0000-0000-0000-000000000003', name: 'Split Air Conditioning', icon_name: 'Snowflake' },
      { id: 'am-12', room_type_id: 'b0000000-0000-0000-0000-000000000003', name: 'Attached Bathroom', icon_name: 'Bath' },
      { id: 'am-13', room_type_id: 'b0000000-0000-0000-0000-000000000003', name: '24-Hour Hot Water', icon_name: 'Flame' },
      { id: 'am-14', room_type_id: 'b0000000-0000-0000-0000-000000000003', name: 'Spacious Seating', icon_name: 'Armchair' },
      { id: 'am-15', room_type_id: 'b0000000-0000-0000-0000-000000000003', name: 'Pure RO Water', icon_name: 'Droplets' },
    ],
    images: [
      { id: 'img-4', storage_path: '/images/gallery/IMG_1400.JPG', alt_text: '4-Bed Family Room with Work Desk & Scenic Window', is_featured: true, sort_order: 1 },
      { id: 'img-4b', storage_path: '/images/gallery/IMG_1401.JPG', alt_text: '4-Bed Family Room Wide Angle with Ceiling Fans', is_featured: false, sort_order: 2 },
      { id: 'img-4c', storage_path: '/images/gallery/IMG_1407.JPG', alt_text: 'Attached Modern Bathroom with Western Commode', is_featured: false, sort_order: 3 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: '6-Bed Yatri Suite A/C',
    slug: '6-bed-yatri-suite',
    description:
      'Generously proportioned group suite tailored for Sangh yatris and extended family groups. Features multiple beds, private suite living lounge, attached bathroom with hot water geyser, and peaceful courtyard views.',
    short_description: 'Generous group suite for 6 yatris with ample space and complete amenities.',
    capacity: 6,
    base_price: 2800,
    currency: 'INR',
    bed_type: '6 Single Beds',
    room_size_sqft: 450,
    is_active: true,
    amenities: [
      { id: 'am-16', room_type_id: 'b0000000-0000-0000-0000-000000000004', name: 'Split Air Conditioning', icon_name: 'Snowflake' },
      { id: 'am-17', room_type_id: 'b0000000-0000-0000-0000-000000000004', name: 'Large Attached Bath', icon_name: 'Bath' },
      { id: 'am-18', room_type_id: 'b0000000-0000-0000-0000-000000000004', name: '24-Hour Hot Water', icon_name: 'Flame' },
      { id: 'am-19', room_type_id: 'b0000000-0000-0000-0000-000000000004', name: 'Multiple Charging Stations', icon_name: 'Zap' },
      { id: 'am-20', room_type_id: 'b0000000-0000-0000-0000-000000000004', name: 'Pure RO Water', icon_name: 'Droplets' },
    ],
    images: [
      { id: 'img-5', storage_path: '/images/gallery/IMG_E1394.JPG', alt_text: 'Suite Living Lounge with Sofas & Dining Table', is_featured: true, sort_order: 1 },
      { id: 'img-5b', storage_path: '/images/gallery/IMG_1400.JPG', alt_text: 'Comfortable Sleeping Quarters with Clean Linen', is_featured: false, sort_order: 2 },
      { id: 'img-5c', storage_path: '/images/gallery/IMG_1408.JPG', alt_text: 'Shatrunjaya Darshan Balcony Lounge', is_featured: false, sort_order: 3 },
      { id: 'img-5d', storage_path: '/images/gallery/IMG_1407.JPG', alt_text: 'Modern Attached Bathroom with Western Commode', is_featured: false, sort_order: 4 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const INITIAL_ROOMS: Room[] = [
  // 2 Bed Rooms
  { id: 'c-101', room_type_id: 'b0000000-0000-0000-0000-000000000001', room_number: 'A-101', floor: 1, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-102', room_type_id: 'b0000000-0000-0000-0000-000000000001', room_number: 'A-102', floor: 1, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-103', room_type_id: 'b0000000-0000-0000-0000-000000000001', room_number: 'A-103', floor: 1, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-104', room_type_id: 'b0000000-0000-0000-0000-000000000001', room_number: 'A-104', floor: 1, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },

  // 3 Bed Rooms
  { id: 'c-201', room_type_id: 'b0000000-0000-0000-0000-000000000002', room_number: 'B-201', floor: 2, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-202', room_type_id: 'b0000000-0000-0000-0000-000000000002', room_number: 'B-202', floor: 2, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-203', room_type_id: 'b0000000-0000-0000-0000-000000000002', room_number: 'B-203', floor: 2, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-204', room_type_id: 'b0000000-0000-0000-0000-000000000002', room_number: 'B-204', floor: 2, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },

  // 4 Bed Rooms
  { id: 'c-301', room_type_id: 'b0000000-0000-0000-0000-000000000003', room_number: 'C-301', floor: 3, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-302', room_type_id: 'b0000000-0000-0000-0000-000000000003', room_number: 'C-302', floor: 3, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-303', room_type_id: 'b0000000-0000-0000-0000-000000000003', room_number: 'C-303', floor: 3, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-304', room_type_id: 'b0000000-0000-0000-0000-000000000003', room_number: 'C-304', floor: 3, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },

  // 6 Bed Rooms
  { id: 'c-401', room_type_id: 'b0000000-0000-0000-0000-000000000004', room_number: 'D-401', floor: 4, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'c-402', room_type_id: 'b0000000-0000-0000-0000-000000000004', room_number: 'D-402', floor: 4, status: 'AVAILABLE', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-entry-gate',
    title: 'Shri Khimat Jain Sangh - Grand Main Entry Gate',
    category: 'property',
    image_url: '/images/gallery/IMG_1430.JPG',
    alt_text: 'Grand traditional temple archway entry gate of Shri Khimat Shwetambar Murtipujak Jain Sangh Sankul Palitana',
    media_type: 'image',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'gal-front-view',
    title: 'Shri Nirav Khimat Bhavan - Front Facade & Campus',
    category: 'property',
    image_url: '/images/gallery/IMG_1425.JPG',
    alt_text: 'Authentic multi-story exterior facade, carved Rajasthani jharokhas, and spacious courtyard campus of Nirav Khimat Bhavan',
    media_type: 'image',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'gal-entrance-porch',
    title: 'Carved Sandstone Entrance Porch & Main Inscription',
    category: 'property',
    image_url: '/images/gallery/IMG_1428.JPG',
    alt_text: 'Carved sandstone porch pillars, granite steps, and donor dedication plaque of Nirav Khimat Bhavan',
    media_type: 'image',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'gal-video-tour',
    title: 'Nirav Khimat Vihar Campus Video Tour',
    category: 'property',
    image_url: '/images/gallery/nirav.jpeg',
    video_url: '/images/gallery/niravkhimatvihar.mp4',
    alt_text: 'Real 58-second video walkthrough tour of Shri Nirav Khimat Bhavan Dharamshala campus and facilities',
    media_type: 'video',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'gal-karyalay',
    title: 'Booking Window & Administrative Office (Karyalay)',
    category: 'property',
    image_url: '/images/gallery/IMG_1416.JPG',
    alt_text: 'Official booking window counter (કાર્યાલય) with pilgrimage map, check-in registration desk, and executive committee directory',
    media_type: 'image',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'gal-seating-area',
    title: 'Swagat Khand - Reception Welcome Seating Lounge',
    category: 'property',
    image_url: '/images/gallery/IMG_1415.JPG',
    alt_text: 'Swagat Khand (સ્વાગતખંડ) ground floor pilgrim waiting lounge with plush sofas, granite star inlay, and pedestal fans',
    media_type: 'image',
    is_active: true,
    sort_order: 6,
  },
  {
    id: 'gal-balcony-seating',
    title: 'Shatrunjaya Darshan - Upper Balcony Seating Area',
    category: 'property',
    image_url: '/images/gallery/IMG_1408.JPG',
    alt_text: 'Shatrunjaya Darshan Parisar (શેત્રુંજય દર્શન પરિસર) upper lounge with long plush sofas, acoustic wooden walls, and panoramic balcony glass doors',
    media_type: 'image',
    is_active: true,
    sort_order: 7,
  },
  {
    id: 'gal-lift',
    title: 'Modern Passenger Lift / Elevator (લીફ્ટ)',
    category: 'property',
    image_url: '/images/gallery/IMG_1412.JPG',
    alt_text: 'Passenger elevator with stainless steel doors, Gujarati lift signage, digital floor indicator, and granite stone framing',
    media_type: 'image',
    is_active: true,
    sort_order: 8,
  },
  {
    id: 'gal-bathroom',
    title: 'Modern Attached Bathroom & Washroom',
    category: 'rooms',
    image_url: '/images/gallery/IMG_1407.JPG',
    alt_text: 'Spotless attached bathroom with modern Western commode, grey slate tiles, towel rack, and 24-hr hot water facility',
    media_type: 'image',
    is_active: true,
    sort_order: 9,
  },
  {
    id: 'gal-room-4bed',
    title: '4-Bed Family Room with Scenic Window & Desk',
    category: 'rooms',
    image_url: '/images/gallery/IMG_1400.JPG',
    alt_text: 'Spacious 4-bed family room with headboards, polka dot bedsheets, warm blankets, desk, electric kettle, and scenic window',
    media_type: 'image',
    is_active: true,
    sort_order: 10,
  },
  {
    id: 'gal-room-ac',
    title: 'Deluxe Air-Conditioned Bedroom with Sofa Lounge',
    category: 'rooms',
    image_url: '/images/gallery/IMG_1403.JPG',
    alt_text: 'Deluxe A/C room with split air conditioner, bedside nightstands, crisp bedding, and comfortable sofa corner',
    media_type: 'image',
    is_active: true,
    sort_order: 11,
  },
  {
    id: 'gal-room-suite-lounge',
    title: 'Executive Suite Living & Dining Lounge',
    category: 'rooms',
    image_url: '/images/gallery/IMG_E1394.JPG',
    alt_text: 'Spacious suite living lounge with plush sofa suite, throw cushions, dining table, and sunny window view',
    media_type: 'image',
    is_active: true,
    sort_order: 12,
  },
  {
    id: 'gal-ukalelu-pani',
    title: 'Temple-Style Ukalelu Pani (Boiled Water) Mandap',
    category: 'property',
    image_url: '/images/gallery/IMG_1414.JPG',
    alt_text: 'Ornate carved terracotta temple-style water pavilion in the foyer providing fresh boiled drinking water (ઉકાળેલું પાણી)',
    media_type: 'image',
    is_active: true,
    sort_order: 13,
  },
  {
    id: 'gal-bhojanshala',
    title: 'Shastrokta Bhojanshala Dining Hall',
    category: 'dining',
    image_url: '/images/gallery/IMG_1417.JPG',
    alt_text: 'Clean and spacious Jain Bhojanshala dining hall with stainless steel tables and chairs for sadharmik prasad',
    media_type: 'image',
    is_active: true,
    sort_order: 14,
  },
  {
    id: 'gal-kitchen',
    title: 'Shuddha Jain Rasoi (Kitchen)',
    category: 'dining',
    image_url: '/images/gallery/IMG_1419.JPG',
    alt_text: 'Hygienic pure Jain kitchen equipped with stainless steel serving stations, bain-marie warmers, and heavy gas stoves',
    media_type: 'image',
    is_active: true,
    sort_order: 15,
  },
];

const INITIAL_ADMINS: Admin[] = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    email: 'admin@niravkhimatvihar.com',
    name: 'Dharamshala Administrator',
    role: 'SUPER_ADMIN',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// In-Memory Storage Singleton
class DataStore {
  roomTypes: RoomType[] = [...INITIAL_ROOM_TYPES];
  rooms: Room[] = [...INITIAL_ROOMS];
  roomBlocks: RoomBlock[] = [];
  customers: Customer[] = [];
  bookings: Booking[] = [];
  payments: Payment[] = [];
  auditLogs: AuditLog[] = [];
  galleryItems: GalleryItem[] = [...INITIAL_GALLERY];
  admins: Admin[] = [...INITIAL_ADMINS];

  // Get Active Room Types
  async getRoomTypes(): Promise<RoomType[]> {
    return this.roomTypes.filter((rt) => rt.is_active);
  }

  // Get Room Type by Slug
  async getRoomTypeBySlug(slug: string): Promise<RoomType | null> {
    const rt = this.roomTypes.find((r) => r.slug === slug && r.is_active);
    return rt || null;
  }

  // Get Room Type by ID
  async getRoomTypeById(id: string): Promise<RoomType | null> {
    const rt = this.roomTypes.find((r) => r.id === id);
    return rt || null;
  }

  // Calculate Real-Time Availability
  async checkAvailability(
    checkIn: string,
    checkOut: string,
    guests: number,
    roomsNeeded: number = 1
  ) {
    const nights = calculateNights(checkIn, checkOut);
    const activeTypes = await this.getRoomTypes();

    const results = activeTypes.map((rt) => {
      // Find all physical rooms of this type
      const physicalRooms = this.rooms.filter(
        (r) => r.room_type_id === rt.id && r.is_active && r.status !== 'MAINTENANCE'
      );

      // Filter available rooms
      const availablePhysicalRooms = physicalRooms.filter(
        (r) => !isRoomUnavailable(r.id, checkIn, checkOut, this.bookings, this.roomBlocks)
      );

      const price = calculateAuthoritativePrice(rt, nights, roomsNeeded);
      const canAccommodateCapacity = rt.capacity * roomsNeeded >= guests;
      const hasEnoughRooms = availablePhysicalRooms.length >= roomsNeeded;

      return {
        room_type: rt,
        available_count: availablePhysicalRooms.length,
        total_count: physicalRooms.length,
        available_room_ids: availablePhysicalRooms.map((r) => r.id),
        nightly_rate: price.nightlyRate,
        total_nights: nights,
        subtotal: price.subtotal,
        service_charge: price.serviceCharge,
        tax: price.tax,
        total_amount: price.total,
        can_accommodate: canAccommodateCapacity && hasEnoughRooms,
      };
    });

    return results;
  }

  // Create Temporary Booking Hold (Atomic Concurrency Protected)
  async createBookingHold(params: {
    roomTypeId: string;
    checkIn: string;
    checkOut: string;
    guestCount: number;
    roomCount?: number;
    customer: {
      fullName: string;
      phone: string;
      email: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      specialRequests?: string;
    };
  }): Promise<{ booking: Booking; customer: Customer }> {
    const { roomTypeId, checkIn, checkOut, guestCount, roomCount = 1, customer: custData } = params;

    const rt = await this.getRoomTypeById(roomTypeId);
    if (!rt || !rt.is_active) {
      throw new Error('Selected room type is invalid or inactive');
    }

    // 1. Double-Booking Protection: Re-check available physical rooms atomically
    const physicalRooms = this.rooms.filter(
      (r) => r.room_type_id === rt.id && r.is_active && r.status !== 'MAINTENANCE'
    );

    const availableRooms = physicalRooms.filter(
      (r) => !isRoomUnavailable(r.id, checkIn, checkOut, this.bookings, this.roomBlocks)
    );

    if (availableRooms.length < roomCount) {
      throw new Error('Sorry, the selected room is no longer available for these dates.');
    }

    // 2. Select physical rooms to reserve
    const selectedRooms = availableRooms.slice(0, roomCount);

    // 3. Create or find customer
    let customer = this.customers.find(
      (c) => c.phone === custData.phone || c.email.toLowerCase() === custData.email.toLowerCase()
    );

    if (!customer) {
      customer = {
        id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        full_name: custData.fullName,
        phone: custData.phone,
        email: custData.email,
        address_line1: custData.address,
        city: custData.city,
        state: custData.state,
        pincode: custData.pincode,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.customers.push(customer);
    } else {
      // Update customer info
      customer.full_name = custData.fullName;
      customer.address_line1 = custData.address || customer.address_line1;
      customer.city = custData.city || customer.city;
      customer.state = custData.state || customer.state;
      customer.pincode = custData.pincode || customer.pincode;
      customer.updated_at = new Date().toISOString();
    }

    // 4. Server authoritative price calculation
    const nights = calculateNights(checkIn, checkOut);
    const pricing = calculateAuthoritativePrice(rt, nights, roomCount);
    const holdExpiresAt = getHoldExpirationDate(10).toISOString();
    const publicBookingId = generatePublicBookingId();
    const bookingId = `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // 5. Create Booking Rooms
    const bookingRooms: BookingRoom[] = selectedRooms.map((room) => ({
      id: `br-${Date.now()}-${room.id}`,
      booking_id: bookingId,
      room_id: room.id,
      nightly_rate: pricing.nightlyRate,
      room_total: pricing.nightlyRate * nights,
      room,
    }));

    // 6. Create Booking in PENDING_PAYMENT hold state
    const booking: Booking = {
      id: bookingId,
      public_booking_id: publicBookingId,
      customer_id: customer.id,
      check_in: checkIn,
      check_out: checkOut,
      guest_count: guestCount,
      status: 'PENDING_PAYMENT',
      subtotal: pricing.subtotal,
      service_charge: pricing.serviceCharge,
      tax: pricing.tax,
      discount: pricing.discount,
      total: pricing.total,
      currency: 'INR',
      hold_expires_at: holdExpiresAt,
      special_requests: custData.specialRequests,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      customer,
      booking_rooms: bookingRooms,
    };

    this.bookings.push(booking);
    return { booking, customer };
  }

  // Attach Payment Order to Booking
  async attachPaymentOrder(bookingId: string, orderId: string, amount: number) {
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    const payment: Payment = {
      id: `pay-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      booking_id: bookingId,
      provider: 'RAZORPAY',
      provider_order_id: orderId,
      amount: amount / 100, // convert paise to rupees
      currency: 'INR',
      status: 'CREATED',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.payments.push(payment);
    booking.payment = payment;
    return payment;
  }

  // Confirm Booking on Verified Payment
  async confirmPaymentAndBooking(
    bookingId: string,
    orderId: string,
    paymentId: string,
    signature: string
  ): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    // Verify hold hasn't expired
    if (!isHoldActive(booking) && booking.status !== 'CONFIRMED') {
      // In case of grace period confirmation
      console.warn(`Confirming booking ${booking.public_booking_id} with expired hold`);
    }

    // Update payment record
    let payment = this.payments.find((p) => p.booking_id === bookingId && p.provider_order_id === orderId);
    if (!payment) {
      payment = {
        id: `pay-${Date.now()}`,
        booking_id: bookingId,
        provider: 'RAZORPAY',
        provider_order_id: orderId,
        provider_payment_id: paymentId,
        provider_signature: signature,
        amount: booking.total,
        currency: 'INR',
        status: 'PAID',
        verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.payments.push(payment);
    } else {
      payment.provider_payment_id = paymentId;
      payment.provider_signature = signature;
      payment.status = 'PAID';
      payment.verified_at = new Date().toISOString();
      payment.updated_at = new Date().toISOString();
    }

    // Transition booking state to CONFIRMED
    booking.status = 'CONFIRMED';
    booking.hold_expires_at = undefined;
    booking.updated_at = new Date().toISOString();
    booking.payment = payment;

    // Log audit trail
    this.addAuditLog({
      action: 'BOOKING_CONFIRMED',
      entity_type: 'BOOKING',
      entity_id: booking.id,
      metadata: {
        public_booking_id: booking.public_booking_id,
        amount: booking.total,
        payment_id: paymentId,
      },
    });

    return booking;
  }

  // Lookup Booking (Customer Verification Safe)
  async lookupBooking(publicBookingId: string, phone: string): Promise<Booking | null> {
    const cleanId = publicBookingId.trim().toUpperCase();
    const cleanPhone = phone.trim();

    const booking = this.bookings.find(
      (b) => b.public_booking_id.toUpperCase() === cleanId
    );

    if (!booking) return null;

    const customer = this.customers.find((c) => c.id === booking.customer_id);
    if (!customer || customer.phone.replace(/\D/g, '') !== cleanPhone.replace(/\D/g, '')) {
      return null; // Prevent unauthorized access
    }

    // Populate relations
    return {
      ...booking,
      customer,
      payment: this.payments.find((p) => p.booking_id === booking.id),
      booking_rooms: (booking.booking_rooms || []).map((br) => ({
        ...br,
        room: this.rooms.find((r) => r.id === br.room_id),
      })),
    };
  }

  // Cancel Booking (Supports both customer phone verification and admin override)
  async cancelBooking(
    bookingIdOrPublicId: string,
    phoneOrReason: string = '',
    reasonOrAdminId?: string,
    adminId?: string
  ): Promise<Booking> {
    const booking = this.bookings.find(
      (b) =>
        b.id === bookingIdOrPublicId ||
        b.public_booking_id.toUpperCase() === bookingIdOrPublicId.trim().toUpperCase()
    );
    if (!booking) throw new Error('Booking not found');

    let actualReason = 'Cancelled by administration';
    let actualAdminId: string | undefined = undefined;

    if (reasonOrAdminId && !adminId) {
      const customer = this.customers.find((c) => c.id === booking.customer_id);
      const isPhone = /^\+?[\d\s-]{8,}$/.test(phoneOrReason);
      if (isPhone && customer) {
        if (customer.phone.replace(/\D/g, '') !== phoneOrReason.replace(/\D/g, '')) {
          throw new Error('Contact phone does not match booking records');
        }
        actualReason = reasonOrAdminId;
      } else {
        actualReason = phoneOrReason;
        actualAdminId = reasonOrAdminId;
      }
    } else if (adminId) {
      actualReason = phoneOrReason;
      actualAdminId = adminId;
    } else {
      actualReason = phoneOrReason || 'Cancelled';
    }

    if (booking.status === 'CANCELLED') {
      throw new Error('This booking is already cancelled');
    }

    if (booking.status === 'CHECKED_IN' || booking.status === 'CHECKED_OUT') {
      throw new Error('Cannot cancel a booking that has already checked in or checked out');
    }

    booking.status = 'CANCELLED';
    booking.cancelled_at = new Date().toISOString();
    booking.cancellation_reason = actualReason;
    booking.updated_at = new Date().toISOString();

    // Audit Log
    this.addAuditLog({
      admin_id: actualAdminId,
      action: 'BOOKING_CANCELLED',
      entity_type: 'BOOKING',
      entity_id: booking.id,
      metadata: { public_booking_id: booking.public_booking_id, reason: actualReason },
    });

    return booking;
  }

  // Admin: Check-in
  async checkInBooking(bookingId: string, adminId: string): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');
    booking.status = 'CHECKED_IN';
    booking.updated_at = new Date().toISOString();

    this.addAuditLog({
      admin_id: adminId,
      action: 'BOOKING_CHECKED_IN',
      entity_type: 'BOOKING',
      entity_id: booking.id,
    });

    return booking;
  }

  // Admin: Check-out
  async checkOutBooking(bookingId: string, adminId: string): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');
    booking.status = 'CHECKED_OUT';
    booking.updated_at = new Date().toISOString();

    this.addAuditLog({
      admin_id: adminId,
      action: 'BOOKING_CHECKED_OUT',
      entity_type: 'BOOKING',
      entity_id: booking.id,
    });

    return booking;
  }

  // Admin: Block Room
  async blockRoom(roomId: string, startDate: string, endDate: string, reason: string, adminId: string) {
    const block: RoomBlock = {
      id: `block-${Date.now()}`,
      room_id: roomId,
      start_date: startDate,
      end_date: endDate,
      reason,
      created_by: adminId,
      created_at: new Date().toISOString(),
    };
    this.roomBlocks.push(block);

    this.addAuditLog({
      admin_id: adminId,
      action: 'ROOM_BLOCKED',
      entity_type: 'ROOM',
      entity_id: roomId,
      metadata: { startDate, endDate, reason },
    });

    return block;
  }

  // Admin: Unblock Room
  async unblockRoom(blockId: string, adminId: string) {
    const index = this.roomBlocks.findIndex((b) => b.id === blockId);
    if (index !== -1) {
      const removed = this.roomBlocks.splice(index, 1)[0];
      this.addAuditLog({
        admin_id: adminId,
        action: 'ROOM_UNBLOCKED',
        entity_type: 'ROOM',
        entity_id: removed.room_id,
        metadata: { blockId },
      });
      return true;
    }
    return false;
  }

  // Admin: Update Room Price
  async updateRoomTypePrice(roomTypeId: string, newPrice: number, adminId: string) {
    const rt = this.roomTypes.find((r) => r.id === roomTypeId);
    if (!rt) throw new Error('Room type not found');

    const oldPrice = rt.base_price;
    rt.base_price = newPrice;
    rt.updated_at = new Date().toISOString();

    this.addAuditLog({
      admin_id: adminId,
      action: 'PRICE_UPDATED',
      entity_type: 'ROOM_TYPE',
      entity_id: roomTypeId,
      metadata: { oldPrice, newPrice, roomType: rt.name },
    });

    return rt;
  }

  // Admin: Get Dashboard Metrics
  async getDashboardMetrics() {
    const today = new Date().toISOString().split('T')[0];

    const todaysArrivals = this.bookings.filter(
      (b) => b.check_in === today && (b.status === 'CONFIRMED' || b.status === 'CHECKED_IN')
    ).length;

    const todaysDepartures = this.bookings.filter(
      (b) => b.check_out === today && (b.status === 'CHECKED_IN' || b.status === 'CONFIRMED')
    ).length;

    const occupiedRooms = this.rooms.filter((r) => {
      return this.bookings.some(
        (b) =>
          (b.status === 'CHECKED_IN' || (b.status === 'CONFIRMED' && b.check_in <= today && b.check_out > today)) &&
          b.booking_rooms?.some((br) => br.room_id === r.id)
      );
    }).length;

    const availableRoomsCount = Math.max(0, this.rooms.length - occupiedRooms);

    const pendingPaymentsCount = this.bookings.filter(
      (b) => isHoldActive(b) && b.status === 'PENDING_PAYMENT'
    ).length;

    const todaysRevenue = this.bookings
      .filter((b) => (b.status === 'CONFIRMED' || b.status === 'CHECKED_IN' || b.status === 'CHECKED_OUT') && b.created_at.startsWith(today))
      .reduce((sum, b) => sum + Number(b.total), 0);

    const totalRevenue = this.bookings
      .filter((b) => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN' || b.status === 'CHECKED_OUT')
      .reduce((sum, b) => sum + Number(b.total), 0);

    const todaysBookings = this.bookings
      .filter((b) => b.created_at.startsWith(today) || b.check_in === today)
      .map((b) => ({
        ...b,
        customer: this.customers.find((c) => c.id === b.customer_id),
        room: b.booking_rooms?.[0]?.room || this.rooms.find((r) => r.id === b.booking_rooms?.[0]?.room_id),
      }));

    const recentBookings = this.bookings
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8)
      .map((b) => ({
        ...b,
        customer: this.customers.find((c) => c.id === b.customer_id),
        room: b.booking_rooms?.[0]?.room || this.rooms.find((r) => r.id === b.booking_rooms?.[0]?.room_id),
      }));

    const roomTypeStats = this.roomTypes.map((rt) => {
      const typeRooms = this.rooms.filter((r) => r.room_type_id === rt.id);
      const occupied = typeRooms.filter((r) =>
        this.bookings.some(
          (b) =>
            (b.status === 'CHECKED_IN' || (b.status === 'CONFIRMED' && b.check_in <= today && b.check_out > today)) &&
            b.booking_rooms?.some((br) => br.room_id === r.id)
        )
      ).length;
      return {
        id: rt.id,
        name: rt.name,
        total: typeRooms.length,
        occupied,
        available: typeRooms.length - occupied,
        price: rt.base_price,
      };
    });

    const recentPayments = this.payments
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map((p) => {
        const booking = this.bookings.find((b) => b.id === p.booking_id);
        const customer = booking ? this.customers.find((c) => c.id === booking.customer_id) : null;
        return {
          ...p,
          public_booking_id: booking?.public_booking_id || 'NKV-RES',
          customer_name: customer?.full_name || 'Yatri',
        };
      });

    const recentActivity = this.auditLogs.slice(0, 6);

    return {
      todaysArrivals,
      todaysDepartures,
      occupiedRooms,
      availableRoomsCount,
      totalRoomsCount: this.rooms.length,
      pendingPaymentsCount,
      todaysRevenue,
      totalRevenue,
      todaysBookings,
      recentBookings,
      roomTypeStats,
      recentPayments,
      recentActivity,
    };
  }

  // Audit Log Helper
  addAuditLog(log: Omit<AuditLog, 'id' | 'created_at'>) {
    const fullLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...log,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(fullLog);
  }
}

// Global Singleton for Development & Production Parity
declare global {
  var __NKV_STORE__: DataStore | undefined;
}

export const dbStore = globalThis.__NKV_STORE__ || new DataStore();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__NKV_STORE__ = dbStore;
}
