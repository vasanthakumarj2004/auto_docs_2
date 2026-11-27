import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'mail.docsynecx.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const NOREPLY_USER = process.env.SMTP_NOREPLY_EMAIL || 'no-reply@docsynecx.com';
const NOREPLY_PASS = process.env.SMTP_NOREPLY_PASS || '%cbNZ5ch{BD9@hQV';
const ADMIN_EMAIL = process.env.SMTP_ADMIN_EMAIL || 'admin@docsynecx.com';

// Confirmation / Outbound Transporter
export const noreplyTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: NOREPLY_USER,
    pass: NOREPLY_PASS,
  },
  connectionTimeout: 10000,
});

export interface IICSPilotBookingMailerData {
  name: string;
  email: string;
  phone: string;
  company: string;
  day: string;
  slot: string;
  ref?: string;
  role?: string;
  system?: string;
  volume?: string;
  pain?: string;
  event?: string;
  booth?: string;
  type?: 'confirmation' | 'request' | 'cancellation' | 'reschedule';
  status?: string;
  previousDay?: string;
  previousSlot?: string;
}

export interface EventMeetingMailerData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  event?: string;
  booth?: string;
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email?: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// 1. Send IICS Pilot Booking (Both Attendee Confirmation & Admin Notification)
export async function sendIICSPilotBookingMailer(data: IICSPilotBookingMailerData) {
  const cleanEmail = (data.email || '').trim();
  const cleanName = (data.name || '').trim() || 'Attendee';
  const cleanCompany = (data.company || '').trim() || 'Valued Partner';
  const cleanPhone = (data.phone || '').trim() || 'N/A';
  const cleanDay = (data.day || '').trim() || 'Day 1';
  const cleanSlot = (data.slot || '').trim() || 'TBD';

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'A valid email address is required.' };
  }

  const isCancellation = data.type === 'cancellation';
  const isReschedule = data.type === 'reschedule';
  const isRequest =
    !isCancellation &&
    !isReschedule &&
    (data.type === 'request' ||
      (cleanSlot && (cleanSlot.toLowerCase().includes('to be') || cleanSlot.toLowerCase().includes('custom') || cleanSlot.toLowerCase().includes('schedule'))) ||
      (cleanDay && (cleanDay.toLowerCase().includes('custom') || cleanDay.toLowerCase().includes('request'))));

  let statusText = data.status;
  if (!statusText) {
    if (isCancellation) statusText = 'Cancelled';
    else if (isReschedule) statusText = 'Rescheduled';
    else if (isRequest) statusText = 'Requested (To Be Coordinated)';
    else statusText = 'Confirmed';
  }

  let subjectLine = `Confirmation Docsynecx IICS 2026 Pilot Walkthrough`;
  let adminSubjectLine = `Confirmation Docsynecx IICS 2026 Pilot Walkthrough - ${cleanCompany}`;

  if (isCancellation) {
    subjectLine = `Booking Cancelled: Docsynecx IICS 2026 Pilot Walkthrough`;
    adminSubjectLine = `[Booking Cancelled] Docsynecx IICS 2026 Pilot Walkthrough - ${cleanCompany} (${cleanName})`;
  } else if (isReschedule) {
    subjectLine = `Booking Rescheduled: Docsynecx IICS 2026 Pilot Walkthrough`;
    adminSubjectLine = `[Booking Rescheduled] Docsynecx IICS 2026 Pilot Walkthrough - ${cleanCompany} (${cleanName})`;
  } else if (isRequest) {
    subjectLine = `Request Received Docsynecx IICS 2026 Pilot Walkthrough Custom Slot`;
    adminSubjectLine = `[Custom Slot Request] Docsynecx IICS 2026 Pilot Walkthrough - ${cleanCompany}`;
  }

  const safeName = escapeHtml(cleanName);
  const safeCompany = escapeHtml(cleanCompany);
  const safePhone = escapeHtml(cleanPhone);
  const safeDay = escapeHtml(cleanDay);
  const safeSlot = escapeHtml(cleanSlot);
  const safeBooth = escapeHtml(data.booth || 'Booth Q53');
  const safeRole = escapeHtml(data.role || 'N/A');
  const safeSystem = escapeHtml(data.system || 'N/A');
  const safeVolume = escapeHtml(data.volume || 'N/A');
  const safePain = escapeHtml(data.pain || 'N/A');
  const safePrevDay = escapeHtml(data.previousDay || '');
  const safePrevSlot = escapeHtml(data.previousSlot || '');

  // Dynamic badge styling
  let badgeBg = '#ecfdf5';
  let badgeColor = '#047857';
  if (isCancellation) {
    badgeBg = '#fef2f2';
    badgeColor = '#b91c1c';
  } else if (isReschedule) {
    badgeBg = '#eff6ff';
    badgeColor = '#1d4ed8';
  }

  let introGreeting = `Hello <strong>${safeName}</strong>, thank you for reserving your 1-Month Pilot Walkthrough session with Docsynecx for <strong>${safeCompany}</strong>.`;
  if (isCancellation) {
    introGreeting = `Hello <strong>${safeName}</strong>, your 1-Month Pilot Walkthrough session reservation with Docsynecx for <strong>${safeCompany}</strong> has been cancelled. Your slot has been released.`;
  } else if (isReschedule) {
    introGreeting = `Hello <strong>${safeName}</strong>, your 1-Month Pilot Walkthrough session with Docsynecx for <strong>${safeCompany}</strong> has been successfully rescheduled.`;
  }

  const attendeeHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; color: #1f2937;">
  <div style="background: #1F6B45; padding: 24px 32px; color: #ffffff;">
    <div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Docsynecx</div>
    <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">IICS 2026 Pilot Walkthrough</div>
  </div>

  <div style="padding: 32px;">
    <div style="display: inline-block; background: ${badgeBg}; color: ${badgeColor}; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px;">
      Status: ${escapeHtml(statusText)}
    </div>

    <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 12px; color: #111827;">
      ${escapeHtml(subjectLine)}
    </h2>

    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px;">
      ${introGreeting}
    </p>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 9px 0; color: #6b7280;">${isCancellation ? 'Cancelled Slot' : 'Date & Time'}</td>
          <td style="padding: 9px 0; font-weight: 600; color: #111827;">${safeDay} at ${safeSlot} IST</td>
        </tr>
        ${isReschedule && safePrevSlot ? `
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 9px 0; color: #6b7280;">Previous Slot</td>
          <td style="padding: 9px 0; color: #9ca3af; text-decoration: line-through;">${safePrevDay ? `${safePrevDay} at ` : ''}${safePrevSlot} IST</td>
        </tr>` : ''}
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 9px 0; color: #6b7280;">Desk Role</td>
          <td style="padding: 9px 0; font-weight: 600; color: #111827;">${safeRole}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 9px 0; color: #6b7280;">Current System</td>
          <td style="padding: 9px 0; font-weight: 600; color: #111827;">${safeSystem}</td>
        </tr>
        <tr>
          <td style="padding: 9px 0; color: #6b7280;">Weekly Volume</td>
          <td style="padding: 9px 0; font-weight: 600; color: #111827;">${safeVolume} quotes/enquiries</td>
        </tr>
      </table>
    </div>

    ${isCancellation
      ? `
    <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 14px; color: #92400e;">
      <strong>Slot Released:</strong> Your booking has been cancelled and the slot has been made available to other attendees. If this was a mistake or you wish to schedule a new slot, you can re-book any time at <a href="https://docsynecx.com/events/iics-pilot" style="color: #1F6B45; font-weight: 600; text-decoration: underline;">docsynecx.com/events/iics-pilot</a>.
    </div>`
      : isRequest
        ? `
    <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 14px; color: #92400e;">
      <strong>Next Steps:</strong> Our engineering & solutions team will contact you directly on WhatsApp (<strong>${safePhone}</strong>) or Email (<strong>${escapeHtml(cleanEmail)}</strong>) to coordinate a custom walkthrough time.
    </div>`
        : `
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <div style="font-weight: 700; color: #166534; font-size: 14px; margin-bottom: 6px;">1-Month Pilot Inclusions (IICS 2026 Exclusive):</div>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #166534;">
        <li>Up to 250 live RFQs processed from customer enquiry to booking at zero platform fee.</li>
      </ul>
      <div style="margin-top: 10px; font-size: 13px; color: #166534;"><strong>What to prepare:</strong> Please have 1 sample RFQ email and 1 shipping document ready for the live walkthrough.</div>
    </div>`
    }

    <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0;">
      Need to reschedule or reach us immediately? Reach out to our team at <a href="mailto:admin@docsynecx.com" style="color: #1F6B45; text-decoration: none;">admin@docsynecx.com</a> or message us on WhatsApp.
    </p>
  </div>

  <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
    © 2026 Docsynecx · Logistics AI Platform · <a href="https://docsynecx.com" style="color: #1F6B45; text-decoration: none;">docsynecx.com</a>
  </div>
