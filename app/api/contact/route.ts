import { NextRequest, NextResponse } from 'next/server';
import { contactInquirySchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactInquirySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Please fill all required inquiry fields correctly',
          },
        },
        { status: 400 }
      );
    }

    const inquiry = validated.data;
    console.log(`[CONTACT_INQUIRY] From ${inquiry.name} (${inquiry.phone}) - Subject: ${inquiry.subject}`);

    // Audit log inquiry
    dbStore.addAuditLog({
      action: 'CONTACT_INQUIRY_SUBMITTED',
      entity_type: 'CONTACT',
      metadata: { name: inquiry.name, phone: inquiry.phone, email: inquiry.email, subject: inquiry.subject },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your message has been received by Shri Nirav Khimat Bhavan management.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'Unable to submit inquiry at this time',
        },
      },
      { status: 500 }
    );
  }
}
