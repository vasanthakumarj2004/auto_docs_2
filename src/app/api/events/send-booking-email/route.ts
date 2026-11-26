import { NextResponse } from 'next/server';
import {
  sendIICSPilotBookingMailer,
  sendEventMeetingMailer,
  IICSPilotBookingMailerData,
  EventMeetingMailerData,
} from '@/src/lib/server/mailer';

export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Request body must be a valid JSON object' },
        { status: 400 }
      );
    }

    const { action, payload, data, ...rest } = body;
    const resolvedPayload = (payload || data || rest) as any;

    if (!resolvedPayload || typeof resolvedPayload !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Missing form data payload' },
        { status: 400 }
      );
    }

    const email = (resolvedPayload.email || '').trim();
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (action === 'event_meeting' || action === 'sendEventMeetingEmail') {
      const result = await sendEventMeetingMailer(resolvedPayload as EventMeetingMailerData);
      return NextResponse.json({
        success: result.success,
        error: result.error,
        message: result.success ? 'Meeting request processed successfully' : 'Unable to complete email delivery',
      });
    }

    // Default: iics_pilot or sendIICSPilotBookingEmail
    const result = await sendIICSPilotBookingMailer(resolvedPayload as IICSPilotBookingMailerData);
    return NextResponse.json({
      success: result.success,
      error: result.error,
      message: result.success ? 'Booking request processed successfully' : 'Unable to complete email delivery',
    });
  } catch (error: any) {
    console.error('Unhandled error in send-booking-email API route:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
