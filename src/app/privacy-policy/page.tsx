import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { LegalPageLayout } from '@/src/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — Docsynecx AI Document Automation Platform',
  description:
    'Read Docsynecx’s Privacy Policy to understand how we collect, use, and protect your personal data, imported documents, and parsed content.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — Docsynecx AI Document Automation Platform',
    description:
      'Learn about our data protection standards, processor vs controller roles, and security protocols.',
    url: 'https://docsynecx.com/privacy-policy',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      {/* The Short Version */}
      <h2>The Short Version</h2>
      <p>
        Your data belongs to you, not us. We do not resell user data or information extracted
        from uploaded documents. We do, however, use this data to improve our services. Data
        security is our top priority, and we employ advanced measures to ensure your information
        is protected.
      </p>

      {/* The Long Version */}
      <h2>The Long Version</h2>
      <p>
        Docsynecx (&ldquo;Docsynecx&rdquo;, &ldquo;we&rdquo;, or &ldquo;Service Provider&rdquo;)
        is operated by <strong>SynecX AI Labs Private Limited</strong> and is committed to
        protecting the Personal Data of its Clients. This Privacy Policy forms an integral part
        of the Terms of Service. Any capitalized term defined in the Terms of Service applies
        here.
      </p>
      <p>
        By using or registering with Docsynecx through{' '}
        <a href="https://docsynecx.com" target="_blank" rel="noopener noreferrer">
          https://docsynecx.com
        </a>{' '}
        or any of its subdomains, the Client agrees to comply with this Privacy Policy. We may
        update this policy from time to time without prior notice. Updates will be published on
        our website or within our application.
      </p>

      {/* 1. Collected Data */}
      <h2>1. Collected Data</h2>
      <p>
        When registering or using Docsynecx, we may voluntarily collect Personal Data for service
        performance. This may include:
      </p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Company name</li>
        <li>Billing address</li>
        <li>Tax identification (e.g., GST)</li>
      </ul>
      <p>
        We may also collect behavioral and preference data through website or application
        interactions (pages visited, surveys answered, etc.).
      </p>
      <p>
        When using Docsynecx, users typically upload documents (PDFs, scans, etc.) via the app,
        email, API, or third-party integrations. These documents (Imported Documents) are
        processed to extract structured information (Parsed Content).
      </p>

      {/* 2. Usage of Data */}
      <h2>2. Usage of Data</h2>
      <p>
        We collect data to improve user experience and service functionality. Data is retained as
        necessary unless the user requests deletion via{' '}
        <a href="mailto:privacy@docsynecx.com">privacy@docsynecx.com</a>. Upon such request,
        data will be deleted within 30 days with confirmation.
      </p>
      <p>
        We do not sell Personal Data, Imported Documents, or Parsed Content. Documents may be
        retained for AI training and product development and will be deleted post-use. This
        processing is based on legitimate interest under applicable data protection laws.
      </p>
      <p>
        <strong>Sensitive data</strong> (e.g., racial, political, religious, health-related)
        must not be uploaded or processed through Docsynecx.
      </p>
      <ul>
        <li>
          <strong>Roles:</strong> Data Controller: Personal Data, Data Processor: Imported
          Documents and Parsed Content
        </li>
      </ul>
      <p>Data may be used for:</p>
      <ul>
        <li>Internal records</li>
        <li>Product/service improvement</li>
        <li>Promotional communications (with consent)</li>
        <li>Automated decisions or profiling to improve experience</li>
      </ul>

      {/* 3. Third-Party Services */}
      <h2>3. Third-Party Services</h2>
      <p>
        We may use external service providers for operations (e.g., analytics, hosting). These
        third parties may access limited Personal Data solely for operational purposes, not for
        marketing, unless otherwise specified or consented to. Clients may request integrations
        with third-party services (e.g., Google Sheets, Salesforce, Zapier). Responsibility for
        data transmission lies with the Client. If required by law or court order, Docsynecx may
        disclose Personal Data to authorities.
      </p>

      {/* 4. External Links */}
      <h2>4. External Links</h2>
      <p>
        Docsynecx may link to third-party websites. We are not responsible for their content or
        privacy practices. Users should read those sites&rsquo; privacy policies before use.
      </p>

      {/* 5. User Data Control */}
      <h2>5. User Data Control</h2>
      <p>Users can:</p>
      <ul>
        <li>Opt out of marketing</li>
        <li>Request a copy of their data</li>
        <li>Withdraw consent at any time</li>
        <li>Request complete data deletion</li>
      </ul>

      {/* 6. Security */}
      <h2>6. Security</h2>
      <p>
        We use industry-standard SSL encryption and secure infrastructure (Amazon Web Services,
        Google Cloud). Backups are created daily, and only authorized employees can access data.
        Passwords are stored as encrypted hash keys, not visible to staff. Clients are
        responsible for maintaining password confidentiality. Transmission of data via the
        internet carries inherent risks; we take extensive measures but cannot guarantee
        absolute security.
      </p>

      {/* 7. Cookies */}
      <h2>7. Cookies</h2>
      <p>
        We use cookies for performance, personalization, and advertising. Consent is required upon
        first visit. Disabling cookies may impact service functionality.
      </p>
      <p><strong>Types of Cookies:</strong></p>
      <ul>
        <li>Strictly Necessary (e.g., login authentication)</li>
        <li>Functionality (e.g., language preferences)</li>
        <li>Analytics (e.g., page visits, load speed)</li>
        <li>Advertising (e.g., ad impressions, retargeting)</li>
      </ul>
      <p>
        Tools used: Cloudflare, Google Analytics, Hotjar, Facebook Pixel, LinkedIn Pixel, Mixpanel,
        HubSpot, Apollo, Chameleon.
      </p>

      {/* 8. Communications */}
      <h2>8. Communications</h2>
      <p>
        Docsynecx may contact users for operational or promotional reasons. Promotional emails will
        relate to the user&rsquo;s professional activity.
      </p>

      {/* 9. General Terms */}
      <h2>9. General Terms</h2>
      <ul>
        <li>Rights under this policy cannot be transferred without consent.</li>
        <li>Invalid provisions will not affect the remainder of the policy.</li>
        <li>Delay or inaction does not imply waiver of any right.</li>
        <li>
          Governed by the laws of India. Disputes will be resolved under the jurisdiction of
          Indian courts.
        </li>
      </ul>

      {/* 10. Business Changes */}
      <h2>10. Business Changes</h2>
      <p>
        In case of acquisition, merger, or sale, user data may be transferred to new owners under the
        terms of this policy. We will take steps to ensure privacy is protected.
      </p>

      {/* 11. Policy Changes */}
      <h2>11. Policy Changes</h2>
      <p>
        Docsynecx may amend this Privacy Policy as required by law or operational necessity. Updates
        will be posted on our website. Continued use of the platform implies acceptance of the
        updated terms.
      </p>

      {/* Contact */}
      <h2>Contact</h2>
      <p>
        For concerns or questions about your data, contact:{' '}
        <a href="mailto:privacy@docsynecx.com">privacy@docsynecx.com</a>
      </p>
    </LegalPageLayout>
  );
}
