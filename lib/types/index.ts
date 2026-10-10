export type AdminRole = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';

export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE' | 'BLOCKED';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export type PaymentStatus =
  | 'CREATED'
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED';

export type NotificationChannel = 'EMAIL' | 'WHATSAPP' | 'SMS';
export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface Admin {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  role: AdminRole;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RoomAmenity {
  id: string;
  room_type_id: string;
  name: string;
  icon_name?: string;
}

export interface RoomImage {
  id: string;
  room_type_id?: string;
  room_id?: string;
  storage_path: string;
  alt_text: string;
  is_featured: boolean;
  sort_order: number;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  capacity: number;
  base_price: number;
  currency: string;
  bed_type: string;
  room_size_sqft?: number;
  is_active: boolean;
  amenities?: RoomAmenity[];
  images?: RoomImage[];
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  room_type_id: string;
  room_number: string;
  floor: number;
  status: RoomStatus;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  room_type?: RoomType;
}

export interface RoomBlock {
  id: string;
  room_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  reason: string;
  created_by?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address_line1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  id_type?: string;
  id_number_masked?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingRoom {
  id: string;
  booking_id: string;
  room_id: string;
  nightly_rate: number;
  room_total: number;
  room?: Room;
}

export interface Booking {
  id: string;
  public_booking_id: string;
  customer_id: string;
  check_in: string;  // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  guest_count: number;
  status: BookingStatus;
  subtotal: number;
  service_charge: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  hold_expires_at?: string;
  special_requests?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  booking_rooms?: BookingRoom[];
  payment?: Payment;
}

export interface Payment {
  id: string;
  booking_id: string;
  provider: string;
  provider_order_id: string;
  provider_payment_id?: string;
  provider_signature?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  error_code?: string;
  error_description?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  admin_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'property' | 'rooms' | 'dining' | 'palitana' | 'common';
  image_url: string;
  video_url?: string;
  media_type?: 'image' | 'video';
  thumbnail_url?: string;
  alt_text: string;
  is_active: boolean;
  sort_order: number;
}

export interface AvailabilityResult {
  room_type: RoomType;
  available_count: number;
  total_count: number;
  nightly_rate: number;
  total_nights: number;
  subtotal: number;
  service_charge: number;
  tax: number;
  total_amount: number;
  can_accommodate: boolean;
}
