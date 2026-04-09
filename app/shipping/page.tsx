import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck,
  Package,
  RotateCcw,
  MapPin,
  Clock,
  Shield,
  Mail,
  CheckCircle,
  AlertTriangle,
  FileText,
  Phone,
  Calendar,
  PackageCheck,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Shipping & Returns | PUXX Ireland - Delivery Information',
  description:
    'Fast delivery across Ireland. Standard shipping €5.99 (3-5 days), Express €9.99 (1-2 days). Free shipping over €150. 30-day return policy on unopened products.',
  keywords: 'PUXX Ireland shipping, nicotine pouch delivery, Ireland delivery, returns policy, An Post, DPD Ireland',
  openGraph: {
    title: 'Shipping & Returns - PUXX Ireland',
    description: 'Fast, reliable delivery across Ireland with hassle-free returns',
  },
};

const shippingOptions = [
  {
    icon: Truck,
    title: 'Standard Shipping',
    price: '€5.99',
    description: '3-5 business days',
    features: [
      'Delivery to all Ireland addresses',
      'Email tracking provided',
      'Signature required on delivery',
      'Free on orders over €150',
    ],
  },
  {
    icon: Package,
    title: 'Express Shipping',
    price: '€9.99',
    description: '1-2 business days',
    features: [
      'Priority handling & dispatch',
      'Expedited delivery service',
      'Full tracking included',
      'Same day dispatch available',
    ],
  },
];

const deliveryPartners = [
  {
    name: 'An Post',
    description: "Ireland's trusted national postal service with nationwide coverage",
  },
  {
    name: 'DPD Ireland',
    description: 'Express parcel delivery with real-time tracking and SMS updates',
  },
];

const returnRequirements = [
  {
    icon: PackageCheck,
    title: 'Unopened Products',
    description: 'Items must be completely unopened and unused',
  },
  {
    icon: Package,
    title: 'Original Packaging',
    description: 'Products must be in original, undamaged packaging',
  },
  {
    icon: Calendar,
    title: '30-Day Window',
    description: 'Returns must be initiated within 30 days of delivery',
  },
  {
    icon: FileText,
    title: 'Proof of Purchase',
    description: 'Order confirmation or receipt required',
  },
];