</div>
`;

  const adminHtml = `
  <div style="font-family: sans-serif; padding: 20px; color: #222;">
    <h2>${isCancellation ? '⚠️ IICS 2026 Pilot Booking CANCELLED' : isReschedule ? '🔄 IICS 2026 Pilot Booking RESCHEDULED' : 'New IICS 2026 Pilot Booking / Walkthrough Lead'}</h2>
    <p><strong>Status:</strong> ${escapeHtml(statusText)}</p>
    <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
    <h3>Attendee Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${safeName}</li>
      <li><strong>Company:</strong> ${safeCompany}</li>
      <li><strong>Email:</strong> ${escapeHtml(cleanEmail)}</li>
      <li><strong>Phone/WA:</strong> ${safePhone}</li>
      <li><strong>${isCancellation ? 'Cancelled Slot' : isReschedule ? 'New Slot' : 'Reserved Slot'}:</strong> ${safeDay} at ${safeSlot} IST</li>
      ${isReschedule && safePrevSlot ? `<li><strong>Previous Slot:</strong> ${safePrevDay ? `${safePrevDay} at ` : ''}${safePrevSlot} IST</li>` : ''}
      <li><strong>Event:</strong> ${escapeHtml(data.event || 'IICS 2026')} (${safeBooth})</li>
    </ul>
    <h3>Forwarder Desk Profile:</h3>
    <ul>
      <li><strong>Desk Role:</strong> ${safeRole}</li>
      <li><strong>Current Software:</strong> ${safeSystem}</li>
      <li><strong>Weekly Volume:</strong> ${safeVolume}</li>
      <li><strong>Primary Pain Point:</strong> ${safePain}</li>
    </ul>
  </div>
