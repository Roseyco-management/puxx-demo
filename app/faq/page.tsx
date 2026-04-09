'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  HelpCircle,
  Package,
  Shield,
  Truck,
  RefreshCw,
  Scale,
  Search,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'product-info',
    title: 'Product Information',
    icon: Package,
    description: 'Learn about PUXX nicotine pouches, flavors, and ingredients',
    questions: [
      {
        question: 'What are nicotine pouches?',
        answer: (
          <div className="space-y-3">
            <p>
              Nicotine pouches are small, discrete pouches that contain nicotine, flavorings, and other ingredients.
              They are placed between the lip and gum, where nicotine is absorbed through the oral mucosa.
            </p>
            <p>
              Unlike traditional tobacco products, PUXX nicotine pouches are completely <strong>tobacco-free</strong>,
              making them a cleaner alternative for nicotine consumption. They produce no smoke, require no spitting,
              and can be used discreetly anywhere.
            </p>
          </div>
        ),
      },
      {
        question: 'How do PUXX nicotine pouches work?',
        answer: (
          <div className="space-y-3">
            <p>
              When you place a PUXX pouch between your lip and gum, the nicotine and flavoring are gradually released.
              The nicotine is absorbed through the lining of your mouth directly into your bloodstream.
            </p>
            <p>
              This process typically begins within a few minutes and continues for 30-60 minutes, depending on the
              strength of the pouch and your personal preferences.
            </p>
          </div>
        ),
      },
      {
        question: 'What flavors do you offer?',
        answer: (
          <div className="space-y-3">
            <p>
              PUXX Ireland offers <strong>14 exceptional flavors</strong> to suit every preference:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Mint Varieties:</strong> Cool Mint, Ice Mint, Spearmint, Peppermint</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Fruit Flavors:</strong> Watermelon, Blueberry, Mango, Citrus, Berry Blast</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Unique Blends:</strong> Coffee, Cinnamon, Liquorice, Tropical Mix, Arctic Freeze</span>
              </li>
            </ul>
            <p className="pt-2">
              <Link href="/products" className="text-primary font-semibold hover:underline">
                Browse all flavors →
              </Link>
            </p>
          </div>
        ),
      },
      {
        question: 'What nicotine strengths are available?',
        answer: 'PUXX pouches are available in Light (3-6mg), Regular (9-12mg), and Strong (15-20mg) strengths to accommodate different preferences. Check individual product pages for specific nicotine content.',
      },
      {
        question: 'How many pouches are in each can?',
        answer: 'Each PUXX can contains 20 premium nicotine pouches. With typical usage of 8-12 pouches per day, one can lasts approximately 2-3 days for most users.',
      },
      {
        question: 'What ingredients are in PUXX pouches?',
        answer: 'PUXX nicotine pouches contain pharmaceutical-grade nicotine, plant-based fibers, food-grade flavorings, pH adjusters, and sweeteners. All ingredients are food-grade and carefully tested for quality and safety.',
      },
      {
        question: 'Are PUXX pouches tobacco-free?',
        answer: 'Yes, absolutely! PUXX nicotine pouches are 100% tobacco-free. They contain pharmaceutical-grade nicotine but no actual tobacco leaf or plant material, making them a cleaner alternative.',
      },
      {
        question: 'How long does each pouch last?',
        answer: 'The effects of a PUXX pouch typically last 30-60 minutes. Most users keep a pouch in for 20-45 minutes. You can remove it earlier if the flavor becomes too strong or keep it longer if you prefer.',
      },
    ],
  },
  {
    id: 'usage-safety',
    title: 'Usage & Safety',
    icon: Shield,
    description: 'How to use nicotine pouches safely and effectively',
    questions: [
      {
        question: 'How do I use nicotine pouches?',
        answer: 'Using PUXX pouches is simple: 1) Select your pouch, 2) Place it between your upper lip and gum, 3) Feel a slight tingle, 4) Keep it in for 20-60 minutes, 5) Dispose responsibly. Start with a lower strength if you are new to nicotine pouches.',
      },
      {
        question: 'How long should I keep a pouch in?',
        answer: 'Most users keep a PUXX pouch in for 20-45 minutes. You can use it for up to 60 minutes, but remove it sooner if you experience discomfort. There is no perfect time - it depends on your preference and nicotine tolerance.',
      },
      {
        question: 'Can I swallow with a pouch in?',
        answer: 'Yes, you can swallow your saliva normally while using a PUXX pouch. However, do not swallow the pouch itself. If you accidentally swallow a pouch, it will likely pass harmlessly, but contact a healthcare professional if you experience discomfort.',
      },
      {
        question: 'Are nicotine pouches safe?',
        answer: 'Nicotine pouches are considered safer than smoking because they don\'t involve combustion. However, nicotine is addictive and pouches are not risk-free. They should only be used by adults (18+) who are already nicotine users.',
      },
      {
        question: 'What are the side effects?',
        answer: 'Some users may experience mild tingling or burning in the mouth, hiccups, slight nausea, increased salivation, or dizziness (if using too strong). Most side effects are mild and diminish with regular use.',
      },
      {
        question: 'Who should not use nicotine pouches?',
        answer: 'Do not use if you are under 18, pregnant, breastfeeding, have cardiovascular disease, high blood pressure, diabetes, or are a non-nicotine user. Consult your doctor if you have medical conditions or take medications.',
      },
      {
        question: 'Can I use pouches if I am pregnant?',
        answer: 'No. Nicotine pouches should NOT be used during pregnancy or breastfeeding. Nicotine can harm fetal development and pass into breast milk. Consult your healthcare provider for nicotine cessation support.',
      },
    ],
  },
  {
    id: 'ordering-delivery',
    title: 'Ordering & Delivery',
    icon: Truck,
    description: 'Shipping information, delivery times, and payment options',
    questions: [
      {
        question: 'What is the minimum order quantity?',
        answer: 'There is no minimum order quantity! You can order as little as one can or stock up with larger quantities. However, orders over €30 qualify for free delivery across Ireland.',
      },
      {
        question: 'How much is shipping?',
        answer: 'Standard shipping is €4.95 for orders under €30. FREE shipping on all orders over €30. All prices include VAT. Shipping is to Republic of Ireland addresses only.',
      },
      {
        question: 'When is shipping free?',
        answer: 'Enjoy FREE standard delivery on all orders over €30. Simply add €30 or more worth of products to your cart and shipping is on us! Most customers save by ordering 2-3 cans at a time.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 3-5 business days across Ireland. Orders before 2:00 PM on weekdays are processed the same day. Orders after 2:00 PM or on weekends are processed the next business day.',
      },
      {
        question: 'Do you deliver to all of Ireland?',
        answer: 'Yes! We deliver to all addresses in the Republic of Ireland, including major cities, towns, rural areas, and islands served by regular postal services. We currently do not deliver to Northern Ireland.',
      },
      {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order ships, you will receive an email with tracking information. You can also check your order status anytime by logging into your account and viewing your order history.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Visa, Mastercard, American Express, Visa Debit, Mastercard Debit, Apple Pay, and Google Pay. All payments are processed securely with 256-bit SSL encryption.',
      },
    ],
  },
  {
    id: 'returns-refunds',
    title: 'Returns & Refunds',
    icon: RefreshCw,
    description: 'Our return policy, refund process, and exchanges',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'You can return unopened products within 30 days of delivery for a full refund or exchange. Products must be in original packaging and resaleable condition. We cannot accept returns of opened products unless defective.',
      },
      {
        question: 'How do I return a product?',
        answer: 'Contact us at hello@puxxnicotine.ie or +353 1 234 5678 within 30 days. We will provide a Return Authorization (RA) number and instructions. Pack items securely, include the RA number, and ship back (customer pays return shipping).',
      },
      {
        question: 'When will I get my refund?',
        answer: 'We process refunds within 5-7 business days after receiving your return. Refunds go to your original payment method. It may take an additional 5-10 business days for the credit to appear in your account.',
      },
      {
        question: 'Can I exchange products?',
        answer: 'Yes! Contact us to arrange an exchange for a different flavor or strength. Products must be unopened and in original packaging. The same 30-day timeframe applies to exchanges.',
      },
    ],
  },
  {
    id: 'age-legal',
    title: 'Age Verification & Legal',
    icon: Scale,
    description: 'Age requirements, verification process, and legal information',
    questions: [
      {
        question: 'Do I need to be 18+ to buy?',
        answer: 'Yes, absolutely. You must be 18 years of age or older to purchase nicotine pouches. This is a strict legal requirement. We verify age at purchase and potentially again at delivery.',
      },
      {
        question: 'How do you verify age?',
        answer: 'We use multi-step verification: 1) Online confirmation that you are 18+, 2) Automated age check using your details, 3) Courier may require ID at delivery. If age cannot be verified, orders will not be completed.',
      },
      {
        question: 'Are nicotine pouches legal in Ireland?',
        answer: 'Yes! Nicotine pouches are legal to buy, sell, and use in the Republic of Ireland for adults 18+. They are regulated as consumer products but not subject to the same restrictions as tobacco products.',
      },
      {
        question: 'Can I use pouches in public places?',
        answer: 'Yes! PUXX pouches can be used almost anywhere because they produce no smoke or vapor. You can use them at work, restaurants, public transport, sports events, concerts, and during flights (check airline policy).',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  const displayCategories = searchQuery ? filteredCategories : faqCategories;

  return (
    <main className="min-h-screen bg-background">
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[500px] lg:min-h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/images/marketing/puxx-banner-fruit.jpg"
            alt="PUXX Ireland FAQ - Frequently Asked Questions"
            fill
            priority
            className="object-cover object-center"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading tracking-tight text-white leading-[1.1] mb-8">
              <span className="text-green-400">PUXX</span> Ireland FAQ
            </h1>
            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              Everything you need to know about nicotine pouches and ordering from PUXX
            </p>

            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-white" />
                <span className="font-medium">Expert Answers</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-white" />
                <span className="font-medium">Comprehensive Guides</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-white" />
                <span className="font-medium">Quick Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary"
            />
          </div>
          {searchQuery && (
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Found {displayCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} results for "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {!searchQuery && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jump to the section that interests you most
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="group flex items-start gap-4 p-6 bg-white border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.questions.length} questions
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-12">
          {displayCategories.length > 0 ? (
            displayCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-2">
                      {category.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
                  <Accordion
                    items={category.questions.map(q => ({
                      title: q.question,
                      content: typeof q.answer === 'string' ? <p>{q.answer}</p> : q.answer,
                    }))}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-heading text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse by category above
              </p>
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </section>

        <section className="py-16 lg:py-24 mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-green-600 to-emerald-600 p-12 lg:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <MessageSquare className="h-16 w-16 text-white/90 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                Can\'t find what you\'re looking for? Our friendly customer support team is here to help!
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <Mail className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-heading mb-2">Email Us</h3>
                  <a href="mailto:hello@puxxnicotine.ie" className="text-sm hover:underline break-all">
                    hello@puxxnicotine.ie
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <Phone className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-heading mb-2">Call Us</h3>
                  <a href="tel:+35312345678" className="text-sm hover:underline">
                    +353 1 234 5678
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-heading mb-2">Contact Form</h3>
                  <p className="text-sm">Quick response time</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-8 bg-white/10 backdrop-blur-sm">
                  <Link href="/products">Shop Products</Link>
                </Button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        </section>

        <section className="py-8">
          <div className="bg-muted/30 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-heading text-foreground mb-4">Customer Support Hours</h3>
            <div className="space-y-2 text-muted-foreground max-w-md mx-auto">
              <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
              <p>Saturday: 10:00 AM - 4:00 PM IST</p>
              <p>Sunday: Closed</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We typically respond to emails within 24 hours during business days
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
