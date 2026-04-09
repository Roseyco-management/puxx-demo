import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog | PUXX Ireland - Nicotine Pouch Guides & Information',
  description:
    'Learn everything about nicotine pouches with our comprehensive guides, tips, and educational content. Stay informed about tobacco-free nicotine alternatives in Ireland.',
  openGraph: {
    title: 'PUXX Ireland Blog - Nicotine Pouch Education & Guides',
    description: 'Expert guides and information about nicotine pouches, usage tips, and tobacco-free alternatives.',
  },
};

const blogPosts = [
  {
    slug: 'what-are-nicotine-pouches',
    title: 'What Are Nicotine Pouches? Complete Guide (2025)',
    excerpt:
      'Discover everything about nicotine pouches in our comprehensive guide. Learn how they work, how to use them, benefits vs traditional tobacco, and safety information.',
    date: 'January 15, 2025',
    readTime: '8 min read',
    category: 'Education & Guides',
    featured: true,
  },
  // Future blog posts will be added here
];

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden min-h-[500px] lg:min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/marketing/puxx-banner-fruit.jpg"
            alt="PUXX Ireland Blog - Nicotine Pouch Education & Guides"
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
              <span className="text-green-400">PUXX</span> Blog
            </h1>
            <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-medium">
              Your trusted source for nicotine pouch education, guides, and insights
            </p>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-white" />
                <span className="font-medium">Expert Guides</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-white" />
                <span className="font-medium">Latest Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-white" />
                <span className="font-medium">Community Tips</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-primary rounded"></div>
              <h2 className="text-2xl font-heading text-foreground">Featured Article</h2>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block group"
            >
              <div className="bg-gradient-to-br from-primary/10 to-green-600/10 border-2 border-primary/20 rounded-2xl p-8 lg:p-12 hover:border-primary hover:shadow-xl transition-all">
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                  <span className="inline-block px-3 py-1 bg-primary text-white rounded-full font-semibold">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Read Full Article
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All Posts */}
        {regularPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-primary rounded"></div>
              <h2 className="text-2xl font-heading text-foreground">All Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="bg-muted/30 border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold text-xs">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <div className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon Section */}
        <section className="py-12 lg:py-16">
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-dashed border-border rounded-2xl p-8 lg:p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl sm:text-3xl font-heading text-foreground mb-4">
              More Articles Coming Soon
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're constantly creating new content to help you make informed decisions about nicotine pouches. Check back soon for more guides, tips, and educational articles.
            </p>
            <Button asChild size="lg" className="gradient-emerald">
              <Link href="/products">
                Explore Our Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Newsletter/Contact CTA */}
        <section className="py-12">
          <div className="bg-gradient-to-br from-primary via-green-600 to-emerald-600 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-heading mb-4">
              Have Questions?
            </h3>
            <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto">
              Our team is here to help you understand nicotine pouches and find the perfect product for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
              >
                <Link href="/faq">Visit FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