`;

  // 1. Send confirmation/cancellation/reschedule to attendee (no replyTo header so email client won't show "Reply to admin@docsynecx.com")
  let attendeeRes: any = null;
  try {
    attendeeRes = await noreplyTransporter.sendMail({
      from: `"Docsynecx IICS 2026" <${NOREPLY_USER}>`,
      to: cleanEmail,
      subject: subjectLine,
      html: attendeeHtml,
      text: `Docsynecx IICS 2026 Pilot Walkthrough \nStatus: ${statusText}\nTime: ${cleanDay} at ${cleanSlot} IST\nAttendee: ${cleanName} (${cleanCompany})`,
    });
  } catch (err) {
    console.error('Failed to send attendee email:', err);
  }

  // 2. Send notification to admin
  let adminRes: any = null;
  try {
    adminRes = await noreplyTransporter.sendMail({
      from: `"Docsynecx Leads" <${NOREPLY_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: cleanEmail,
      subject: adminSubjectLine,
      html: adminHtml,
      text: `IICS Pilot Update: ${cleanName} (${cleanCompany})\nStatus: ${statusText}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nSlot: ${cleanDay} at ${cleanSlot} IST`,
    });
  } catch (err) {
    console.error('Failed to send admin notification email:', err);
  }

  return {
    success: !!(attendeeRes || adminRes),
    attendee: attendeeRes,
    admin: adminRes,
  };
}

