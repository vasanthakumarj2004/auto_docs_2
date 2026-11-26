import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dbf6de6',
  TEMPLATE_ID_DEMO: 'template_p505oeb',
  TEMPLATE_ID_INTEREST: 'template_2rppb48',
  PUBLIC_KEY: 'aNHM7hSiOrLj6SJKS',
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};
export interface EventMeetingEmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  event?: string;
  booth?: string;
}

export interface IICSPilotBookingEmailData {
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

// Send comprehensive IICS 2026 pilot booking confirmation or custom slot request email (Nodemailer SMTP via server)
export const sendIICSPilotBookingEmail = async (formData: IICSPilotBookingEmailData) => {
  try {
    if (typeof window === 'undefined') {
      const { sendIICSPilotBookingMailer } = await import('@/src/lib/server/mailer');
      const result = await sendIICSPilotBookingMailer(formData);
      return { success: result.success, response: result };
    }

    const response = await fetch('/api/events/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'iics_pilot',
        ...formData,
      }),
    });

    let result: any = null;
    try {
      result = await response.json();
    } catch {
      // response wasn't JSON
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.error || `Server communication issue (${response.status})`);
    }

    console.log('IICS pilot booking email sent successfully via Nodemailer SMTP:', result);
    return { success: true, response: result };
  } catch (error) {
    console.error('Failed to send IICS pilot booking email:', error);
    return { success: false, error };
  }
};

export interface DemoEmailFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  platform?: string;
  operationSoftware?: string;
  moduleInterest?: string;
  requirements?: string;
  event?: string;
  booth?: string;
}

// Send demo request email
export const sendDemoEmail = async (formData: DemoEmailFormData) => {
  try {
    const details = [
      formData.event ? `Event: ${formData.event}` : '',
      formData.booth ? `Booth: ${formData.booth}` : '',
      formData.platform ? `Platform: ${formData.platform}` : '',
      formData.operationSoftware ? `Current Software: ${formData.operationSoftware}` : '',
      formData.moduleInterest ? `Module / Workflow: ${formData.moduleInterest}` : '',
      formData.requirements ? `Requirements: ${formData.requirements}` : '',
      formData.message && formData.message !== formData.requirements ? `Message: ${formData.message}` : '',
    ].filter(Boolean).join('\n');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company,
      platform: formData.platform || '',
      operationSoftware: formData.operationSoftware || '',
      moduleInterest: formData.moduleInterest || '',
      requirements: formData.requirements || '',
      event: formData.event || '',
      booth: formData.booth || '',
      message: details || formData.message || formData.requirements || 'Demo Request from Docsynecx Website',
      to_name: 'Docsynecx Demo Team',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_DEMO,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Demo email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send demo email:', error);
    return { success: false, error };
  }
};

// Send event meeting request email (e.g. for IICS 2026 "Meet us" CTA) via Nodemailer SMTP
export const sendEventMeetingEmail = async (formData: EventMeetingEmailData) => {
  try {
    if (typeof window === 'undefined') {
      const { sendEventMeetingMailer } = await import('@/src/lib/server/mailer');
      const result = await sendEventMeetingMailer(formData);
      return { success: result.success, response: result };
    }

    const response = await fetch('/api/events/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'event_meeting',
        ...formData,
      }),
    });

    let result: any = null;
    try {
      result = await response.json();
    } catch {
      // response wasn't JSON
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.error || `Server communication issue (${response.status})`);
    }

    console.log('Event meeting email sent successfully via Nodemailer SMTP:', result);
    return { success: true, response: result };
  } catch (error) {
    console.error('Failed to send event meeting email:', error);
    return { success: false, error };
  }
};

export interface RegisterInterestEmailData {
  email: string;
  company: string;
  message: string;
  feature?: string;
  name?: string;
  phone?: string;
}

export const sendRegisterInterestEmail = async (
  formData: RegisterInterestEmailData,
) => {
  try {
    if (typeof window !== 'undefined') {
      try {
        initEmailJS();
      } catch { }
    }

    const ref = 'REQ-INT-' + Math.floor(1000 + Math.random() * 9000);
    const featureName = formData.feature ?? 'Accounts Payable';
    const contactName = formData.name || formData.company || 'Prospective Customer';
    const subjectLine = `New Feature Interest: ${featureName} - ${formData.company} (${ref})`;

    const templateParams = {
      feature: featureName,
      company: formData.company,
      ref,
      booking_ref: ref,
      to_name: 'Docsynecx Team',
      from_name: contactName,
      name: contactName,
      from_email: formData.email,
      email: formData.email,
      to_email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone || 'N/A',
      message: formData.message || 'Early access request for ' + featureName,
      status: 'Registered Interest (Early Access Priority)',
      subject: subjectLine,
      title: subjectLine,
      type: 'Feature Interest',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_INTEREST,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY,
    );

    console.log('Register interest email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send register interest email:', error);
    return { success: false, error };
  }
};