const deliveryRegions = [
  { region: 'Dublin & Leinster', time: '1-2 business days (Express) / 3-4 business days (Standard)' },
  { region: 'Cork & Munster', time: '1-2 business days (Express) / 3-5 business days (Standard)' },
  { region: 'Galway & Connacht', time: '2-3 business days (Express) / 4-5 business days (Standard)' },
  { region: 'Remote Areas', time: 'May require additional 1-2 days' },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[500px] lg:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-banner.jpg"
            alt="PUXX Ireland Shipping & Returns - Fast Delivery Across Ireland"
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
              Shipping & Returns for <span className="text-green-400">PUXX</span>
            </h1>
            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              Fast, secure delivery across Ireland with hassle-free returns
            </p>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-white" />
                <span className="font-medium">Free Over €150</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-white" />
                <span className="font-medium">1-5 Day Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-6 w-6 text-white" />
                <span className="font-medium">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shipping Information Section */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-6">
              Shipping Information
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver premium nicotine pouches to every corner of Ireland with tracked, secure shipping
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-background border-2 border-primary/20 rounded-2xl p-8 lg:p-10 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading text-foreground mb-2">{option.title}</h3>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary">{option.price}</span>
                  <span className="text-lg text-muted-foreground">• {option.description}</span>
                </div>
                <ul className="space-y-3 mt-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-background border-2 border-primary/10 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-3">All of Ireland</h3>
              <p className="text-muted-foreground">
                Delivery to every address in the Republic of Ireland
              </p>
            </div>

            <div className="bg-background border-2 border-primary/10 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-3">1-2 Business Days</h3>
              <p className="text-muted-foreground">
                Order processing time before dispatch
              </p>
            </div>

            <div className="bg-background border-2 border-primary/10 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-3">Email Tracking</h3>
              <p className="text-muted-foreground">
                Track your order every step of the way
              </p>
            </div>
          </div>

          {/* Delivery Partners */}
          <div className="bg-muted/30 rounded-3xl p-10 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-heading text-foreground text-center mb-10">
              Our Trusted Delivery Partners
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {deliveryPartners.map((partner, index) => (
                <div key={index} className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-colors">
                  <h4 className="text-2xl font-bold text-primary mb-3">{partner.name}</h4>
                  <p className="text-muted-foreground">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Estimated Delivery Times by Region */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-6">
              Delivery Times by Region
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estimated delivery times once your order has been dispatched
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-background border-2 border-primary/10 rounded-2xl overflow-hidden">
              {deliveryRegions.map((region, index) => (
                <div
                  key={index}
                  className={`p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                    index !== deliveryRegions.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg font-heading text-foreground">{region.region}</span>
                  </div>
                  <span className="text-base text-muted-foreground sm:text-right">{region.time}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              * Times are estimates and may vary during peak seasons or adverse weather conditions
            </p>
          </div>
        </section>

        {/* Delivery Process & Requirements */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-6">
              Delivery Information
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Age Verification */}
            <div className="bg-background border-2 border-amber-500/30 rounded-2xl p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading text-foreground mb-2">Age Verification Required</h3>
                  <p className="text-base text-muted-foreground">You must be 18+ to receive delivery</p>
                </div>
              </div>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Adult signature required on delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Valid photo ID may be requested</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>If unavailable, parcel will be returned to depot</span>
                </li>
              </ul>
            </div>

            {/* Delivery Restrictions */}
            <div className="bg-background border-2 border-border rounded-2xl p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <XCircle className="h-7 w-7 text-destructive" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading text-foreground mb-2">Delivery Restrictions</h3>
                  <p className="text-base text-muted-foreground">Please note these limitations</p>
                </div>
              </div>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>No P.O. Box delivery</strong> - Physical address required</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span><strong>Ireland only</strong> - No international shipping</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Re-delivery available</strong> if you're not home</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 lg:p-10">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-heading text-foreground mb-4">Important Notices</h3>
                <div className="space-y-3 text-base text-muted-foreground">
                  <p className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Peak Season Delays:</strong> During busy periods (Christmas, holidays), delivery may take 1-2 additional days</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Weather Delays:</strong> Severe weather conditions may affect delivery schedules</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Tracking Issues?</strong> Contact us at <a href="mailto:hello@puxxnicotine.ie" className="text-primary hover:underline font-semibold">hello@puxxnicotine.ie</a> or call <a href="tel:+35312345678" className="text-primary hover:underline font-semibold">+353 1 234 5678</a></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy Section */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-primary to-green-600 rounded-full mx-auto mb-6">
              <RotateCcw className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-6">
              30-Day Returns Policy
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Changed your mind? We offer hassle-free returns within 30 days of delivery
            </p>
          </div>

          {/* Return Requirements */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {returnRequirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-background border-2 border-primary/20 rounded-2xl p-8 text-center hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <requirement.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{requirement.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{requirement.description}</p>
              </div>
            ))}
          </div>

          {/* Return vs No Return */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Eligible for Return */}
            <div className="bg-background border-2 border-primary/50 rounded-2xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-heading text-foreground">Eligible for Return</h3>
              </div>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unopened nicotine pouches in original packaging</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Products in unused, resalable condition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Returned within 30 days of delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Defective or damaged items (free return shipping)</span>
                </li>
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="bg-background border-2 border-destructive/50 rounded-2xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-destructive rounded-full flex items-center justify-center">
                  <XCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-heading text-foreground">Not Eligible</h3>
              </div>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>Opened or used nicotine pouches (health & safety)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>Damaged packaging (unless defective on arrival)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>Returns after the 30-day window</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>Products without proof of purchase</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How to Return - Step by Step */}
          <div className="bg-background rounded-3xl p-10 lg:p-12 border-2 border-primary/10">
            <h3 className="text-2xl sm:text-3xl font-heading text-foreground text-center mb-12">
              How to Initiate a Return
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-green-600 rounded-full text-white text-2xl font-heading mb-6">
                  1
                </div>
                <h4 className="text-lg font-heading text-foreground mb-3">Contact Support</h4>
                <p className="text-sm text-muted-foreground">
                  Email us at hello@puxxnicotine.ie with your order number
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-green-600 rounded-full text-white text-2xl font-heading mb-6">
                  2
                </div>
                <h4 className="text-lg font-heading text-foreground mb-3">Get Authorization</h4>
                <p className="text-sm text-muted-foreground">
                  Receive return authorization and shipping instructions
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-green-600 rounded-full text-white text-2xl font-heading mb-6">
                  3
                </div>
                <h4 className="text-lg font-heading text-foreground mb-3">Ship Product</h4>
                <p className="text-sm text-muted-foreground">
                  Return unopened items in original packaging
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-green-600 rounded-full text-white text-2xl font-heading mb-6">
                  4
                </div>
                <h4 className="text-lg font-heading text-foreground mb-3">Receive Refund</h4>
                <p className="text-sm text-muted-foreground">
                  Get refund within 5-7 business days
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Information */}
        <section className="py-16 lg:py-24">
          <div className="bg-background border-2 border-primary/10 rounded-3xl p-10 lg:p-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-8 text-center">
              Refund Processing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-heading text-foreground mb-4">Refund Timeline</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Refunds processed within <strong className="text-foreground">5-7 business days</strong> after we receive your return</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Refund issued to original payment method</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Email confirmation sent when refund is processed</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-heading text-foreground mb-4">Return Shipping Costs</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Free returns</strong> on defective or damaged items</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Customer pays return shipping for change of mind</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Use tracked shipping for your protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support CTA */}
        <section className="py-16 lg:py-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-heading text-white mb-6 leading-tight">
                Need Help with Shipping or Returns?
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-4 font-medium">
                Our customer support team is here to help
              </p>
              <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
                Contact us with any questions about delivery, tracking, or initiating a return
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 bg-white/10 backdrop-blur-sm"
                >
                  <Link href="/faq">Visit FAQ</Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90">
                <a href="mailto:hello@puxxnicotine.ie" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">hello@puxxnicotine.ie</span>
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="tel:+35312345678" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+353 1 234 5678</span>
                </a>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