// 2. Send Event Meeting Request (Both Attendee Confirmation & Admin Notification)
export async function sendEventMeetingMailer(data: EventMeetingMailerData) {
  const cleanEmail = (data.email || '').trim();
  const cleanName = (data.name || '').trim() || 'Attendee';
  const cleanCompany = (data.company || '').trim() || 'Valued Partner';
  const cleanPhone = (data.phone || '').trim() || 'N/A';
  const cleanBooth = (data.booth || '').trim() || 'Booth Q53';
  const cleanEvent = (data.event || '').trim() || 'IICS 2026';
  const cleanMessage = (data.message || '').trim();

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'A valid email address is required.' };
  }

  const safeName = escapeHtml(cleanName);
  const safeCompany = escapeHtml(cleanCompany);
  const safePhone = escapeHtml(cleanPhone);
  const safeBooth = escapeHtml(cleanBooth);
  const safeEvent = escapeHtml(cleanEvent);
  const safeMessage = escapeHtml(cleanMessage);

  const subjectLine = `[Meeting Reserved] Docsynecx at IICS 2026 (${cleanBooth}) - ${cleanName}`;

  const attendeeHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; color: #1f2937;">
  <div style="background: #1F6B45; padding: 24px 32px; color: #ffffff;">
    <div style="font-size: 22px; font-weight: 700;">Docsynecx</div>
    <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">IICS 2026 Booth Meeting</div>
  </div>

  <div style="padding: 32px;">
    <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 12px; color: #111827;">Meeting Request Confirmed</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">
      Hello <strong>${safeName}</strong>, we have received your request to meet the Docsynecx team at the <strong>India International Cargo Show (IICS) 2026</strong>.
    </p>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <p style="margin: 4px 0;"><strong>Company:</strong> ${safeCompany}</p>
      <p style="margin: 4px 0;"><strong>Mobile/WA:</strong> ${safePhone}</p>
      ${safeMessage ? `<p style="margin: 4px 0;"><strong>Notes/Topic:</strong> ${safeMessage}</p>` : ''}
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
      Our team will connect with you to align on your preferred time slot at the booth.
    </p>
  </div>
  <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
    © 2026 Docsynecx · Logistics AI Platform
  </div>
</div>
`;

  const adminHtml = `
<div style="font-family: sans-serif; padding: 20px; color: #222;">
  <h2>New IICS 2026 Booth Meeting Request</h2>
  <ul>
    <li><strong>Attendee:</strong> ${safeName}</li>
    <li><strong>Company:</strong> ${safeCompany}</li>
    <li><strong>Email:</strong> ${escapeHtml(cleanEmail)}</li>
    <li><strong>Phone/WA:</strong> ${safePhone}</li>
    <li><strong>Event:</strong> ${safeEvent} (${safeBooth})</li>
    <li><strong>Notes:</strong> ${safeMessage || 'N/A'}</li>
  </ul>
</div>
`;

  // 1. Send confirmation to attendee (no replyTo header)
  let attendeeRes: any = null;
  try {
    attendeeRes = await noreplyTransporter.sendMail({
      from: `"Docsynecx Event Team" <${NOREPLY_USER}>`,
      to: cleanEmail,
      subject: subjectLine,
      html: attendeeHtml,
      text: `Docsynecx at IICS 2026 (${cleanBooth})\nMeeting Request: ${cleanName} (${cleanCompany})`,
    });
  } catch (err) {
    console.error('Failed to send event meeting confirmation email:', err);
  }

  // 2. Send lead notification to admin
  let adminRes: any = null;
  try {
    adminRes = await noreplyTransporter.sendMail({
      from: `"Docsynecx Leads" <${NOREPLY_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: cleanEmail,
      subject: `[IICS Meeting Lead] ${cleanName} - ${cleanCompany}`,
      html: adminHtml,
      text: `IICS Meeting Request: ${cleanName} (${cleanCompany})\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nNotes: ${cleanMessage || 'N/A'}`,
    });
  } catch (err) {
    console.error('Failed to send event meeting admin notification:', err);
  }

  return {
    success: !!(attendeeRes || adminRes),
    attendee: attendeeRes,
    admin: adminRes,
  };
}
