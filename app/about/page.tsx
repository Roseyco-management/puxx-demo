import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Heart, CheckCircle, Truck, Lock, Award, Leaf, Package, Star, Users, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | PUXX Ireland - Premium Nicotine Pouches',
  description:
    "Learn about PUXX Ireland's mission to provide premium tobacco-free nicotine pouches. Discover our story, values, and commitment to quality.",
  openGraph: {
    title: 'About PUXX Ireland',
    description: "Ireland's premier tobacco-free nicotine pouch provider",
  },
};

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'We source only the finest ingredients and manufacturing processes to deliver exceptional quality in every pouch.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'Constantly exploring new flavors and formulations to provide our customers with the best nicotine pouch experience.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Your satisfaction is our priority. We provide excellent customer service and support every step of the way.',
  },
];

const whyPuxx = [
  {
    title: 'Tobacco-Free Formula',
    description:
      'Our pouches contain zero tobacco, offering a cleaner alternative while delivering the nicotine experience you want.',
    icon: CheckCircle,
  },
  {
    title: '14 Delicious Flavors',
    description:
      'From refreshing mint to exotic fruits, we offer a diverse range of flavors to suit every preference.',
    icon: CheckCircle,
  },
  {
    title: 'Premium Quality',
    description:
      'Every pouch is crafted with care, using high-quality ingredients and rigorous quality control standards.',
    icon: CheckCircle,
  },
  {
    title: 'Discreet & Convenient',
    description:
      'Use anywhere, anytime. Our pouches are smoke-free, spit-free, and completely discreet.',
    icon: CheckCircle,
  },
];

const trustBadges = [
  {
    icon: Shield,
    title: '18+ Age Verification',
    description: 'Strict age verification on all orders',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: '256-bit SSL encrypted transactions',
  },
  {
    icon: Truck,
    title: 'Fast Irish Shipping',
    description: '3-5 day delivery across Ireland',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: '30-day satisfaction guarantee',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[500px] lg:min-h-[600px]">
        {/* Background Banner Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/marketing/puxxbanner.jpg"
            alt="PUXX Premium Nicotine Pouches - About Us"
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
              About <span className="text-green-400">PUXX</span> Ireland
            </h1>
            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              Ireland's premier destination for premium tobacco-free nicotine pouches
            </p>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-white" />
                <span className="font-medium">Proudly Irish</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-white" />
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-white" />
                <span className="font-medium">Customer First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Our Story Section */}
        <section className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-8">
                The PUXX Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="leading-relaxed">
                  PUXX Ireland was born from a vision to revolutionize the nicotine experience in Ireland.
                  We saw a market craving premium, tobacco-free alternatives that didn't compromise on
                  quality or satisfaction.
                </p>
                <p className="leading-relaxed">
                  What started as a mission to fill a gap has evolved into a commitment to excellence.
                  We partner with world-class manufacturers to curate only the finest nicotine pouches,
                  ensuring every flavor delivers the premium experience our customers deserve.
                </p>
                <p className="leading-relaxed">
                  Today, we're proud to serve Ireland with 14 exceptional flavors, lightning-fast delivery,
                  and customer service that truly cares. We're not just a shop—we're your trusted partner
                  in a cleaner nicotine journey.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-3xl p-10 lg:p-12 text-white shadow-2xl">
                <h3 className="text-3xl font-heading mb-6">Our Mission</h3>
                <blockquote className="text-xl leading-relaxed mb-8 border-l-4 border-white/50 pl-6">
                  "To make premium tobacco-free nicotine pouches accessible to every Irish adult,
                  delivering unmatched quality, variety, and service with every single order."
                </blockquote>
                <div className="pt-8 border-t border-white/30">
                  <h3 className="text-2xl font-heading mb-4">Our Vision</h3>
                  <p className="text-lg text-white/95 leading-relaxed">
                    To become Ireland's most trusted nicotine pouch provider, recognized for our
                    unwavering commitment to quality, innovation, and customer satisfaction.
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-primary/10 rounded-3xl" />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do, from product selection to customer service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose PUXX Section */}
        <section className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual - Why PUXX Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto">
                <Image
                  src="/images/marketing/puxx-why.png"
                  alt="Why Choose PUXX - Premium Tobacco-Free Nicotine Pouches"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>
            </div>

            {/* Benefits List */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-4">
                Why Choose PUXX?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Premium quality nicotine pouches designed for the modern Irish lifestyle
              </p>
              <div className="space-y-8">
                {whyPuxx.map((item, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-heading text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Worldwide Quality Section */}
        <section className="py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-green-600 to-emerald-600 p-12 lg:p-20 shadow-2xl">
            <div className="relative z-10 text-center text-white">
              <div className="max-w-5xl mx-auto">
                <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto mb-10">
                  <Image
                    src="/images/marketing/BLACK-POUCHES-WORLDWIDE.png"
                    alt="PUXX Premium Nicotine Pouches - Trusted Worldwide"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  />
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-6 leading-tight">
                  Premium Quality Trusted Worldwide
                </h2>
                <p className="text-2xl sm:text-3xl text-white mb-4 font-semibold">
                  Now Available in Ireland
                </p>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Join thousands of satisfied customers who trust PUXX for their nicotine needs
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link href="/products">
                    Explore Our Flavors
                  </Link>
                </Button>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-6">
              Our Commitment to You
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12">
              We're more than just a retailer—we're a dedicated team of professionals committed to
              serving Irish customers with excellence. From product selection to customer support,
              every team member shares a passion for quality and exceptional service.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-background border-2 border-border rounded-2xl p-6 hover:border-primary transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Package className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-2">Quality Products</h3>
                <p className="text-muted-foreground">
                  Only the finest nicotine pouches make it to our shelves
                </p>
              </div>

              <div className="bg-background border-2 border-border rounded-2xl p-6 hover:border-primary transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  3-5 day shipping across Ireland
                </p>
              </div>

              <div className="bg-background border-2 border-border rounded-2xl p-6 hover:border-primary transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-2">Customer Care</h3>
                <p className="text-muted-foreground">
                  Support when you need it most
                </p>
              </div>
            </div>

            <div className="bg-background border-2 border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-heading text-foreground">
                  Customer Support Hours
                </h3>
              </div>
              <div className="space-y-2 mb-6 text-muted-foreground">
                <p className="text-lg">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p className="text-lg">Saturday: 10:00 AM - 4:00 PM IST</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-lg">
                <a
                  href="mailto:hello@puxxnicotine.ie"
                  className="text-primary hover:underline font-semibold"
                >
                  hello@puxxnicotine.ie
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <span className="text-foreground font-semibold">+353 1 234 5678</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-foreground mb-4">
              Shop with Confidence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trust and safety are our top priorities
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-background border-2 border-primary/20 rounded-2xl p-8 text-center hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <badge.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{badge.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-green-600 to-emerald-600 p-12 lg:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-heading text-white mb-6 leading-tight">
                Ready to Experience PUXX?
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-4 font-medium">
                Discover our range of 14 premium flavors
              </p>
              <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
                Find your perfect pouch today and join Ireland's growing community of satisfied PUXX customers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
                >
                  <Link href="/products">Shop Our Products</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 bg-white/10 backdrop-blur-sm"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
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
