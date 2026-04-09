import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Shield, Zap, Clock, Heart, Package, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'What Are Nicotine Pouches? Complete Guide (2025) | PUXX Ireland',
  description:
    'Discover everything about nicotine pouches in our comprehensive 2025 guide. Learn how they work, how to use them, benefits vs traditional tobacco, safety information, and answers to common questions about tobacco-free nicotine.',
  keywords: [
    'what are nicotine pouches',
    'nicotine pouches explained',
    'nicotine pouches Ireland',
    'tobacco-free nicotine',
    'how do nicotine pouches work',
    'nicotine pouch guide',
    'PUXX pouches',
    'nicotine pouches benefits',
    'are nicotine pouches safe',
    'nicotine pouches vs smoking',
  ],
  openGraph: {
    title: 'What Are Nicotine Pouches? Complete Guide (2025)',
    description: 'Your comprehensive guide to understanding nicotine pouches, how they work, and why they are becoming Ireland\'s preferred tobacco-free nicotine alternative.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['PUXX Ireland'],
    images: [
      {
        url: '/images/blog/nicotine-pouches-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Complete Guide to Nicotine Pouches 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Are Nicotine Pouches? Complete Guide (2025)',
    description: 'Everything you need to know about nicotine pouches - the tobacco-free nicotine alternative.',
  },
};

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are nicotine pouches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nicotine pouches are small, tobacco-free sachets that contain nicotine, plant-based fibers, flavorings, and other food-grade ingredients. They are placed between the lip and gum to deliver nicotine without smoke, vapor, or tobacco.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do nicotine pouches work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When placed between your lip and gum, nicotine pouches release nicotine that is absorbed through the oral mucosa (the lining of your mouth) directly into your bloodstream. This process typically takes 5-10 minutes to feel the effects, which can last 30-60 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are nicotine pouches safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While nicotine pouches are not risk-free, they eliminate the harmful effects of tobacco combustion and smoke inhalation. They contain no tobacco leaf, produce no smoke, and avoid the carcinogens found in traditional tobacco products. However, nicotine is addictive and should only be used by adults.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do nicotine pouches last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most nicotine pouches are designed to be used for 30-60 minutes. You will feel the effects within 5-10 minutes, with peak nicotine levels occurring around 15-30 minutes. After use, simply dispose of the pouch responsibly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you need to spit with nicotine pouches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, nicotine pouches are completely spit-free. Unlike traditional snus or chewing tobacco, nicotine pouches do not require spitting. Any saliva produced can be safely swallowed, making them discreet and convenient to use anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'What strengths do nicotine pouches come in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nicotine pouches typically range from 3mg to 20mg of nicotine per pouch. Common strengths include 6mg (light), 9mg (regular), 12mg (strong), and 15-20mg (extra strong). Beginners should start with lower strengths and adjust based on their needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can nicotine pouches help you quit smoking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many people use nicotine pouches as a tobacco harm reduction tool or as part of their journey to quit smoking. They provide nicotine satisfaction without tobacco smoke, making them a cleaner alternative. However, they are not officially marketed as smoking cessation products.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are nicotine pouches legal in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, nicotine pouches are legal to buy and use in Ireland. They must comply with EU regulations and can only be sold to adults aged 18 and over. PUXX Ireland follows strict age verification procedures for all orders.',
      },
    },
  ],
};

// Article Schema for SEO
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Are Nicotine Pouches? Complete Guide (2025)',
  description: 'Comprehensive guide explaining nicotine pouches, how they work, benefits, safety, and usage instructions for Irish consumers.',
  image: '/images/blog/nicotine-pouches-guide.jpg',
  author: {
    '@type': 'Organization',
    name: 'PUXX Ireland',
    url: 'https://puxxnicotine.ie',
  },
  publisher: {
    '@type': 'Organization',
    name: 'PUXX Ireland',
    logo: {
      '@type': 'ImageObject',
      url: 'https://puxxnicotine.ie/images/logo/PUXX-LOGO-LONG-WHITE.png',
    },
  },
  datePublished: '2025-01-15T00:00:00Z',
  dateModified: '2025-01-15T00:00:00Z',
};

