'use client';

import { PageHeader } from '@/components/static-pages/page-header';
import { Breadcrumbs } from '@/components/static-pages/breadcrumbs';
import { TableOfContents } from '@/components/static-pages/table-of-contents';

const tocItems = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'data-controller', title: 'Data Controller' },
  { id: 'data-collection', title: 'Data We Collect' },
  { id: 'purpose', title: 'Purpose of Processing' },
  { id: 'legal-basis', title: 'Legal Basis' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'security', title: 'Data Security' },
  { id: 'international', title: 'International Transfers' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'changes', title: 'Policy Updates' },
  { id: 'contact', title: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we protect your personal data."
        lastUpdated="December 12, 2025"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents items={tocItems} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 prose prose-lg max-w-none print:border-0 print:shadow-none">
              <div className="not-prose mb-8 p-4 bg-primary/10 border-l-4 border-primary rounded">
                <p className="text-sm text-foreground mb-0">
                  <strong>GDPR Compliance:</strong> This privacy policy is compliant with the EU
                  General Data Protection Regulation (GDPR) and Irish data protection laws. We are
                  committed to protecting your privacy and handling your personal data responsibly.
                </p>
              </div>

              {/* 1. Introduction */}
              <section id="introduction" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  PUXX Ireland ("we," "us," or "our") is committed to protecting your privacy and
                  ensuring the security of your personal data. This Privacy Policy explains how we
                  collect, use, store, and protect your personal information when you use our
                  website and purchase our products.
                </p>
                <p className="text-muted-foreground">
                  By using our website or services, you consent to the collection and use of your
                  personal data as described in this policy. If you do not agree with this policy,
                  please do not use our website or services.
                </p>
              </section>

              {/* 2. Data Controller */}
              <section id="data-controller" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">2. Data Controller</h2>
                <p className="text-muted-foreground mb-4">
                  PUXX Ireland is the data controller responsible for your personal data. You can
                  contact us at:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 not-prose mb-4">
                  <p className="text-foreground font-semibold mb-2">PUXX Ireland</p>
                  <p className="text-muted-foreground mb-1">Email: hello@puxxnicotine.ie</p>
                  <p className="text-muted-foreground mb-1">
                    Data Protection Officer: privacy@puxxnicotine.ie
                  </p>
                  <p className="text-muted-foreground">Phone: +353 1 234 5678</p>
                </div>
              </section>

              {/* 3. Data We Collect */}
              <section id="data-collection" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  3. Personal Data We Collect
                </h2>
                <p className="text-muted-foreground mb-4">
                  We collect and process the following types of personal data:
                </p>

                <h3 className="text-xl font-heading text-foreground mb-3">
                  3.1 Information You Provide
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Account Information:</strong> Name, email
                    address, password, date of birth (for age verification)
                  </li>
                  <li>
                    <strong className="text-foreground">Contact Information:</strong> Phone number,
                    billing address, shipping address
                  </li>
                  <li>
                    <strong className="text-foreground">Order Information:</strong> Purchase
                    history, product preferences, order details
                  </li>
                  <li>
                    <strong className="text-foreground">Payment Information:</strong> Credit/debit
                    card details (processed securely by our payment provider)
                  </li>
                  <li>
                    <strong className="text-foreground">Communications:</strong> Customer service
                    inquiries, reviews, feedback
                  </li>
                </ul>

                <h3 className="text-xl font-heading text-foreground mb-3">
                  3.2 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Device Information:</strong> IP address,
                    browser type, operating system, device identifiers
                  </li>
                  <li>
                    <strong className="text-foreground">Usage Data:</strong> Pages visited, time
                    spent on site, clicks, search queries
                  </li>
                  <li>
                    <strong className="text-foreground">Cookies:</strong> See our Cookies section
                    below for details
                  </li>
                  <li>
                    <strong className="text-foreground">Location Data:</strong> Approximate
                    location based on IP address
                  </li>
                </ul>

                <h3 className="text-xl font-heading text-foreground mb-3">
                  3.3 Age Verification Data
                </h3>
                <p className="text-muted-foreground">
                  To comply with legal requirements, we collect and verify age information to
                  ensure all customers are 18 years or older. This may include date of birth and
                  government-issued ID verification.
                </p>
              </section>

              {/* 4. Purpose of Processing */}
              <section id="purpose" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  4. Purpose of Data Processing
                </h2>
                <p className="text-muted-foreground mb-4">We use your personal data for:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Order Processing:</strong> Fulfilling your
                    orders, processing payments, arranging delivery
                  </li>
                  <li>
                    <strong className="text-foreground">Age Verification:</strong> Ensuring
                    compliance with legal age restrictions for nicotine products
                  </li>
                  <li>
                    <strong className="text-foreground">Customer Service:</strong> Responding to
                    inquiries, handling returns, providing support
                  </li>
                  <li>
                    <strong className="text-foreground">Marketing:</strong> Sending promotional
                    emails, newsletters, special offers (with your consent)
                  </li>
                  <li>
                    <strong className="text-foreground">Website Improvement:</strong> Analyzing
                    usage patterns, improving user experience, testing features
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Compliance:</strong> Meeting
                    regulatory requirements, preventing fraud, protecting rights
                  </li>
                  <li>
                    <strong className="text-foreground">Account Management:</strong> Creating and
                    maintaining your account, personalizing your experience
                  </li>
                </ul>
              </section>

              {/* 5. Legal Basis */}
              <section id="legal-basis" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  5. Legal Basis for Processing (GDPR Article 6)
                </h2>
                <p className="text-muted-foreground mb-4">
                  We process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Contract Performance:</strong> Processing
                    necessary to fulfill our contract with you (order processing, delivery)
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Obligation:</strong> Age verification
                    and compliance with nicotine product regulations
                  </li>
                  <li>
                    <strong className="text-foreground">Consent:</strong> Marketing communications
                    (you can withdraw consent at any time)
                  </li>
                  <li>
                    <strong className="text-foreground">Legitimate Interests:</strong> Website
                    analytics, fraud prevention, business operations
                  </li>
                </ul>
              </section>

              {/* 6. Data Retention */}
              <section id="data-retention" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground mb-4">We retain your personal data for:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Account Data:</strong> As long as your
                    account is active, or as needed to provide services
                  </li>
                  <li>
                    <strong className="text-foreground">Order Data:</strong> 7 years for tax and
                    accounting purposes (Irish legal requirement)
                  </li>
                  <li>
                    <strong className="text-foreground">Marketing Data:</strong> Until you
                    unsubscribe or withdraw consent
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Data:</strong> As required by law or
                    to resolve disputes
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  After the retention period, we securely delete or anonymize your personal data.
                </p>
              </section>

              {/* 7. Data Sharing */}
              <section id="data-sharing" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  7. Data Sharing and Third Parties
                </h2>
                <p className="text-muted-foreground mb-4">
                  We may share your personal data with trusted third parties:
                </p>

                <h3 className="text-xl font-heading text-foreground mb-3">
                  7.1 Service Providers
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Payment Processors:</strong> Worldpay (payment processing)
                    (for secure payment processing)
                  </li>
                  <li>
                    <strong className="text-foreground">Shipping Partners:</strong> An Post, DPD,
                    courier services (for delivery)
                  </li>
                  <li>
                    <strong className="text-foreground">Email Services:</strong> Mailchimp,
                    SendGrid (for newsletters and transactional emails)
                  </li>
                  <li>
                    <strong className="text-foreground">Analytics:</strong> Google Analytics (for
                    website usage analysis)
                  </li>
                  <li>
                    <strong className="text-foreground">Customer Support:</strong> Zendesk,
                    Intercom (for customer service)
                  </li>
                </ul>

                <h3 className="text-xl font-heading text-foreground mb-3">7.2 Legal Requirements</h3>
                <p className="text-muted-foreground mb-4">
                  We may disclose your data if required by law, court order, or to protect our
                  rights, property, or safety.
                </p>

                <p className="text-muted-foreground">
                  <strong className="text-foreground">Data Processing Agreements:</strong> All
                  third-party service providers are contractually obligated to protect your data
                  and use it only for specified purposes.
                </p>
              </section>

              {/* 8. Your Rights */}
              <section id="your-rights" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  8. Your Data Protection Rights
                </h2>
                <p className="text-muted-foreground mb-4">
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-3">
                  <li>
                    <strong className="text-foreground">Right to Access:</strong> Request a copy of
                    the personal data we hold about you
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Rectification:</strong> Correct
                    inaccurate or incomplete personal data
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Erasure ("Right to be Forgotten"):</strong>{' '}
                    Request deletion of your personal data (subject to legal retention requirements)
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Data Portability:</strong> Receive
                    your data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Object:</strong> Object to
                    processing based on legitimate interests or for direct marketing
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Restrict Processing:</strong>{' '}
                    Request limitation of processing in certain circumstances
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Withdraw Consent:</strong>{' '}
                    Withdraw consent for marketing or other consent-based processing
                  </li>
                  <li>
                    <strong className="text-foreground">Right to Complain:</strong> Lodge a
                    complaint with the Irish Data Protection Commission
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  To exercise these rights, contact us at privacy@puxxnicotine.ie. We will respond within
                  30 days.
                </p>
              </section>

              {/* 9. Cookies */}
              <section id="cookies" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">9. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to improve your experience on our
                  website:
                </p>

                <h3 className="text-xl font-heading text-foreground mb-3">9.1 Types of Cookies</h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <strong className="text-foreground">Essential Cookies:</strong> Required for
                    website functionality, shopping cart, checkout
                  </li>
                  <li>
                    <strong className="text-foreground">Performance Cookies:</strong> Analyze
                    website usage, improve performance (Google Analytics)
                  </li>
                  <li>
                    <strong className="text-foreground">Functional Cookies:</strong> Remember your
                    preferences, login status
                  </li>
                  <li>
                    <strong className="text-foreground">Marketing Cookies:</strong> Track
                    advertising effectiveness, personalize ads (with consent)
                  </li>
                </ul>

                <h3 className="text-xl font-heading text-foreground mb-3">9.2 Managing Cookies</h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. However, disabling
                  essential cookies may affect website functionality. Visit{' '}
                  <a
                    href="https://www.aboutcookies.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    aboutcookies.org
                  </a>{' '}
                  for guidance.
                </p>
              </section>

              {/* 10. Security */}
              <section id="security" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">10. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures to protect your personal data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>256-bit SSL encryption for all data transmission</li>
                  <li>Secure password hashing and encryption</li>
                  <li>PCI DSS compliant payment processing</li>
                  <li>Regular security audits and vulnerability testing</li>
                  <li>Access controls and employee training</li>
                  <li>Secure data storage with encryption at rest</li>
                </ul>
                <p className="text-muted-foreground">
                  While we take all reasonable precautions, no method of transmission over the
                  internet is 100% secure. We cannot guarantee absolute security but commit to
                  promptly notifying you of any data breaches as required by GDPR.
                </p>
              </section>

              {/* 11. International Transfers */}
              <section id="international" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  11. International Data Transfers
                </h2>
                <p className="text-muted-foreground mb-4">
                  Your personal data is primarily stored and processed within the European Economic
                  Area (EEA). If we transfer data outside the EEA, we ensure:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>The country has an adequacy decision from the EU Commission, or</li>
                  <li>
                    We use Standard Contractual Clauses (SCCs) approved by the EU Commission, or
                  </li>
                  <li>The recipient is Privacy Shield certified (where applicable)</li>
                </ul>
              </section>

              {/* 12. Children's Privacy */}
              <section id="children" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">12. Children's Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Our products and services are strictly for adults aged 18 and over. We do not
                  knowingly collect personal data from individuals under 18.
                </p>
                <p className="text-muted-foreground">
                  If we discover we have inadvertently collected data from someone under 18, we
                  will delete it immediately. If you believe we have collected data from a minor,
                  please contact us at privacy@puxxnicotine.ie.
                </p>
              </section>

              {/* 13. Changes */}
              <section id="changes" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  13. Updates to This Policy
                </h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices, legal requirements, or services. We will:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Update the "Last Updated" date at the top of this page</li>
                  <li>Notify you of material changes via email or website notification</li>
                  <li>Obtain your consent if required by law</li>
                </ul>
                <p className="text-muted-foreground">
                  We encourage you to review this policy periodically to stay informed about how we
                  protect your data.
                </p>
              </section>

              {/* 14. Contact */}
              <section id="contact" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">14. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  For questions, concerns, or to exercise your data protection rights, contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 not-prose mb-4">
                  <p className="text-foreground font-semibold mb-2">PUXX Ireland - Data Protection</p>
                  <p className="text-muted-foreground mb-1">Email: privacy@puxxnicotine.ie</p>
                  <p className="text-muted-foreground mb-1">General Inquiries: hello@puxxnicotine.ie</p>
                  <p className="text-muted-foreground mb-1">Phone: +353 1 234 5678</p>
                  <p className="text-muted-foreground">Response Time: Within 30 days</p>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Irish Data Protection Commission:
                  </strong>{' '}
                  If you're not satisfied with our response, you can lodge a complaint with the
                  Data Protection Commission at{' '}
                  <a
                    href="https://www.dataprotection.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.dataprotection.ie
                  </a>
                </p>
              </section>

              {/* Print Button */}
              <div className="not-prose mt-12 pt-8 border-t border-border print:hidden">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Print Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header,
          footer,
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
