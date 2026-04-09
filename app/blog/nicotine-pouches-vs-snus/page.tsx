import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, XCircle, Info, ArrowRight, Leaf, Shield, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Nicotine Pouches vs Snus: Which Is Better? | Complete Comparison 2025',
  description:
    'Discover the key differences between nicotine pouches and snus. Compare tobacco content, flavors, health aspects, and convenience. Learn which option is right for you.',
  keywords: [
    'nicotine pouches vs snus',
    'snus vs nicotine pouches',
    'difference between snus and nicotine pouches',
    'are nicotine pouches better than snus',
    'tobacco-free nicotine pouches',
    'nicotine pouches Ireland',
    'snus Ireland',
    'tobacco-free alternatives',
  ],
  openGraph: {
    title: 'Nicotine Pouches vs Snus: Which Is Better? | PUXX Ireland',
    description: 'Complete comparison guide between nicotine pouches and snus. Understand the differences and make an informed choice.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['PUXX Ireland'],
  },
  alternates: {
    canonical: 'https://puxxnicotine.ie/blog/nicotine-pouches-vs-snus',
  },
};

const comparisonData = [
  {
    feature: 'Tobacco Content',
    nicotinePouches: 'Completely tobacco-free',
    snus: 'Contains ground tobacco',
    winner: 'pouches',
  },
  {
    feature: 'Flavor Range',
    nicotinePouches: 'Wide variety (14+ flavors)',
    snus: 'Limited traditional flavors',
    winner: 'pouches',
  },
  {
    feature: 'Staining Risk',
    nicotinePouches: 'No staining on teeth',
    snus: 'May cause tooth discoloration',
    winner: 'pouches',
  },
  {
    feature: 'Spitting Required',
    nicotinePouches: 'No spitting needed',
    snus: 'May require spitting',
    winner: 'pouches',
  },
  {
    feature: 'Odor',
    nicotinePouches: 'Minimal to no odor',
    snus: 'Tobacco smell present',
    winner: 'pouches',
  },
  {
    feature: 'Discreetness',
    nicotinePouches: 'Completely discreet',
    snus: 'Less discreet',
    winner: 'pouches',
  },
  {
    feature: 'Nicotine Delivery',
    nicotinePouches: 'Consistent and clean',
    snus: 'Effective but with tobacco',
    winner: 'tie',
  },
  {
    feature: 'Legal Status (Ireland)',
    nicotinePouches: 'Fully legal',
    snus: 'Banned for sale in EU',
    winner: 'pouches',
  },
  {
    feature: 'Health Risk',
    nicotinePouches: 'Lower (no tobacco)',
    snus: 'Higher (contains tobacco)',
    winner: 'pouches',
  },
  {
    feature: 'Price Point',
    nicotinePouches: 'Competitive',
    snus: 'Varies (limited availability)',
    winner: 'pouches',
  },
];

const benefits = [
  {
    icon: Leaf,
    title: 'Tobacco-Free',
    description: 'No tobacco means reduced health risks and no tobacco-related side effects',
  },
  {
    icon: Shield,
    title: 'Cleaner Experience',
    description: 'No staining, no spitting, no tobacco smell - just pure nicotine satisfaction',
  },
  {
    icon: Zap,
    title: 'Modern & Convenient',
    description: 'Use anywhere, anytime without drawing attention or breaking social norms',
  },
  {
    icon: Heart,
    title: 'Better for You',
    description: 'Lower health risks compared to traditional tobacco products',
  },
];

export default function NicotinePouchesVsSnusPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-green-50/50 to-background" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Complete Comparison Guide 2025</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight text-foreground leading-tight mb-6">
              Nicotine Pouches vs Snus: Which Is Better?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the key differences between modern nicotine pouches and traditional snus.
              Make an informed choice for your nicotine experience.
            </p>
          </div>

          {/* Quick Summary Box */}
          <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-heading mb-4">Quick Answer</h2>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Nicotine pouches are generally better than snus</strong> for most users. They're tobacco-free,
              cleaner, more discreet, and fully legal in Ireland and the EU. Snus contains actual tobacco and is
              banned for sale in the EU (except Sweden).
            </p>
            <p className="text-white/90">
              Both deliver nicotine effectively, but nicotine pouches offer a modern, cleaner alternative without
              the health risks and drawbacks associated with tobacco.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The world of oral nicotine products has evolved significantly over the past decade. While traditional
            snus has been popular in Scandinavia for centuries, modern nicotine pouches have emerged as a cleaner,
            more convenient alternative. But what exactly are the differences, and which one should you choose?
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            In this comprehensive guide, we'll break down everything you need to know about nicotine pouches vs snus,
            comparing their composition, benefits, drawbacks, and helping you make an informed decision about which
            option is right for you.
          </p>
        </section>

        {/* What is Snus? */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            What Is Snus?
          </h2>
          <div className="bg-muted/50 rounded-xl p-8 mb-6">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Snus is a traditional Swedish tobacco product that has been used since the 18th century. It consists
              of moist ground tobacco that's placed under the upper lip for extended periods.
            </p>
            <h3 className="text-xl font-heading text-foreground mb-3">Key Characteristics of Snus:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Contains tobacco:</strong> Made from ground tobacco leaves that are air-cured and steam-pasteurized</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Moist texture:</strong> Has a wet consistency that requires special packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Traditional flavors:</strong> Usually available in tobacco, mint, or bergamot flavors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Portion or loose:</strong> Available in pre-portioned pouches or as loose tobacco</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>EU banned:</strong> Cannot be legally sold in EU countries (except Sweden)</span>
              </li>
            </ul>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            While snus is considered less harmful than smoking, it still contains tobacco and carries associated
            health risks. The tobacco content means users are exposed to tobacco-specific nitrosamines (TSNAs)
            and other tobacco-derived compounds.
          </p>
        </section>

        {/* What Are Nicotine Pouches? */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            What Are Nicotine Pouches?
          </h2>
          <div className="bg-gradient-to-br from-primary/5 to-green-50/50 rounded-xl p-8 mb-6 border-2 border-primary/20">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Nicotine pouches are the modern evolution of oral nicotine delivery. They're completely tobacco-free
              products that contain pharmaceutical-grade nicotine, plant fibers, flavorings, and sweeteners - but
              no actual tobacco leaves.
            </p>
            <h3 className="text-xl font-heading text-foreground mb-3">Key Characteristics of Nicotine Pouches:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>100% tobacco-free:</strong> No tobacco leaves, only synthetic or tobacco-derived nicotine</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>White pouches:</strong> Won't stain teeth or require spitting</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Wide flavor variety:</strong> Available in 14+ flavors from mint to tropical fruits</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Multiple strengths:</strong> Range from 6mg to 22mg to suit different needs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Fully legal in Ireland:</strong> Available for purchase throughout the EU</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Completely discreet:</strong> No smoke, no vapor, no odor, no stains</span>
              </li>
            </ul>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Brands like <Link href="/products" className="text-primary hover:underline font-semibold">PUXX</Link> have
            perfected the nicotine pouch formula, offering premium tobacco-free options that deliver satisfying
            nicotine without any of the drawbacks of traditional tobacco products.
          </p>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            Nicotine Pouches vs Snus: Complete Comparison
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Here's a detailed side-by-side comparison of nicotine pouches and snus across all important factors:
          </p>

          <div className="overflow-x-auto rounded-xl border-2 border-border shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-green-600">
                  <th className="px-6 py-4 text-left text-sm font-heading text-white">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-heading text-white">Nicotine Pouches</th>
                  <th className="px-6 py-4 text-left text-sm font-heading text-white">Snus</th>
                  <th className="px-6 py-4 text-center text-sm font-heading text-white">Winner</th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t border-border ${index % 2 === 0 ? 'bg-muted/20' : 'bg-background'} hover:bg-primary/5 transition-colors`}
                  >
                    <td className="px-6 py-4 font-semibold text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.nicotinePouches}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.snus}</td>
                    <td className="px-6 py-4 text-center">
                      {row.winner === 'pouches' && (
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          <CheckCircle className="h-4 w-4" />
                          Pouches
                        </div>
                      )}
                      {row.winner === 'snus' && (
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                          <CheckCircle className="h-4 w-4" />
                          Snus
                        </div>
                      )}
                      {row.winner === 'tie' && (
                        <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          Tie
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                As the comparison shows, nicotine pouches win in most categories. They offer a cleaner, more
                convenient, and legally accessible alternative to traditional snus, with the added benefit of
                being completely tobacco-free.
              </p>
            </div>
          </div>
        </section>

        {/* Key Differences Deep Dive */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-8">
            Key Differences Explained
          </h2>

          {/* Tobacco Content */}
          <div className="mb-10">
            <h3 className="text-2xl font-heading text-foreground mb-4">1. Tobacco Content</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">This is the most significant difference.</strong> Snus contains
              actual ground tobacco leaves, exposing users to tobacco-specific nitrosamines (TSNAs), carcinogens,
              and other harmful compounds found in tobacco.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nicotine pouches, on the other hand, are completely tobacco-free. They use pharmaceutical-grade
              nicotine (either synthetic or extracted from tobacco but purified), combined with plant-based fibers,
              flavorings, and sweeteners. This eliminates exposure to tobacco-specific toxins while still delivering
              the desired nicotine effect.
            </p>
          </div>

          {/* Flavor Options */}
          <div className="mb-10">
            <h3 className="text-2xl font-heading text-foreground mb-4">2. Flavor Variety</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Snus is traditionally limited to tobacco, mint, and bergamot flavors due to its tobacco base.
              The natural tobacco taste dominates most snus products.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Nicotine pouches offer an extensive flavor range. <Link href="/products" className="text-primary hover:underline font-semibold">PUXX
              alone offers 14 different flavors</Link>, including:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Mint & Cool Flavors:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Ice Cool Mint</li>
                  <li>• Freeze</li>
                  <li>• Spearmint</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Fruit Flavors:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Tropical Breeze</li>
                  <li>• Berry Blast</li>
                  <li>• Watermelon</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Unique Flavors:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Cola</li>
                  <li>• Coffee</li>
                  <li>• Cinnamon</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">And More:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Citrus</li>
                  <li>• Grape</li>
                  <li>• Bubble Gum</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Health Considerations */}
          <div className="mb-10">
            <h3 className="text-2xl font-heading text-foreground mb-4">3. Health Considerations</h3>
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6 mb-4">
              <p className="text-sm text-amber-900 mb-2 font-semibold">Important Health Disclaimer:</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                Both nicotine pouches and snus contain nicotine, which is addictive. Neither product is risk-free.
                This comparison is for informational purposes and does not constitute medical advice. Consult
                healthcare professionals for personalized guidance.
              </p>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Snus Health Risks:</strong> While considered less harmful than
              smoking, snus still carries health risks due to tobacco content:
            </p>
            <ul className="space-y-2 mb-6 text-muted-foreground">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Exposure to tobacco-specific nitrosamines (carcinogens)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Increased risk of pancreatic and oral cancers (though lower than smoking)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Potential cardiovascular effects</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Gum recession and tooth damage</span>
              </li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Nicotine Pouches Health Profile:</strong> By eliminating tobacco,
              nicotine pouches reduce many risks:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>No exposure to tobacco-specific carcinogens</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>No tobacco smoke or combustion byproducts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Cleaner nicotine delivery method</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Reduced risk of tooth staining and gum damage</span>
              </li>
            </ul>
          </div>

          {/* Convenience and Discretion */}
          <div className="mb-10">
            <h3 className="text-2xl font-heading text-foreground mb-4">4. Convenience & Discretion</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Modern life demands discreet nicotine options that can be used anywhere without drawing attention.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h4 className="text-xl font-heading text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Snus Drawbacks
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Brown/dark colored pouches</li>
                  <li>• May require spitting</li>
                  <li>• Noticeable tobacco odor</li>
                  <li>• Can stain teeth over time</li>
                  <li>• Moist texture more visible</li>
                  <li>• Less socially acceptable</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-primary/30">
                <h4 className="text-xl font-heading text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Nicotine Pouch Benefits
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Pure white pouches</li>
                  <li>• No spitting required</li>
                  <li>• Minimal to no odor</li>
                  <li>• Won't stain teeth</li>
                  <li>• Completely discreet</li>
                  <li>• Socially acceptable everywhere</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Status */}
          <div className="mb-10">
            <h3 className="text-2xl font-heading text-foreground mb-4">5. Legal Status in Ireland & EU</h3>
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-4">
              <p className="text-foreground font-semibold mb-2">Important Legal Information:</p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Snus is banned for sale in all EU countries except Sweden</strong> under EU Tobacco Products
                Directive 2014/40/EU. This means you cannot legally purchase snus in Ireland or most of Europe.
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-primary rounded-r-lg p-6">
              <p className="text-foreground font-semibold mb-2">Nicotine Pouches Are Fully Legal:</p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Because nicotine pouches contain no tobacco, they're not subject to the same restrictions. They're
                fully legal to sell and purchase throughout Ireland and the EU for adults 18+.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This makes nicotine pouches the only legal oral nicotine option for Irish consumers seeking a
                tobacco-free alternative.
              </p>
            </div>
          </div>
        </section>

        {/* Which Is Better? */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            Which Is Better for Different Users?
          </h2>

          <div className="space-y-8">
            {/* For Most Users */}
            <div className="bg-gradient-to-br from-primary/5 to-green-50/50 rounded-xl p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                For Most Users: Nicotine Pouches Win
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                If you're looking for a modern, convenient, and cleaner nicotine experience, nicotine pouches are
                the clear choice. They offer:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Traditional Users */}
            <div className="bg-muted/50 rounded-xl p-8">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                For Traditional Snus Users
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                If you're a current snus user, transitioning to nicotine pouches is straightforward:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Same placement:</strong> Used the same way (under upper lip)</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Similar satisfaction:</strong> Delivers nicotine just as effectively</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Better experience:</strong> Cleaner, more flavors, no staining</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Actually legal:</strong> Can purchase in Ireland without restrictions</span>
                </li>
              </ul>
            </div>

            {/* For Beginners */}
            <div className="bg-muted/50 rounded-xl p-8">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                For Beginners to Oral Nicotine
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                If you're new to oral nicotine products, nicotine pouches are definitely the better starting point:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Easier to use:</strong> No mess, no spitting, no learning curve</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Multiple strengths:</strong> Start with 6mg and work up if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Better flavors:</strong> Find one you enjoy from 14+ options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>Lower health risk:</strong> Tobacco-free from day one</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why PUXX Nicotine Pouches */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            Why Choose PUXX Nicotine Pouches?
          </h2>
          <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-2xl p-10 text-white shadow-xl">
            <p className="text-xl leading-relaxed mb-6">
              At <strong>PUXX Ireland</strong>, we're proud to offer premium tobacco-free nicotine pouches that
              deliver the satisfaction you want without the tobacco you don't need.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-heading mb-3">Premium Quality</h3>
                <p className="text-white/90 leading-relaxed">
                  Every PUXX pouch is crafted with pharmaceutical-grade nicotine and the finest ingredients
                  for a consistently excellent experience.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-heading mb-3">14 Amazing Flavors</h3>
                <p className="text-white/90 leading-relaxed">
                  From refreshing mints to exotic fruits, we offer Ireland's widest selection of premium
                  nicotine pouch flavors.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-heading mb-3">100% Tobacco-Free</h3>
                <p className="text-white/90 leading-relaxed">
                  Zero tobacco means cleaner nicotine delivery without the health risks and drawbacks of
                  traditional tobacco products.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-heading mb-3">Fast Irish Delivery</h3>
                <p className="text-white/90 leading-relaxed">
                  3-5 day delivery across Ireland with discreet packaging and secure age verification on
                  every order.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 font-semibold"
              >
                <Link href="/products">
                  Explore PUXX Flavors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
            Final Verdict: Nicotine Pouches vs Snus
          </h2>
          <div className="bg-muted/50 rounded-xl p-8 mb-6">
            <p className="text-xl text-foreground font-semibold mb-4">
              For the vast majority of users, nicotine pouches are the superior choice.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              They deliver the same nicotine satisfaction as snus but with significant advantages: no tobacco,
              better flavors, cleaner experience, full legal availability in Ireland, and reduced health risks.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Snus may have historical significance and cultural importance in Scandinavia, but for Irish consumers,
              it's not even legally available. More importantly, with modern tobacco-free alternatives like PUXX
              nicotine pouches offering superior flavor, convenience, and safety, there's simply no compelling
              reason to seek out tobacco-based products.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're transitioning from traditional tobacco products, looking for a smoke-free nicotine
              option, or simply curious about modern nicotine pouches, the tobacco-free route is clearly the way
              forward.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-background border-2 border-border rounded-xl p-8">
            <h3 className="text-2xl font-heading text-foreground mb-6">Common Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Can I buy snus in Ireland?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  No. Snus is banned for sale in all EU countries except Sweden under the EU Tobacco Products
                  Directive. However, tobacco-free nicotine pouches like PUXX are fully legal and available.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Do nicotine pouches work as well as snus?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. Both deliver nicotine through oral absorption at comparable rates. Nicotine pouches provide
                  the same satisfaction without tobacco's drawbacks.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Are nicotine pouches safer than snus?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  While neither is risk-free (both contain addictive nicotine), nicotine pouches eliminate exposure
                  to tobacco-specific carcinogens and other harmful tobacco compounds, making them a reduced-risk
                  alternative.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Will nicotine pouches stain my teeth like snus?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  No. Nicotine pouches use white, tobacco-free materials that won't stain teeth. Snus contains
                  tobacco that can cause tooth discoloration over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary/10 via-green-50/50 to-background rounded-2xl p-10 text-center border-2 border-primary/20">
            <h2 className="text-3xl font-heading text-foreground mb-4">
              Ready to Make the Switch?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the superior alternative to snus with PUXX's premium tobacco-free nicotine pouches.
              14 flavors, 3 strengths, delivered fast across Ireland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/products">
                  Shop All Flavors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link href="/about">Learn More About PUXX</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              18+ only • Free shipping on orders over €30 • 3-5 day delivery across Ireland
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
