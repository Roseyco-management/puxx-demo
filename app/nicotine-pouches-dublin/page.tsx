import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Truck, Clock, Package, Star, CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Buy Nicotine Pouches in Dublin | PUXX Ireland - Fast Delivery',
  description:
    'Premium tobacco-free nicotine pouches delivered to Dublin. 14 flavors available. Fast delivery across Dublin City, North Dublin, South Dublin & surrounding areas. Order PUXX today.',
  openGraph: {
    title: 'Buy Nicotine Pouches in Dublin | PUXX Ireland',
    description: 'Fast delivery of premium nicotine pouches across Dublin',
  },
};

const dublinAreas = [
  'Dublin City Centre',
  'North Dublin',
  'South Dublin',
  'Ballsbridge',
  'Rathmines',
  'Dun Laoghaire',
  'Swords',
  'Tallaght',
  'Blanchardstown',
  'Clondalkin',
  'Lucan',
  'Howth',
];

const benefits = [
  {
    icon: Truck,
    title: 'Fast Dublin Delivery',
    description: '3-5 day delivery to all Dublin addresses',
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

export default function DublinNicotinePouchesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Schema.org LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'PUXX Ireland - Dublin',
            image: 'https://puxxnicotine.ie/images/marketing/puxxbanner.jpg',
            '@id': 'https://puxxnicotine.ie/nicotine-pouches-dublin',
            url: 'https://puxxnicotine.ie/nicotine-pouches-dublin',
            telephone: '+353-1-234-5678',
            priceRange: '€€',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '',
              addressLocality: 'Dublin',
              addressRegion: 'County Dublin',
              postalCode: '',
              addressCountry: 'IE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 53.3498,
              longitude: -6.2603,
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
              name: 'Dublin',
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
              Buy Nicotine Pouches in <span className="text-green-400">Dublin</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Premium tobacco-free nicotine pouches delivered fast across Dublin and surrounding areas
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
                Dublin's Premium Nicotine Pouch Destination
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Looking for premium nicotine pouches in Dublin? PUXX Ireland delivers the finest
                  tobacco-free nicotine pouches directly to your door anywhere in Dublin. Whether you're
                  in Dublin City Centre, Ballsbridge, Rathmines, or any Dublin suburb, we've got you covered
                  with fast, reliable delivery.
                </p>
                <p>
                  Our collection features 14 exceptional flavors ranging from refreshing Cool Mint and
                  Spearmint to exotic options like Watermelon, Cherry, and our unique Cola blend. Each
                  PUXX pouch is 100% tobacco-free, delivering a clean, modern nicotine experience without
                  smoke, spit, or lingering odors.
                </p>
                <p>
                  Dublin residents appreciate the convenience of PUXX. Order from the comfort of your home,
                  office, or anywhere in the city, and we'll handle the rest. With our streamlined ordering
                  process and secure payment system, getting your favorite nicotine pouches has never been easier.
                </p>
                <p>
                  All PUXX products are priced at €15.00 per can with consistent quality across our entire range.
                  Plus, enjoy free shipping when you order €150 or more - perfect for stocking up on your favorites
                  or trying multiple flavors.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto">
                <Image
                  src="/images/marketing/puxx-why.png"
                  alt="PUXX Premium Nicotine Pouches - Available in Dublin"
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
              Why Dublin Chooses PUXX
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast delivery, premium quality, and exceptional service for Dublin customers
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
                Fast Delivery Across Dublin
              </h2>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg">
                  We deliver to all areas of Dublin, ensuring every resident can enjoy premium PUXX
                  nicotine pouches. Our reliable shipping partners provide tracked delivery to your door
                  in just 3-5 business days.
                </p>
                <p className="text-lg">
                  Orders placed before 2 PM are processed the same business day, getting your products
                  to you even faster. All deliveries require age verification - you must be 18 or older
                  to receive nicotine pouches.
                </p>
              </div>

              <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Truck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-2">Dublin Delivery Details</h3>
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
                  {dublinAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
                  ...and all other areas across Dublin and County Dublin
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              What Makes PUXX Different
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
                Ready to Order in Dublin?
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-4 font-medium">
                Browse 14 premium flavors and get fast delivery to your Dublin address
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
