import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, Phone, Clock, MapPin, MessageSquare, Headphones, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact PUXX Ireland - Get in Touch',
  description:
    'Have questions about our nicotine pouches? Contact PUXX Ireland for product information, delivery questions, or customer support. We\'re here to help!',
  keywords: 'contact PUXX Ireland, customer support, nicotine pouches help, PUXX contact',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[500px] lg:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-banner.jpg"
            alt="Contact PUXX Ireland - Premium Nicotine Pouch Support"
            fill
            priority
            className="object-cover object-center"
            quality={90}
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading tracking-tight text-white leading-[1.1] mb-8">
              Contact <span className="text-green-400">PUXX</span>
            </h1>
            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              Have questions? We're here to help you find the perfect nicotine pouches
            </p>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-white" />
                <span className="font-medium">24hr Response</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-white" />
                <span className="font-medium">Expert Support</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-white" />
                <span className="font-medium">Ireland-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards - Above the fold */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl gradient-emerald mb-6">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email anytime, we'll respond within 24 hours
              </p>
              <a
                href="mailto:hello@puxxnicotine.ie"
                className="text-lg font-semibold text-primary hover:text-green-700 hover:underline inline-flex items-center gap-2"
              >
                hello@puxxnicotine.ie
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl gradient-emerald mb-6">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">Call Us</h3>
              <p className="text-muted-foreground mb-4">
                Monday - Friday, 9:00 AM - 6:00 PM IST
              </p>
              <a
                href="tel:+35312345678"
                className="text-lg font-semibold text-primary hover:text-green-700 hover:underline inline-flex items-center gap-2"
              >
                +353 1 234 5678
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl gradient-emerald mb-6">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">Location</h3>
              <p className="text-muted-foreground mb-4">
                Serving all of Ireland with fast nationwide delivery
              </p>
              <p className="text-lg font-semibold text-primary">
                Dublin, Ireland
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Side - Contact Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
                  Send us a Message
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours during business days.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <ContactForm />
              </div>
            </div>

            {/* Right Side - Additional Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Response Time Highlight */}
              <div className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-8 text-white">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-heading mb-3">Quick Response</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We typically respond to all inquiries within <span className="font-bold">24 hours</span> during business days. For urgent matters, please call us directly.
                </p>
              </div>

              {/* Quick Help Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-heading text-foreground mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Shipping:</span> Free delivery on orders over €30
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Returns:</span> 30-day return policy on all products
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Age Requirement:</span> Must be 18+ to purchase
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Payment:</span> Secure checkout with multiple options
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-heading text-foreground mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-foreground">Monday - Friday</span>
                    <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-foreground">Saturday</span>
                    <span className="text-sm text-muted-foreground">Closed</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-foreground">Sunday</span>
                    <span className="text-sm text-muted-foreground">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  All times are in Irish Standard Time (IST)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Can Help Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              How Can We Help You?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team is ready to assist you with any questions or concerns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Questions */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">Product Questions</h3>
              <p className="text-muted-foreground">
                Learn about our 14 flavors, nicotine strengths, ingredients, and find the perfect pouch for you
              </p>
            </div>

            {/* Order Support */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">Order Support</h3>
              <p className="text-muted-foreground">
                Track your shipment, manage orders, process returns, or get help with any delivery questions
              </p>
            </div>

            {/* General Inquiries */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3 text-foreground">General Inquiries</h3>
              <p className="text-muted-foreground">
                Partnership opportunities, bulk orders, retail questions, or any other business inquiries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Callout Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-irish p-12 lg:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4">
                Looking for Quick Answers?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Check out our FAQ page for instant answers to common questions about our products, shipping, and more
              </p>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white text-primary hover:bg-white/90 transition-all shadow-lg"
              >
                Visit FAQ Page
              </a>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
