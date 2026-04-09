'use client';

import { PageHeader } from '@/components/static-pages/page-header';
import { Breadcrumbs } from '@/components/static-pages/breadcrumbs';
import { TableOfContents } from '@/components/static-pages/table-of-contents';

const tocItems = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'age-restriction', title: 'Age Restriction' },
  { id: 'products', title: 'Product Information' },
  { id: 'pricing', title: 'Pricing and Payment' },
  { id: 'shipping', title: 'Shipping and Delivery' },
  { id: 'returns', title: 'Returns and Refunds' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Information' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services"
        lastUpdated="December 12, 2025"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents items={tocItems} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 prose prose-lg max-w-none print:border-0 print:shadow-none">
              <div className="not-prose mb-8 p-4 bg-muted/50 border-l-4 border-primary rounded">
                <p className="text-sm text-muted-foreground mb-0">
                  <strong className="text-foreground">Important:</strong> These Terms and
                  Conditions govern your use of PUXX Ireland's website and services. By accessing
                  or using our website, you agree to be bound by these terms.
                </p>
              </div>

              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using the PUXX Ireland website ("Website") and purchasing our
                  products, you accept and agree to be bound by these Terms and Conditions. If you
                  do not agree to these terms, please do not use our Website or purchase our
                  products.
                </p>
                <p className="text-muted-foreground">
                  These terms apply to all visitors, users, and customers of PUXX Ireland
                  ("Company," "we," "us," or "our").
                </p>
              </section>

              {/* 2. Age Restriction */}
              <section id="age-restriction" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  2. Age Restriction (18+ Only)
                </h2>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">
                    Our products are strictly for adults aged 18 years and over.
                  </strong>{' '}
                  By using this Website and purchasing our products, you confirm that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>You are at least 18 years of age</li>
                  <li>You are legally permitted to purchase nicotine products in Ireland</li>
                  <li>
                    You will not provide our products to anyone under the legal purchasing age
                  </li>
                  <li>You understand the risks associated with nicotine use</li>
                </ul>
                <p className="text-muted-foreground">
                  We reserve the right to verify your age at any time and may refuse service or
                  cancel orders if we cannot verify that you meet the minimum age requirement. We
                  employ strict age verification measures at checkout and upon delivery.
                </p>
              </section>

              {/* 3. Product Information */}
              <section id="products" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  3. Product Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  We strive to provide accurate product descriptions, images, and information on
                  our Website. However:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    Product images are for illustration purposes and may differ slightly from the
                    actual product
                  </li>
                  <li>
                    We do not warrant that product descriptions or other content is accurate,
                    complete, or error-free
                  </li>
                  <li>All products contain nicotine, which is an addictive substance</li>
                  <li>Products are tobacco-free but are not risk-free</li>
                  <li>
                    Nicotine products are not suitable for pregnant or breastfeeding women, or
                    those with certain health conditions
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  We reserve the right to discontinue any product at any time without notice.
                </p>
              </section>

              {/* 4. Pricing and Payment */}
              <section id="pricing" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  4. Pricing and Payment
                </h2>
                <p className="text-muted-foreground mb-4">
                  All prices on our Website are in Euro (€) and include VAT unless otherwise
                  stated. We reserve the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Change prices at any time without prior notice</li>
                  <li>Correct pricing errors on our Website or in orders</li>
                  <li>Cancel orders placed at incorrect prices</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Payment Terms:</strong>
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Payment must be made in full at the time of order</li>
                  <li>We accept major credit cards, debit cards, and other payment methods</li>
                  <li>All transactions are processed through secure payment gateways</li>
                  <li>We do not store your full payment card details</li>
                  <li>
                    By providing payment information, you authorize us to charge the total amount
                    for your order
                  </li>
                </ul>
              </section>

              {/* 5. Shipping and Delivery */}
              <section id="shipping" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  5. Shipping and Delivery
                </h2>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Shipping to Ireland:</strong>
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>We currently ship to addresses within the Republic of Ireland only</li>
                  <li>Standard shipping takes 3-5 business days</li>
                  <li>Free shipping on orders over €150</li>
                  <li>Express shipping options are available at checkout</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Age Verification at Delivery:</strong>
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    All deliveries require age verification and signature from someone aged 18+
                  </li>
                  <li>
                    Delivery personnel may request valid photo ID to verify age before handing over
                    the package
                  </li>
                  <li>If no one aged 18+ is available, delivery will be reattempted or returned</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Shipping Times:</strong>
                </p>
                <p className="text-muted-foreground">
                  Estimated delivery times are not guaranteed. We are not responsible for delays
                  caused by shipping carriers, customs, weather conditions, or other circumstances
                  beyond our control.
                </p>
              </section>

              {/* 6. Returns and Refunds */}
              <section id="returns" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  6. Returns and Refunds
                </h2>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">30-Day Return Policy:</strong>
                </p>
                <p className="text-muted-foreground mb-4">
                  You may return unopened products within 30 days of delivery for a full refund or
                  exchange. To be eligible for a return:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Products must be unopened and in original packaging</li>
                  <li>Products must be in resalable condition</li>
                  <li>You must provide proof of purchase</li>
                  <li>Return shipping costs are the customer's responsibility</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Non-Returnable Items:</strong>
                </p>
                <p className="text-muted-foreground mb-4">
                  For health and safety reasons, opened nicotine pouches cannot be returned or
                  exchanged.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Damaged or Defective Products:</strong>
                </p>
                <p className="text-muted-foreground">
                  If you receive damaged or defective products, please contact us within 48 hours
                  of delivery at hello@puxxnicotine.ie with photos of the damage. We will arrange a
                  replacement or full refund at no cost to you.
                </p>
              </section>

              {/* 7. Limitation of Liability */}
              <section id="liability" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground mb-4">
                  To the maximum extent permitted by Irish law:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    We are not liable for any indirect, incidental, or consequential damages
                    arising from your use of our products or Website
                  </li>
                  <li>
                    Our total liability shall not exceed the amount you paid for the specific
                    product(s) giving rise to the claim
                  </li>
                  <li>
                    We are not responsible for health issues, addiction, or other consequences
                    resulting from nicotine use
                  </li>
                  <li>
                    Users are responsible for understanding the risks associated with nicotine
                    products
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Health Warning:</strong> Our products contain
                  nicotine, which is an addictive substance. Nicotine can harm your health and is
                  not recommended for non-smokers, pregnant women, or those with heart conditions.
                  Consult your doctor if you have concerns.
                </p>
              </section>

              {/* 8. Intellectual Property */}
              <section id="intellectual-property" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  8. Intellectual Property
                </h2>
                <p className="text-muted-foreground mb-4">
                  All content on this Website, including text, graphics, logos, images, and
                  software, is the property of PUXX Ireland or its content suppliers and is
                  protected by Irish and international copyright laws.
                </p>
                <p className="text-muted-foreground">
                  You may not reproduce, distribute, modify, or create derivative works from any
                  content on this Website without our express written permission.
                </p>
              </section>

              {/* 9. Governing Law */}
              <section id="governing-law" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms and Conditions are governed by and construed in accordance with the
                  laws of the Republic of Ireland. Any disputes arising from these terms or your
                  use of our Website shall be subject to the exclusive jurisdiction of the Irish
                  courts.
                </p>
                <p className="text-muted-foreground">
                  If any provision of these terms is found to be invalid or unenforceable, the
                  remaining provisions shall remain in full force and effect.
                </p>
              </section>

              {/* 10. Changes to Terms */}
              <section id="changes" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  10. Changes to These Terms
                </h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to update or modify these Terms and Conditions at any time
                  without prior notice. Changes will be effective immediately upon posting to this
                  page. The "Last Updated" date at the top of this page indicates when these terms
                  were last revised.
                </p>
                <p className="text-muted-foreground">
                  Your continued use of our Website after any changes constitutes acceptance of the
                  new terms. We encourage you to review these terms periodically.
                </p>
              </section>

              {/* 11. Contact Information */}
              <section id="contact" className="mb-8 scroll-mt-24">
                <h2 className="text-2xl font-heading text-foreground mb-4">
                  11. Contact Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 not-prose">
                  <p className="text-foreground font-semibold mb-2">PUXX Ireland</p>
                  <p className="text-muted-foreground mb-1">Email: hello@puxxnicotine.ie</p>
                  <p className="text-muted-foreground mb-1">Phone: +353 1 234 5678</p>
                  <p className="text-muted-foreground">
                    Customer Service Hours: Monday-Friday 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </section>

              {/* Print Button */}
              <div className="not-prose mt-12 pt-8 border-t border-border print:hidden">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Print Terms & Conditions
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