const quickFacts = [
  {
    icon: Package,
    title: '100% Tobacco-Free',
    description: 'Contains no tobacco leaf - only nicotine and plant-based fibers',
  },
  {
    icon: Zap,
    title: 'Fast Acting',
    description: 'Feel effects in 5-10 minutes, lasting 30-60 minutes',
  },
  {
    icon: Shield,
    title: 'Discreet & Clean',
    description: 'No smoke, no vapor, no spit - use anywhere, anytime',
  },
  {
    icon: Heart,
    title: 'Multiple Strengths',
    description: 'From 3mg to 20mg - find your perfect nicotine level',
  },
];

const benefits = [
  {
    title: 'No Tobacco Combustion',
    description: 'Eliminates harmful smoke and tar associated with traditional cigarettes',
    icon: CheckCircle,
  },
  {
    title: 'Smoke-Free & Odorless',
    description: 'No lingering smell on clothes, breath, or surroundings',
    icon: CheckCircle,
  },
  {
    title: 'Use Anywhere',
    description: 'Perfect for places where smoking or vaping is prohibited',
    icon: CheckCircle,
  },
  {
    title: 'No Second-Hand Exposure',
    description: 'Completely safe for people around you - no passive smoking',
    icon: CheckCircle,
  },
  {
    title: 'Variety of Flavors',
    description: 'From mint to fruit flavors - enjoy a pleasant taste experience',
    icon: CheckCircle,
  },
  {
    title: 'Convenient & Portable',
    description: 'Small, discreet containers that fit in your pocket',
    icon: CheckCircle,
  },
];

const howToUseSteps = [
  {
    step: 1,
    title: 'Choose Your Pouch',
    description: 'Select a nicotine pouch from your container. If you\'re new, start with a lower strength (6mg).',
  },
  {
    step: 2,
    title: 'Place Under Lip',
    description: 'Tuck the pouch between your upper lip and gum. You can use either side - whatever feels comfortable.',
  },
  {
    step: 3,
    title: 'Feel the Tingle',
    description: 'You\'ll notice a slight tingling sensation as the nicotine begins to release. This is completely normal.',
  },
  {
    step: 4,
    title: 'Wait & Enjoy',
    description: 'Leave the pouch in place for 30-60 minutes. You\'ll feel the effects within 5-10 minutes.',
  },
  {
    step: 5,
    title: 'Dispose Properly',
    description: 'Remove the pouch and dispose of it in a bin. Most containers have a compartment for used pouches.',
  },
];

const safetyTips = [
  'Only use if you are 18 years or older',
  'Start with lower nicotine strengths if you\'re new to nicotine products',
  'Do not swallow the pouch - it should remain between your lip and gum',
  'Wash your hands after handling nicotine pouches',
  'Store in a cool, dry place away from children and pets',
  'Do not use if you are pregnant, nursing, or have cardiovascular conditions',
  'Consult your doctor if you have any health concerns',
  'Nicotine is addictive - use responsibly',
];

export default function WhatAreNicotinePouchesPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary via-green-600 to-emerald-600 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
              Complete Guide 2025
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight text-white leading-tight mb-6">
              What Are Nicotine Pouches?
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 mb-8 leading-relaxed">
              Your comprehensive guide to understanding tobacco-free nicotine pouches, how they work, and why they're becoming Ireland's preferred nicotine alternative
            </p>
            <div className="flex flex-wrap items-center gap-6 justify-center text-base text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Updated January 2025</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Quick Facts Grid */}
          <section className="mb-16">
            <div className="grid sm:grid-cols-2 gap-6">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                  <fact.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading text-foreground mb-2">{fact.title}</h3>
                  <p className="text-muted-foreground">{fact.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Understanding Nicotine Pouches
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nicotine pouches represent a modern, tobacco-free approach to nicotine consumption. As Ireland and the world move toward cleaner nicotine alternatives, understanding what nicotine pouches are and how they work has never been more important.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              In this comprehensive guide, we'll explore everything you need to know about nicotine pouches - from their composition and how they work to their benefits, safety considerations, and proper usage. Whether you're new to nicotine pouches or looking to learn more, this guide will provide you with the knowledge to make informed decisions.
            </p>
          </section>

          {/* What Are Nicotine Pouches */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              What Exactly Are Nicotine Pouches?
            </h2>
            <div className="bg-gradient-to-br from-primary/10 to-green-600/10 border border-primary/20 rounded-2xl p-8 mb-8">
              <p className="text-lg text-foreground leading-relaxed font-medium">
                Nicotine pouches are small, white sachets that contain pharmaceutical-grade nicotine, plant-based fibers, flavorings, and other food-grade ingredients. Unlike traditional tobacco products, they contain zero tobacco leaf, making them a 100% tobacco-free nicotine alternative.
              </p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              These discreet pouches are designed to be placed between your upper lip and gum, where they slowly release nicotine that is absorbed through the oral mucosa directly into your bloodstream. This delivery method provides nicotine satisfaction without the need for smoking, vaping, or chewing tobacco.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Each pouch is individually sealed for freshness and convenience, typically coming in containers of 20-25 pouches. They're available in various nicotine strengths (usually ranging from 3mg to 20mg per pouch) and an array of flavors - from classic mint to exotic fruits.
            </p>

            <h3 className="text-2xl font-heading text-foreground mb-4 mt-8">
              What's Inside a Nicotine Pouch?
            </h3>
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Pharmaceutical-Grade Nicotine:</span>
                    <span className="text-muted-foreground"> The active ingredient, extracted and purified to medical standards</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Plant-Based Fibers:</span>
                    <span className="text-muted-foreground"> Usually cellulose or similar materials that form the pouch base</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Flavorings:</span>
                    <span className="text-muted-foreground"> Food-grade flavoring agents (mint, fruit, citrus, etc.)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">pH Adjusters:</span>
                    <span className="text-muted-foreground"> Help optimize nicotine absorption through oral tissues</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Sweeteners & Stabilizers:</span>
                    <span className="text-muted-foreground"> Food-grade additives for taste and shelf stability</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* How Do They Work */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              How Do Nicotine Pouches Work?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Understanding how nicotine pouches deliver nicotine is key to using them effectively. The process is simple yet sophisticated, designed to provide a satisfying nicotine experience without smoke or vapor.
            </p>

            <h3 className="text-2xl font-heading text-foreground mb-4 mt-8">
              The Nicotine Delivery Process
            </h3>
            <div className="space-y-4 mb-8">
              <div className="bg-muted/30 border-l-4 border-primary rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-heading text-foreground text-lg mb-2">Placement</h4>
                    <p className="text-muted-foreground">
                      You place the pouch between your upper lip and gum. The moisture from your mouth activates the pouch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border-l-4 border-primary rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-heading text-foreground text-lg mb-2">Activation</h4>
                    <p className="text-muted-foreground">
                      Your saliva begins to break down the pouch contents, releasing nicotine and flavor compounds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border-l-4 border-primary rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-heading text-foreground text-lg mb-2">Absorption</h4>
                    <p className="text-muted-foreground">
                      Nicotine passes through the oral mucosa (mouth lining) and enters your bloodstream directly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border-l-4 border-primary rounded-r-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-heading text-foreground text-lg mb-2">Effect</h4>
                    <p className="text-muted-foreground">
                      Within 5-10 minutes, you'll feel the nicotine effects. Peak levels occur around 15-30 minutes and can last 30-60 minutes total.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              This method of nicotine delivery is known as "oral absorption" or "buccal absorption." It's the same principle used in some medications and nicotine replacement therapies. Because the nicotine bypasses your digestive system and lungs, you get a cleaner, more controlled nicotine experience.
            </p>
          </section>

          {/* How to Use */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              How to Use Nicotine Pouches: Step-by-Step Guide
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Using nicotine pouches is straightforward, but following these steps will help ensure you get the best experience, especially if you're new to them.
            </p>

            <div className="space-y-6 mb-8">
              {howToUseSteps.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-muted/50 to-transparent border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-green-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-foreground text-lg mb-2">First-Time User Tips</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Start with a lower nicotine strength (3mg or 6mg) to assess your tolerance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>The tingling sensation is normal and will subside after a few minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>If the sensation is too intense, remove the pouch and try a lower strength</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Don't use more than one pouch at a time when starting out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Benefits of Nicotine Pouches vs Traditional Tobacco
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nicotine pouches offer numerous advantages over traditional tobacco products like cigarettes, cigars, and chewing tobacco. Here's why thousands of Irish adults are making the switch:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <benefit.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-heading text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-green-600/10 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                The Tobacco-Free Advantage
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                The most significant benefit of nicotine pouches is the complete absence of tobacco. Traditional cigarettes contain over 7,000 chemicals, with at least 70 known to cause cancer. By eliminating tobacco combustion, nicotine pouches avoid:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tar and carcinogenic smoke particles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Carbon monoxide exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Respiratory irritation from smoke inhalation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Damage to teeth and gums from tobacco leaf</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Passive smoking risks to people around you</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Safety Information */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Safety Information and Considerations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              While nicotine pouches are a cleaner alternative to traditional tobacco, it's important to understand the safety considerations and use them responsibly.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
              <div className="flex gap-3">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-foreground text-lg mb-3">Important Safety Guidelines</h4>
                  <ul className="space-y-3">
                    {safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-heading text-foreground mb-4">
              Understanding Nicotine
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nicotine is a naturally occurring alkaloid found in tobacco plants. While it's the primary reason people use tobacco products, it's important to understand its effects:
            </p>
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong className="text-foreground">Addictive:</strong> Nicotine is highly addictive and can lead to dependence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong className="text-foreground">Stimulant:</strong> It acts as a stimulant, increasing heart rate and blood pressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong className="text-foreground">Not Risk-Free:</strong> While cleaner than smoking, nicotine use is not without risks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong className="text-foreground">For Adults Only:</strong> Never suitable for minors, pregnant women, or non-nicotine users</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-heading text-foreground mb-4">
              Are Nicotine Pouches Safer Than Smoking?
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              According to tobacco harm reduction research, nicotine pouches eliminate many of the most harmful aspects of smoking. While they're not completely risk-free (because nicotine is addictive), they avoid the combustion process that creates the majority of harmful chemicals in cigarette smoke.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Public Health England and other health organizations recognize that tobacco-free nicotine products like nicotine pouches represent a significant harm reduction opportunity for adult smokers who cannot or will not quit nicotine entirely.
            </p>
          </section>

          {/* Choosing the Right Strength */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Choosing the Right Nicotine Strength
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nicotine pouches come in various strengths to suit different needs and preferences. Choosing the right strength is important for satisfaction and comfort.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h3 className="text-xl font-heading text-foreground">3-6mg - Light</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  <strong>Best for:</strong> Light smokers, social smokers, or those new to nicotine pouches
                </p>
                <p className="text-muted-foreground">
                  Provides a gentle nicotine experience with minimal tingling. Perfect for beginners or those who prefer a subtle effect.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <h3 className="text-xl font-heading text-foreground">9-12mg - Regular/Strong</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  <strong>Best for:</strong> Regular smokers (10-20 cigarettes/day) or experienced nicotine pouch users
                </p>
                <p className="text-muted-foreground">
                  Delivers a satisfying nicotine hit with noticeable effects. The most popular strength range for everyday users.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h3 className="text-xl font-heading text-foreground">15-20mg - Extra Strong</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  <strong>Best for:</strong> Heavy smokers (20+ cigarettes/day) or users seeking maximum nicotine delivery
                </p>
                <p className="text-muted-foreground">
                  Provides a powerful nicotine experience with strong, long-lasting effects. Not recommended for beginners.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h4 className="font-heading text-foreground text-lg mb-3">Strength Selection Tips</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>If you're switching from cigarettes, start with a strength similar to your smoking habit</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>You can always increase strength if needed, but starting too high can be uncomfortable</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Try different strengths to find your perfect balance of satisfaction and comfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Consider having multiple strengths for different times of day or situations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Popular Flavors */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Popular Nicotine Pouch Flavors
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              One of the great advantages of nicotine pouches is the wide variety of flavors available. At PUXX Ireland, we offer 14 delicious flavors to suit every taste preference.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6">
                <h3 className="text-xl font-heading text-foreground mb-3">Mint Family</h3>
                <p className="text-muted-foreground mb-3">
                  The most popular category, offering fresh, cooling sensations
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Cool Mint - Classic refreshing mint</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Spearmint - Sweet, smooth mint flavor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Peppermint - Strong, invigorating mint</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Wintergreen - Minty with a subtle sweetness</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 border border-pink-200 dark:border-pink-800 rounded-xl p-6">
                <h3 className="text-xl font-heading text-foreground mb-3">Fruit Flavors</h3>
                <p className="text-muted-foreground mb-3">
                  Sweet, tangy, and refreshing fruit-inspired flavors
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                    <span>Watermelon - Juicy, summery sweetness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                    <span>Strawberry - Sweet berry delight</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                    <span>Cherry - Bold, sweet cherry flavor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                    <span>Citrus - Zesty orange and lemon notes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl p-6">
              <h4 className="font-heading text-foreground text-lg mb-3">Finding Your Flavor</h4>
              <p className="text-muted-foreground mb-4">
                Don't be afraid to experiment! Many users enjoy having multiple flavors on hand for different moods and occasions. Mint flavors are popular for their refreshing, long-lasting taste, while fruit flavors offer variety and excitement.
              </p>
              <Button asChild className="gradient-emerald">
                <Link href="/products">
                  Explore All 14 PUXX Flavors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Here are answers to the most common questions about nicotine pouches:
            </p>

            <div className="space-y-4">
              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Do you need to spit with nicotine pouches?
                </h3>
                <p className="text-muted-foreground">
                  No, nicotine pouches are completely spit-free. Unlike traditional snus or chewing tobacco, you don't need to spit when using nicotine pouches. Any saliva produced can be safely swallowed, making them discreet and convenient to use anywhere.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  How long do nicotine pouches last?
                </h3>
                <p className="text-muted-foreground">
                  Most nicotine pouches are designed to be used for 30-60 minutes. You'll typically feel the effects within 5-10 minutes, with peak nicotine delivery occurring around 15-30 minutes. After use, simply remove and dispose of the pouch responsibly.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Can you swallow nicotine pouches?
                </h3>
                <p className="text-muted-foreground">
                  No, you should never swallow nicotine pouches. They are designed to remain between your lip and gum during use. While the pouch material is generally food-grade, swallowing it could cause digestive discomfort and deliver too much nicotine at once. Always dispose of used pouches properly.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Are nicotine pouches legal in Ireland?
                </h3>
                <p className="text-muted-foreground">
                  Yes, nicotine pouches are completely legal to purchase and use in Ireland. They comply with EU regulations and can only be sold to adults aged 18 and over. PUXX Ireland follows strict age verification procedures for all orders to ensure responsible distribution.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Can nicotine pouches help you quit smoking?
                </h3>
                <p className="text-muted-foreground">
                  Many people use nicotine pouches as part of their tobacco harm reduction strategy or journey to quit smoking. They provide nicotine satisfaction without the harmful smoke, tar, and combustion products of cigarettes. While they're not officially marketed as smoking cessation products, they can be a valuable tool for those looking to move away from traditional tobacco. Always consult with your healthcare provider about quitting strategies.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  How should I store nicotine pouches?
                </h3>
                <p className="text-muted-foreground">
                  Store nicotine pouches in a cool, dry place away from direct sunlight. Keep them in their original container to maintain freshness. Always store them out of reach of children and pets. Most pouches have a shelf life of 12-18 months when stored properly. Check the expiration date on your container.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Can you use nicotine pouches on a plane?
                </h3>
                <p className="text-muted-foreground">
                  Yes, nicotine pouches are perfect for air travel. Since they produce no smoke or vapor, they can be used during flights without any restrictions. They're an ideal solution for long flights where smoking or vaping isn't permitted. However, always follow airline staff instructions and be discreet when using them.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  What's the difference between nicotine pouches and snus?
                </h3>
                <p className="text-muted-foreground">
                  The main difference is that nicotine pouches contain NO tobacco, while snus contains ground tobacco. Nicotine pouches use pharmaceutical-grade nicotine extracted from tobacco plants, combined with plant fibers and flavorings. This makes them cleaner, whiter in appearance, and free from tobacco-related staining. Both are placed between the lip and gum, but nicotine pouches offer a tobacco-free experience.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose PUXX */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-heading mb-6">
                  Why Choose PUXX Ireland for Your Nicotine Pouches?
                </h2>
                <p className="text-lg sm:text-xl text-white/95 mb-8 leading-relaxed">
                  As Ireland's premier nicotine pouch retailer, we're committed to providing you with the best products, service, and value.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Package className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="font-heading text-lg mb-2">14 Premium Flavors</h3>
                    <p className="text-white/85 text-sm">
                      Curated selection of the world's best nicotine pouches
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Zap className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="font-heading text-lg mb-2">Fast Irish Delivery</h3>
                    <p className="text-white/85 text-sm">
                      3-5 day shipping across Ireland, free over €150
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Shield className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="font-heading text-lg mb-2">Quality Guaranteed</h3>
                    <p className="text-white/85 text-sm">
                      Premium products with satisfaction guarantee
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
                    <Link href="/products">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/20 text-lg bg-white/10 backdrop-blur-sm"
                  >
                    <Link href="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Ready to Experience Tobacco-Free Nicotine?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nicotine pouches represent a modern, clean approach to nicotine consumption. By eliminating tobacco and smoke, they offer a convenient, discreet alternative that fits seamlessly into your lifestyle - whether you're at work, traveling, or socializing.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At PUXX Ireland, we're proud to offer 14 premium flavors in various strengths, ensuring you'll find the perfect pouch for your preferences. With fast delivery across Ireland, competitive pricing, and a commitment to quality, we make it easy to experience the benefits of tobacco-free nicotine.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you're looking to switch from traditional tobacco, seeking a more convenient nicotine option, or simply curious about nicotine pouches, we hope this guide has provided you with the knowledge to make an informed decision.
            </p>

            <div className="bg-muted/30 border-2 border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                Questions About Nicotine Pouches?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our team is here to help you find the perfect product and answer any questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-emerald">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/faq">Visit FAQ Page</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Article Meta */}
          <section className="pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Published:</span> January 15, 2025
              </div>
              <span className="text-border">|</span>
              <div>
                <span className="font-semibold text-foreground">Category:</span> Education & Guides
              </div>
              <span className="text-border">|</span>
              <div>
                <span className="font-semibold text-foreground">Reading Time:</span> 8 minutes
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground italic">
                Disclaimer: This article is for informational purposes only. Nicotine is an addictive substance. Nicotine pouches are intended for adult use only (18+). If you have health concerns, please consult your healthcare provider before using nicotine products.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
