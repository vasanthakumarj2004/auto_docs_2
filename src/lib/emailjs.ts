import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dbf6de6',
  TEMPLATE_ID_CONTACT: 'template_0bfyahq',
  TEMPLATE_ID_DEMO: 'template_p505oeb',
  TEMPLATE_ID_INTEREST: 'template_p505oeb', // 🔑 Replace with your Register Interest template ID
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

// Send event meeting request email (e.g. for IICS 2026 "Meet us" CTA)
export const sendEventMeetingEmail = async (formData: EventMeetingEmailData) => {
  try {
    const details = [
      `Event: ${formData.event || 'IICS 2026 - India International Cargo Show'}`,
      `Booth: ${formData.booth || 'Booth Q53'}`,
      formData.message ? `Preferred Time / Note: ${formData.message}` : '',
    ].filter(Boolean).join('\n');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company,
      event: formData.event || 'IICS 2026',
      booth: formData.booth || 'Booth Q53',
      message: details,
      to_name: 'Docsynecx Event Team',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_DEMO,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Send event meeting email sent successfully:', response);
    return { success: true, response };
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
}

export const sendRegisterInterestEmail = async (
  formData: RegisterInterestEmailData,
) => {
  try {
    const templateParams = {
      from_email: formData.email,
      company: formData.company,
      feature: formData.feature ?? 'Accounts Payable',
      message: formData.message,
      to_name: 'Docsynecx Team',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_INTEREST,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY,
    );

    console.log('Register interest email sent:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send register interest email:', error);
    return { success: false, error };
  }
};
