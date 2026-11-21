import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { LegalPageLayout } from '@/src/components/legal/LegalPageLayout';
import s from '@/src/components/legal/LegalPage.module.css';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/terms-of-service/');

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      {/* Top Metadata Block */}
      <div className={s.metaHeader}>
        <p>
          <strong>Effective Date:</strong> 14-05-2025<br />
          <strong>Company Name:</strong> SynecX AI Labs Pvt Ltd<br />
          <strong>Registered Address:</strong> S.F.NO 497, Thadagam Main Road, Kanuvai, Coimbatore,
          India-641108<br />
          <strong>Contact:</strong>{' '}
          <a href="mailto:support@docsynecx.com">support@docsynecx.com</a>
        </p>
      </div>

      <p>
        Welcome to Docsynecx, a document intelligence platform operated by Synecx AI Labs Pvt Ltd.,
        a private limited company registered in India. By signing up on our website or using our
        services, you (the &ldquo;Client&rdquo;) acknowledge that you have read, understood, and
        agree to these Terms of Service.
      </p>

      <p>
        We recommend saving a copy of these Terms for your reference. These Terms may be updated
        periodically, and continued use of the Service indicates acceptance of any updated terms.
      </p>

      {/* 1. Definitions */}
      <h2>1. Definitions</h2>
      <ul>
        <li>
          <strong>Account:</strong> Your registered profile with Docsynecx that grants access to the
          Service.
        </li>
        <li>
          <strong>Agreement:</strong> These Terms of Service, Privacy Policy, Subscribed Plan, and
          any additional agreements related to the Service.
        </li>
        <li>
          <strong>Client:</strong> The individual or organization entering into this Agreement with
          Docsynecx.
        </li>
        <li>
          <strong>Content:</strong> Any data (personal or non-personal) submitted and processed
          through the Service.
        </li>
        <li>
          <strong>Documentation:</strong> All guides and knowledge base articles available on
          docsynecx.com describing how the Service works.
        </li>
        <li>
          <strong>Document Parser:</strong> Algorithms used to extract data from uploaded documents.
        </li>
        <li>
          <strong>Docsynecx Platform:</strong> Our proprietary SaaS platform and associated
          applications.
        </li>
        <li>
          <strong>External API:</strong> Web services through which Clients may interact with
          Docsynecx data outputs.
        </li>
        <li>
          <strong>Imported Document:</strong> Documents uploaded by Clients for processing.
        </li>
        <li>
          <strong>Parsing Rules:</strong> Instructions created by the Client to define what data to
          extract.
        </li>
        <li>
          <strong>Parsed Content:</strong> Output data extracted based on the Parsing Rules.
        </li>
        <li>
          <strong>Personal Data:</strong> Information relating to an identifiable individual.
        </li>
        <li>
          <strong>Processed Document:</strong> Documents submitted through the Account for parsing.
        </li>
        <li>
          <strong>Service:</strong> Access to and use of the Docsynecx Platform, including any
          related features or APIs.
        </li>
        <li>
          <strong>Subscribed Plan:</strong> The pricing tier selected by the Client, including both
          monthly and annual billing options.
        </li>
      </ul>

      {/* 2. Purpose */}
      <h2>2. Purpose of the Agreement</h2>
      <p>
        The purpose of this Agreement is to define the conditions under which Synecx AI Labs Pvt
        Ltd (Docsynecx) provides the Client with access to its document intelligence platform (the
        Service). Upon agreeing to these Terms, the Client is granted a non-exclusive,
        non-transferable right to use the Docsynecx Platform in a Software-as-a-Service (SaaS) model.
        In return, the Client agrees to pay the applicable fees and comply with the obligations
        outlined in this Agreement.
      </p>

      {/* 3. Service Access and Support */}
      <h2>3. Service Access and Support</h2>
      <h3>3.1. Description</h3>
      <p>
        The Docsynecx Platform is a hosted, cloud-based document processing system that enables
        Clients to extract structured data (&ldquo;Parsed Content&rdquo;) from uploaded files
        (&ldquo;Processed Documents&rdquo;) using customizable rules (&ldquo;Parsing Rules&rdquo;).
        Parsed Content can be downloaded directly or sent to integrated systems via External APIs.
      </p>
      <div className={s.noticeBox}>
        <p>
          <strong>Important:</strong> Docsynecx does not offer persistent data storage. By default,
          all Processed Documents, Content, and Parsed Content are retained for a maximum of 30
          calendar days. It is solely the Client&rsquo;s responsibility to back up all Processed
          Documents, Content, and Parsed Content. Docsynecx shall not be held liable for any loss of
          data.
        </p>
      </div>

      <h3>3.2. Access</h3>
      <p>
        Clients access the Service via a secure, individual Account. Account credentials must not be
        shared; each Account is assigned to a single user. The Client assumes full responsibility
        for all actions performed through their Account.
      </p>
      <p>
        To register, the Client must provide accurate, up-to-date information, including their full
        legal name, a valid email address, and any additional details required during signup. Based
        on the selected Subscribed Plan, Clients may configure one or more Document Parsers within
        their Account.
      </p>

      <h3>3.3. Support</h3>
      <p>
        Docsynecx aims to provide 24/7 access to the Service throughout the term of this Agreement,
        subject to routine maintenance and unforeseen outages.
      </p>
      <p>
        Customer support is available in English via email at{' '}
        <a href="mailto:support@docsynecx.com">support@docsynecx.com</a>. Clients may also consult
        helpful resources and self-service guides at{' '}
        <a href="https://docsynecx.com/help" target="_blank" rel="noopener noreferrer">
          docsynecx.com/help
        </a>
        .
      </p>

      {/* 4. Billing */}
      <h2>4. Billing</h2>
      <h3>4.1. Pricing</h3>
      <p>
        Docsynecx offers monthly and annual subscription plans, with pricing outlined on the official
        Pricing page. Except where otherwise stated, all prices are listed in U.S. dollars or
        euros, exclusive of applicable taxes, duties, or levies. Clients are responsible for any
        such taxes applicable in their jurisdiction.
      </p>

      <h3>4.2. Free Trials and Upgrade Plan</h3>
      <p>
        Clients may sign up for a 14-day free trial, which grants limited access to the Service at no
        cost. Only one free trial is permitted per Client. At any point during the trial, the Client
        may upgrade to a paid plan (a &ldquo;Subscribed Plan&rdquo;), which will take effect
        immediately and be charged accordingly. If the Client upgrades or downgrades their
        Subscribed Plan, the new pricing will take effect the day following the change. The billing
        cycle will remain the same, and any adjustments will be reflected on a prorated basis.
        Downgrading to the free plan or modifying a Subscribed Plan does not entitle the Client to a
        refund.
      </p>

      <h3>4.3. Payment</h3>
      <p>
        Payment for all Subscribed Plans must be made in advance via credit card, debit card or UPI
        using one of the accepted providers: Visa, Mastercard, or American Express. The Client must
        ensure valid payment details are provided and maintained throughout the term of the
        Agreement.
      </p>
      <p>
        The Client is billed either monthly or annually, based on the selected plan. Fees are
        non-refundable, regardless of actual usage. Service pauses or cancellations during an active
        billing period do not entitle the Client to refunds, extensions, or credits. Docsynecx does
        not issue refunds for unused time, mid-cycle plan changes, or inactive accounts.
      </p>

      <h3>4.4. Invoicing</h3>
      <p>
        For each successful transaction, Docsynecx will issue an email receipt. The Client may also
        access and download a PDF invoice from the &ldquo;Settings&rdquo; section of their Account.
      </p>

      <h3>4.5. Service of Changes and Pricing</h3>
      <p>
        Docsynecx reserves the right to modify, update, suspend, or discontinue the Service (in whole
        or in part), temporarily or permanently, at any time and without prior notice. Pricing for
        all Docsynecx Services, including monthly and annual Subscribed Plans, is subject to change.
        Any pricing updates will be communicated by publishing the changes on the official Docsynecx
        website (docsynecx.com), within the Docsynecx platform, or through the Service interface.
      </p>
      <p>
        Changes in pricing will not affect any active Subscribed Plans. Updated rates will only apply
        to new subscriptions or renewals made after the pricing changes take effect.
      </p>

      <h3>4.6. Billing Communications</h3>
      <p>
        You agree that Docsynecx may contact you at any time by email, push notifications, or other
        method with information relevant to your subscription, billing, and use of the Service.
      </p>

      {/* 5. Terms */}
      <h2>5. Terms</h2>
      <p>
        This Agreement becomes effective upon the Client&rsquo;s creation of an Account on the
        Docsynecx platform, including a free trial Account, and remains in effect until terminated
        by either Party.
      </p>
      <p>The minimum commitment period is:</p>
      <ul>
        <li>One (1) month for a monthly Subscribed Plan, and</li>
        <li>One (1) year for an annual Subscribed Plan.</li>
      </ul>
      <p>
        All Subscribed Plans automatically renew for successive terms of the same duration unless
        either Party provides notice of cancellation.
      </p>
      <p>
        To avoid renewal, cancellation must be made via email at least thirty (30) working days
        prior to the end of the current subscription term. Cancellation emails must be sent:
      </p>
      <ul>
        <li>
          <strong>By the Client:</strong> using the registered email address provided in their
          Account to <a href="mailto:support@docsynecx.com">support@docsynecx.com</a>.
        </li>
        <li>
          <strong>By Docsynecx:</strong> to the Client&rsquo;s registered email address or via
          support@docsynecx.com.
        </li>
      </ul>
      <p>
        It is the Client&rsquo;s sole responsibility to manage their renewal timelines. No refunds
        will be issued for amounts paid in advance, regardless of usage.
      </p>
      <p>
        Upon termination of the Agreement, all Content and Parsed Data will be automatically deleted
        from the Service. The Client acknowledges that once deleted, this data cannot be recovered.
      </p>

      {/* 6. Commitments of Docsynecx */}
      <h2>6. Responsibilities and Commitments of Docsynecx</h2>
      <p>
        Docsynecx commits to making commercially reasonable efforts to deliver uninterrupted Service,
        provided that:
      </p>
      <ul>
        <li>The Client has paid all applicable fees in full; and</li>
        <li>
          Interruptions, suspensions, or discontinuations caused by maintenance, third-party systems,
          or events outside Docsynecx&rsquo;s control are not grounds for liability.
        </li>
      </ul>
      <p>
        For scheduled maintenance, Docsynecx will make an effort to notify Clients in advance via
        email, the official docsynecx.com website, or within the application interface. Temporary
        service disruptions, regardless of cause or duration, do not entitle the Client to any
        compensation or indemnity.
      </p>
      <p>
        Any services not explicitly included in this Agreement, such as onboarding, training, or
        custom support, will require a separate agreement and may incur additional charges based on
        Docsynecx&rsquo;s prevailing rates.
      </p>

      {/* 7. Commitments of Client */}
      <h2>7. Responsibilities and Commitments of the Client</h2>
      <p>
        By entering into this Agreement on behalf of a company or other legal entity, the Client
        confirms that they have the authority to legally bind such entity and its affiliates. The
        Client must be a natural or legal person acting in a professional capacity. Automated
        entities, bots, or other non-human users are strictly prohibited.
      </p>
      <p>The Client agrees to:</p>
      <ul>
        <li>
          Acquire and maintain all necessary hardware, software, and internet connectivity required to
          access and use the Docsynecx Service. All related costs are the sole responsibility of the
          Client.
        </li>
        <li>
          Ensure appropriate training for the use of the Service and familiarity with internet-based
          technologies.
        </li>
        <li>
          Maintain the confidentiality and security of login credentials for the Account.
        </li>
        <li>
          Provide accurate information during registration and throughout the term of this Agreement
          and promptly update any changes.
        </li>
        <li>Pay all applicable fees in accordance with this Agreement.</li>
        <li>
          Respect Docsynecx&rsquo;s intellectual property rights and refrain from any infringement
          or misuse.
        </li>
        <li>
          Avoid any use of the Service that could impair its security, functionality, or
          availability.
        </li>
        <li>
          Not alter, hack, or attempt to simulate the Service or associate unrelated websites as being
          affiliated with Docsynecx.
        </li>
        <li>Not upload or transmit unsolicited messages, spam, or harmful content.</li>
        <li>
          Not copy, sell, resell, or exploit the Service without Docsynecx&rsquo;s prior written
          consent.
        </li>
        <li>
          Not transfer or store data through the Service that is:
          <ul>
            <li>Harmful, including viruses or malicious code;</li>
            <li>Illegal, immoral (e.g., pornographic or violent content);</li>
            <li>
              Infringing upon third-party rights, including intellectual property or privacy rights.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        The Client assumes full responsibility for any damages such data or conduct may cause to
        Docsynecx, third parties, or the Service. The Client agrees to indemnify and hold Docsynecx
        harmless from any claims arising from such data or misuse.
      </p>
      <p>
        While this Agreement prohibits abusive or illegal content, the Client acknowledges that
        Docsynecx cannot be held responsible for any Processed Documents or Parsed Content uploaded
        or generated via the Service. Use of the Service is strictly at the Client&rsquo;s own risk.
      </p>
      <p>
        Docsynecx reserves the right to remove any Processed Documents, Content, Parsed Content, or
        entire Accounts containing or linked to data it deems, in its sole discretion, to be unlawful,
        offensive, threatening, defamatory, pornographic, obscene, or otherwise in violation of any
        law, third-party rights, or the terms of this Agreement.
      </p>

      {/* 8. Liability */}
      <h2>8. Liability</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
        warranties, express or implied. Docsynecx makes no guarantees regarding the Client&rsquo;s
        organizational outcomes from the use of the Service. The Client acknowledges that the Service
        is a support tool, not a business decision-maker or process replacement.
      </p>
      <p>
        Use of the Service is at the Client&rsquo;s sole risk. The Client understands and agrees that:
      </p>
      <ul>
        <li>
          Technical processing and transmission may be unencrypted and involve transfers across
          various networks and may be adapted to meet the technical requirements of such networks or
          devices.
        </li>
        <li>
          Docsynecx does not warrant that:
          <ul>
            <li>The Service will meet the Client&rsquo;s specific needs;</li>
            <li>The Service will be uninterrupted, secure, or error-free;</li>
            <li>Results obtained through the Service will be accurate or reliable;</li>
            <li>Any content obtained will meet the Client&rsquo;s expectations;</li>
            <li>Any defects in the Service will be corrected.</li>
          </ul>
        </li>
      </ul>
      <p>
        By default, all Processed Documents, Content, and Parsed Content are retained for a maximum of
        30 calendar days and are not stored permanently. It is the Client&rsquo;s sole
        responsibility to store and back up their data.
      </p>
      <p>
        If the Client exceeds the usage limits of their Subscribed Plan, Docsynecx may suspend the
        Account until limits are reset or upgraded. Docsynecx is not liable for any loss resulting
        from such suspension.
      </p>
      <p>
        The Client also understands and accepts that:
      </p>
      <ul>
        <li>
          Docsynecx relies on third-party hosting and service providers to deliver the necessary
          infrastructure.
        </li>
        <li>
          While Docsynecx facilitates API integrations, the use of any External APIs is solely the
          Client&rsquo;s responsibility, including compliance with any separate agreements those APIs
          may require.
        </li>
      </ul>
      <p>Docsynecx disclaims all liability for:</p>
      <ul>
        <li>Service downgrades;</li>
        <li>Loss of data, features, or access resulting from Client actions;</li>
        <li>Changes in pricing or discontinuation of the Service;</li>
        <li>Damages resulting from Client&rsquo;s failure to maintain security protocols;</li>
        <li>The Client&rsquo;s configuration and application of Parsing Rules;</li>
        <li>Any use or misuse of Parsed Content by the Client.</li>
      </ul>
      <p>
        The Client agrees that Docsynecx shall not be liable for any direct, indirect, incidental,
        special, consequential, or exemplary damages, including but not limited to loss of profits,
        goodwill, data, or other intangible losses, even if advised of the possibility of such
        damages. This includes, but is not limited to, damages arising from:
      </p>
      <ul>
        <li>Use or inability to use the Service;</li>
        <li>Procurement of substitute services;</li>
        <li>Unauthorized access to or alteration of data;</li>
        <li>Actions of any third party on the Service;</li>
        <li>Any other matter related to the Service.</li>
      </ul>
      <p>
        <strong>Docsynecx&rsquo;s total liability under this Agreement is strictly limited to the
          amount paid by the Client for the current Subscribed Plan.</strong>
      </p>

      {/* 9. Termination */}
      <h2>9. Termination for Breach</h2>
      <p>
        Breach(es) of any of the terms and conditions of the Agreement by the Client will result in
        the termination of the Agreement and the closing of the Client&rsquo;s Account. Should the
        Client fail to remedy the said breach within seven (7) days from the suspension of their access
        to the Service, Docsynecx shall be fully entitled to terminate the Agreement with immediate
        effect and without prior notice.
      </p>
      <p>
        From the termination date, the Client will no longer be able to use the Service. The
        Client&rsquo;s Content and the Parsed Content relating to the Client&rsquo;s Account will be
        deleted without the Client being entitled to any compensation. The Client shall be solely
        responsible for the consequences of the termination of the Agreement, in particular in terms
        of continuity of its internal management and commercial activities.
      </p>
      <p>
        No amount received in advance by Docsynecx for the Subscribed Plan will be refunded and the
        Client shall not be entitled to any compensation whatsoever.
      </p>
      <p>
        Suspension of the Service and/or termination of this Agreement shall not prevent or otherwise
        impede the claim(s) Docsynecx may present as a result of the Client&rsquo;s breach(es).
      </p>

      {/* 10. IP Rights */}
      <h2>10. Intellectual Property Rights</h2>
      <h3>10.1. Docsynecx Ownership and Commitments</h3>
      <p>
        All intellectual property rights related to the Docsynecx platform, including but not limited
        to its software, features, design elements, and all content made available on the Docsynecx
        website (docsynecx.com) or within the Docsynecx application, remain the exclusive property of
        Docsynecx.
      </p>
      <p>
        Docsynecx warrants that it has developed the Docsynecx platform and holds all necessary
        intellectual property rights to the platform and all components used to deliver the service.
      </p>
      <p>
        Docsynecx does not claim any ownership over the documents or data that are uploaded,
        processed, or generated by the Client through the platform (Processed Documents and Content).
        These materials remain the sole property of the Client.
      </p>

      <h3>10.2. Client Ownership and Commitments</h3>
      <p>
        The Client retains full ownership of all Processed Documents, Content, and any Parsed Output
        generated through the use of the Docsynecx platform.
      </p>
      <p>
        The Client agrees not to engage in any activity that could infringe, impair, or otherwise
        adversely affect Docsynecx&rsquo;s intellectual property rights. This includes, but is not
        limited to, any misuse of the Docsynecx platform, its proprietary software, branding,
        trademarks, or logos.
      </p>
      <p>
        The Client shall indemnify and hold Docsynecx harmless from any third-party claims, demands,
        suits, or proceedings that allege the Client&rsquo;s Content, or the Client&rsquo;s use of the
        service in violation of this Agreement, infringes upon third-party intellectual property
        rights or violates applicable laws or regulations.
      </p>
      <p>
        This indemnity includes covering any damages awarded, and reasonable legal fees (including
        attorney&rsquo;s fees), provided that:
      </p>
      <ul>
        <li>Docsynecx promptly notifies the Client in writing of such claim;</li>
        <li>
          Docsynecx grants the Client sole control over the defense and settlement of the claim
          (subject to the condition that any settlement fully and unconditionally releases Docsynecx
          from liability); and
        </li>
        <li>
          Docsynecx provides reasonable assistance as needed, at the Client&rsquo;s expense.
        </li>
      </ul>

      {/* 11. Collected Data */}
      <h2>11. Collected Data</h2>
      <p>
        When registering for and using the Docsynecx platform, Docsynecx collects a limited amount of
        data from the Client on a voluntary basis. This may include Personal Data and is used solely
        for the purpose of providing, maintaining, and improving the Docsynecx platform and related
        services.
      </p>
      <p>
        All collected data is handled in accordance with our{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>, which forms an integral part of this
        Agreement.
      </p>

      {/* 12. Privacy */}
      <h2>12. Privacy</h2>
      <p>
        The Client has the right to access, update, modify, or request the deletion of any personal
        data held by Docsynecx. Such requests may be submitted via email to:{' '}
        <a href="mailto:privacy@docsynecx.com">privacy@docsynecx.com</a>.
      </p>
      <p>
        For full details on how we process and protect your data, please refer to our{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>, which is incorporated into this Agreement.
      </p>

      {/* 15. Confidentiality */}
      <h2>15. Confidentiality</h2>
      <p>
        Both Docsynecx and the Client agree to treat as confidential all non-public information
        disclosed by either party in connection with the Agreement. This includes, but is not limited
        to, business processes, technical information, documentation, and other proprietary
        materials.
      </p>
      <p>
        This confidentiality obligation does not prevent Docsynecx from referencing the Client&rsquo;s
        name and the nature of the services provided for marketing and commercial reference purposes.
      </p>

      {/* 16. Force Majeure */}
      <h2>16. Force Majeure</h2>
      <p>
        Docsynecx employs reasonable technical measures to ensure the availability and performance of
        its platform. However, Docsynecx shall not be held liable for service interruptions resulting
        from force majeure events, including but not limited to: natural disasters, power outages,
        network failures, strikes, public telecommunication issues, or internet disruptions beyond
        Docsynecx&rsquo;s control.
      </p>
      <p>
        In such events, the Client waives any right to compensation, indemnification, or claims
        related to service unavailability.
      </p>

      {/* 17. Miscellaneous */}
      <h2>17. Miscellaneous</h2>
      <p>
        Docsynecx may, at its discretion and without prior notice, assign, subcontract, transfer, or
        delegate any part of this Agreement and its rights or obligations to a third party.
      </p>
      <p>
        This Agreement constitutes the complete and exclusive agreement between the parties,
        superseding any previous communications or agreements relating to its subject matter.
      </p>
      <p>
        Failure by either party to enforce any provision of this Agreement shall not be interpreted as
        a waiver of that party&rsquo;s right to enforce such provision in the future.
      </p>
      <p>
        The Client authorizes Docsynecx to publicly reference the Client&rsquo;s name and services
        provided for commercial purposes, such as marketing or case studies.
      </p>

      {/* 18. Governing Law */}
      <h2>18. Governing Law and Jurisdiction</h2>
      <p>
        This Agreement shall be governed by and construed in accordance with the laws of India,
        without regard to any conflict of law provisions. Any disputes arising under or in connection
        with this Agreement shall be subject to the exclusive jurisdiction of the courts of India.
      </p>
    </LegalPageLayout>
  );
}
