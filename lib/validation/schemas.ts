import { z } from 'zod';

// Date format YYYY-MM-DD validation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const availabilityQuerySchema = z.object({
  checkIn: z.string().regex(dateRegex, 'Check-in date must be in YYYY-MM-DD format'),
  checkOut: z.string().regex(dateRegex, 'Check-out date must be in YYYY-MM-DD format'),
  guests: z.coerce.number().int().min(1, 'At least 1 guest is required').max(30, 'Guest count exceeds maximum limit'),
  rooms: z.coerce.number().int().min(1, 'At least 1 room is required').max(10, 'Maximum 10 rooms per booking').default(1),
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: 'Check-out date must be strictly after check-in date',
  path: ['checkOut'],
});

export const customerDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name must have at least 2 characters').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must have at least 5 characters').max(200).optional(),
  city: z.string().min(2, 'City name is required').max(100),
  state: z.string().min(2, 'State is required').max(100),
  pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit PIN code'),
  specialRequests: z.string().max(500, 'Special requests cannot exceed 500 characters').optional(),
});

export const createHoldSchema = z.object({
  roomTypeId: z.string().min(5, 'Invalid Room Type ID'),
  checkIn: z.string().regex(dateRegex, 'Check-in must be YYYY-MM-DD'),
  checkOut: z.string().regex(dateRegex, 'Check-out must be YYYY-MM-DD'),
  guestCount: z.number().int().min(1).max(30),
  roomCount: z.number().int().min(1).max(10).default(1),
  customer: customerDetailsSchema,
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: 'Check-out date must be strictly after check-in date',
  path: ['checkOut'],
});

export const createPaymentOrderSchema = z.object({
  bookingId: z.string().min(5, 'Invalid Booking ID'),
  publicBookingId: z.string().min(5, 'Public booking ID is required'),
});

export const verifyPaymentSchema = z.object({
  bookingId: z.string().min(5, 'Invalid Booking ID'),
  razorpayOrderId: z.string().min(5, 'Order ID is required'),
  razorpayPaymentId: z.string().min(5, 'Payment ID is required'),
  razorpaySignature: z.string().min(10, 'Payment signature is required'),
});

export const bookingLookupSchema = z.object({
  publicBookingId: z.string().min(5, 'Please enter your Booking ID (e.g. NKV-2026-XXXXX)'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter the 10-digit mobile number used during booking'),
});

export const cancelBookingSchema = z.object({
  publicBookingId: z.string().min(5),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  reason: z.string().min(5, 'Please provide a cancellation reason').max(300),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const roomBlockSchema = z.object({
  roomId: z.string().min(5, 'Invalid Room ID'),
  startDate: z.string().regex(dateRegex),
  endDate: z.string().regex(dateRegex),
  reason: z.string().min(3, 'Reason must be provided').max(200),
}).refine((data) => {
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: 'End date must be on or after start date',
  path: ['endDate'],
});

export const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit mobile number required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});
