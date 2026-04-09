import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Truck, Clock, Package, Star, CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Buy Nicotine Pouches in Cork | PUXX Ireland - Fast Delivery',
  description:
    'Premium tobacco-free nicotine pouches delivered to Cork. 14 flavors available. Fast delivery across Cork City, Douglas, Ballincollig, Carrigaline & all Cork areas. Order PUXX today.',
  openGraph: {
    title: 'Buy Nicotine Pouches in Cork | PUXX Ireland',
    description: 'Fast delivery of premium nicotine pouches across Cork',
  },
};

const corkAreas = [
  'Cork City Centre',
  'Douglas',
  'Ballincollig',
  'Carrigaline',
  'Blackrock',
  'Bishopstown',
  'Mahon',
  'Wilton',
  'Little Island',
  'Cobh',
  'Passage West',
  'Glanmire',
];

const benefits = [
  {
    icon: Truck,
    title: 'Fast Cork Delivery',
    description: '3-5 day delivery to all Cork addresses',
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

export default function CorkNicotinePouchesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Schema.org LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'PUXX Ireland - Cork',
            image: 'https://puxxnicotine.ie/images/marketing/puxxbanner.jpg',
            '@id': 'https://puxxnicotine.ie/nicotine-pouches-cork',
            url: 'https://puxxnicotine.ie/nicotine-pouches-cork',
            telephone: '+353-1-234-5678',
            priceRange: '€€',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '',
              addressLocality: 'Cork',
              addressRegion: 'County Cork',
              postalCode: '',
              addressCountry: 'IE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 51.8985,
              longitude: -8.4756,
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
              name: 'Cork',
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
              Buy Nicotine Pouches in <span className="text-green-400">Cork</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Premium tobacco-free nicotine pouches delivered fast across Cork City and County Cork
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
                Cork's Premium Nicotine Pouch Provider
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Cork residents now have easy access to Ireland's finest tobacco-free nicotine pouches.
                  PUXX Ireland delivers premium nicotine pouches directly to your door anywhere in Cork -
                  from the bustling city centre to Douglas, Ballincollig, Carrigaline, and beyond.
                </p>
                <p>
                  Our extensive collection includes 14 carefully curated flavors designed to satisfy every
                  preference. Enjoy classic refreshers like Cool Mint and Spearmint, or explore bold fruit
                  flavors including Watermelon, Cherry, Strawberry, and our distinctive Cola blend. Every
                  PUXX pouch is completely tobacco-free, offering Cork customers a cleaner, more modern
                  nicotine experience.
                </p>
                <p>
                  Life in Cork moves fast, and we keep up. Whether you're working in the city, studying at
                  UCC, or relaxing at home in Douglas or Ballincollig, ordering PUXX is simple and convenient.
                  Our secure online platform processes orders quickly, and our reliable delivery partners ensure
                  your pouches arrive safely at your Cork address.
                </p>
                <p>
                  With transparent pricing at €15.00 per can and free shipping on orders over €150, stocking
                  up on your favorite flavors or trying new varieties has never been more affordable. Join the
                  growing community of Cork residents who trust PUXX for their nicotine pouch needs.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto">
                <Image
                  src="/images/marketing/puxx-why.png"
                  alt="PUXX Premium Nicotine Pouches - Available in Cork"
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
              Why Cork Residents Choose PUXX
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast delivery, premium quality, and exceptional service for Cork customers
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
                Reliable Delivery Throughout Cork
              </h2>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg">
                  We proudly serve all areas across Cork City and County Cork with fast, reliable delivery
                  service. Our trusted shipping partners ensure your PUXX nicotine pouches arrive safely
                  within 3-5 business days, complete with tracking information.
                </p>
                <p className="text-lg">
                  Place your order before 2 PM and we'll process it the same business day, ensuring the
                  fastest possible delivery to your Cork location. Remember, all deliveries require age
                  verification - you must be 18 years or older to receive nicotine products.
                </p>
              </div>

              <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Truck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-2">Cork Delivery Details</h3>
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
                  {corkAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
                  ...and all other areas across Cork City and County Cork
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              The PUXX Advantage
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
                Order Your PUXX Pouches in Cork Today
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-4 font-medium">
                Discover 14 premium flavors with fast delivery to your Cork address
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
