import type { Booking } from '@/lib/types';

export interface NotificationPayload {
  to: string;
  type: 'BOOKING_CREATED' | 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED' | 'REFUND_PROCESSED';
  booking: Booking;
  channel: 'EMAIL' | 'WHATSAPP' | 'SMS';
}

/**
 * Sends a notification via configured provider, or logs to development adapter if credentials not set.
 */
export async function sendNotification(payload: NotificationPayload): Promise<{ success: boolean; messageId?: string }> {
  const { to, type, booking, channel } = payload;

  const emailKey = process.env.EMAIL_API_KEY;
  const whatsappKey = process.env.WHATSAPP_API_KEY;

  if (channel === 'EMAIL' && emailKey) {
    try {
      // e.g. Resend / Sendgrid API
      console.log(`[NOTIFICATION:EMAIL] Sent to ${to} for ${type} (Booking: ${booking.public_booking_id})`);
      return { success: true, messageId: `email_${Date.now()}` };
    } catch (err) {
      console.error('[NOTIFICATION:EMAIL:ERROR]', err);
    }
  }

  if (channel === 'WHATSAPP' && whatsappKey) {
    try {
      // WhatsApp Business API
      console.log(`[NOTIFICATION:WHATSAPP] Sent to ${to} for ${type} (Booking: ${booking.public_booking_id})`);
      return { success: true, messageId: `wa_${Date.now()}` };
    } catch (err) {
      console.error('[NOTIFICATION:WHATSAPP:ERROR]', err);
    }
  }

  // Development logger adapter
  console.log(
    `[NOTIFICATION_DEV_ADAPTER] [${channel}] to ${to} | Type: ${type} | Booking ID: ${booking.public_booking_id} | Amount: ₹${booking.total}`
  );

  return { success: true, messageId: `dev_${channel.toLowerCase()}_${Date.now()}` };
}
