import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Truck, Clock, Package, Star, CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Buy Nicotine Pouches in Galway | PUXX Ireland - Fast Delivery',
  description:
    'Premium tobacco-free nicotine pouches delivered to Galway. 14 flavors available. Fast delivery across Galway City, Salthill, Knocknacarra, Oranmore & all Galway areas. Order PUXX today.',
  openGraph: {
    title: 'Buy Nicotine Pouches in Galway | PUXX Ireland',
    description: 'Fast delivery of premium nicotine pouches across Galway',
  },
};

const galwayAreas = [
  'Galway City Centre',
  'Salthill',
  'Knocknacarra',
  'Oranmore',
  'Newcastle',
  'Moycullen',
  'Renmore',
  'Ballybane',
  'Merlin Park',
  'Westside',
  'Bohermore',
  'Castlegar',
];

const benefits = [
  {
    icon: Truck,
    title: 'Fast Galway Delivery',
    description: '3-5 day delivery to all Galway addresses',
  },
  {
    icon: Package,
    title: '14 Premium Flavors',
    description: 'From cool mint to tropical fruits',
  },
  {
    icon: Star,
    title: '100% Tobacco-Free',
    description: 'Clean, modern nicotine experience',
  },
  {
    icon: Clock,
    title: 'Quick Order Processing',
    description: 'Orders placed before 2 PM ship same day',
  },
];

const features = [
  'Premium tobacco-free nicotine pouches',
  'All products €15.00 - consistent pricing',
  'Free shipping on orders over €150',
  '18+ age verification required',
  'Discreet packaging and delivery',
  'Secure online payment processing',
];

export default function GalwayNicotinePouchesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Schema.org LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'PUXX Ireland - Galway',
            image: 'https://puxxnicotine.ie/images/marketing/puxxbanner.jpg',
            '@id': 'https://puxxnicotine.ie/nicotine-pouches-galway',
            url: 'https://puxxnicotine.ie/nicotine-pouches-galway',
            telephone: '+353-1-234-5678',
            priceRange: '€€',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '',
              addressLocality: 'Galway',
              addressRegion: 'County Galway',
              postalCode: '',
              addressCountry: 'IE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 53.2707,
              longitude: -9.0568,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
            sameAs: ['https://puxxnicotine.ie'],
            areaServed: {
              '@type': 'City',
              name: 'Galway',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-irish">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight text-white leading-tight mb-6">
              Buy Nicotine Pouches in <span className="text-green-400">Galway</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Premium tobacco-free nicotine pouches delivered fast across Galway City and County Galway
            </p>

            <div className="flex flex-wrap items-center gap-6 lg:gap-8 justify-center text-base lg:text-lg text-white/90 mb-10">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-white" />
                <span className="font-medium">3-5 Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-white" />
                <span className="font-medium">14 Flavors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-white" />
                <span className="font-medium">Tobacco-Free</span>
              </div>
            </div>

            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <Link href="/products">Shop PUXX Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <section className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
                Galway's Trusted Nicotine Pouch Supplier
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Welcome to the West! PUXX Ireland brings premium tobacco-free nicotine pouches to Galway
                  with convenient delivery across the entire city and county. From vibrant Galway City Centre
                  to scenic Salthill, Knocknacarra, Oranmore, and surrounding areas, we deliver excellence
                  right to your doorstep.
                </p>
                <p>
                  Choose from our impressive range of 14 distinct flavors, each crafted to deliver satisfaction.
                  Whether you prefer the crisp refreshment of Cool Mint and Spearmint or the exciting taste
                  of Watermelon, Cherry, Blueberry, and our unique Cola variety, PUXX offers something for
                  every Galway customer. All our pouches are 100% tobacco-free, providing a contemporary
                  nicotine experience without compromise.
                </p>
                <p>
                  Galway life is vibrant and active, and PUXX fits perfectly into your lifestyle. Order from
                  your student accommodation at NUIG, your home in Knocknacarra, or anywhere across the city.
                  Our streamlined online ordering system makes purchasing simple, while our secure payment
                  platform ensures your transaction is safe and protected.
                </p>
                <p>
                  Every PUXX product is consistently priced at €15.00 per can, delivering premium quality
                  at fair value. Take advantage of free shipping when you spend €150 or more - ideal for
                  bulk orders or exploring our full flavor range. Join Galway's growing community of PUXX
                  enthusiasts today.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto">
                <Image
                  src="/images/marketing/puxx-why.png"
                  alt="PUXX Premium Nicotine Pouches - Available in Galway"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              Why Galway Trusts PUXX
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast delivery, premium quality, and exceptional service for Galway customers
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-background border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Information */}
        <section className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
                Swift Delivery Across Galway
              </h2>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg">
                  We deliver to every corner of Galway City and County Galway with dependable, tracked
                  shipping service. Whether you're in the city centre, out in Salthill, or anywhere in
                  between, your PUXX pouches will arrive within 3-5 business days.
                </p>
                <p className="text-lg">
                  Beat the rush - orders placed before 2 PM are processed the same business day, ensuring
                  your nicotine pouches reach you as quickly as possible. All deliveries require age
                  verification at your Galway address - recipients must be 18 years or older.
                </p>
              </div>

              <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Truck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-2">Galway Delivery Details</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>Standard shipping: €5.95 (3-5 business days)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>Free shipping on orders over €150</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>Orders before 2 PM ship same day</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>18+ age verification required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-heading text-foreground mb-6">We Deliver To:</h3>
              <div className="bg-background border-2 border-border rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {galwayAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
                  ...and all other areas across Galway City and County Galway
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              The PUXX Promise
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-background rounded-xl p-6 border border-border">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-green-600 to-emerald-600 p-12 lg:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <ShoppingBag className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-6 leading-tight">
                Start Your PUXX Journey in Galway
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-4 font-medium">
                Explore 14 premium flavors with fast delivery to your Galway location
              </p>
              <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
                All products €15.00 with free shipping on orders over €150
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
                >
                  <Link href="/products">Shop All Products</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 bg-white/10 backdrop-blur-sm"
                >
                  <Link href="/shipping">Shipping Information</Link>
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
