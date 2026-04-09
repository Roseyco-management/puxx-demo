import { getDb } from './drizzle';
import { users, teams, teamMembers, products, profiles, orders, orderItems } from './schema';
import { hashPassword } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';

const FLAVOURS = [
  'Mango Ice',
  'Fresh Mint',
  'Citrus Burst',
  'Berry Blast',
  'Watermelon Chill',
  'Tropical Storm',
  'Spearmint',
  'Cool Menthol',
  'Blueberry Rush',
  'Apple Crisp',
  'Passion Fruit',
  'Blackcurrant Freeze',
];

const STRENGTHS = ['4mg', '6mg', '8mg', '12mg', '16mg', '20mg'];

// Flavours that have their 4mg variant featured
const FEATURED_FLAVOURS = new Set(['Mango Ice', 'Fresh Mint', 'Berry Blast']);

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function seedProducts() {
  const db = getDb();

  // Idempotent: clear existing products before re-seeding
  await db.delete(products);

  const variants = [];

  for (const flavour of FLAVOURS) {
    for (const strength of STRENGTHS) {
      const name = `${flavour} ${strength}`;
      const slug = toSlug(name);
      const isFeatured = FEATURED_FLAVOURS.has(flavour) && strength === '4mg';

      variants.push({
        name,
        slug,
        description: `PUXX ${flavour} nicotine pouches — ${strength} strength. Tobacco-free. 20 pouches per can.`,
        price: '6.00',
        nicotineStrength: strength,
        flavor: flavour,
        pouchesPerCan: 20,
        stockQuantity: 100,
        isActive: true,
        isFeatured,
        imageUrl: '/images/graphics/image.svg',
      });
    }
  }

  console.log('Seeding 72 product variants...');
  await db.insert(products).values(variants);
  console.log('Products seeded successfully.');
}

async function seedDemoAccount() {
  const db = getDb();

  // Idempotent: delete existing demo user (cascade deletes profile + orders via FK)
  await db.delete(users).where(eq(users.email, 'demo@puxx.com'));

  // Insert demo user
  const [demoUser] = await db.insert(users).values({
    name: 'Demo Customer',
    email: 'demo@puxx.com',
    passwordHash: await hashPassword('demo123'),
    role: 'member',
  }).returning();

  // Insert profile with referral codes and commission stub
  await db.insert(profiles).values({
    userId: demoUser.id,
    ageVerified: true,
    retailReferralCode: 'PUXX-R-DEMO1',
    wholesaleReferralCode: 'PUXX-W-DEMO1',
    commissionEarned: '24.50',
    marketingConsent: false,
  });

  const now = new Date();
  const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

  // Seed 4 stub orders with distinct statuses
  const stubOrders = [
    {
      orderNumber: 'PX-DEMO-0004',
      status: 'pending',
      subtotal: '18.00',
      total: '18.00',
      paymentStatus: 'pending',
      createdAt: daysAgo(3),
    },
    {
      orderNumber: 'PX-DEMO-0003',
      status: 'processing',
      subtotal: '24.00',
      total: '24.00',
      paymentStatus: 'pending',
      createdAt: daysAgo(14),
    },
    {
      orderNumber: 'PX-DEMO-0002',
      status: 'shipped',
      subtotal: '12.00',
      total: '12.00',
      paymentStatus: 'paid',
      createdAt: daysAgo(30),
    },
    {
      orderNumber: 'PX-DEMO-0001',
      status: 'delivered',
      subtotal: '36.00',
      total: '36.00',
      paymentStatus: 'paid',
      createdAt: daysAgo(60),
    },
  ];

  for (const stub of stubOrders) {
    const [order] = await db.insert(orders).values({
      userId: demoUser.id,
      orderNumber: stub.orderNumber,
      status: stub.status,
      subtotal: stub.subtotal,
      total: stub.total,
      currency: 'GBP',
      paymentMethod: 'worldpay',
      paymentStatus: stub.paymentStatus,
      shippingName: 'Demo Customer',
      shippingEmail: 'demo@puxx.com',
      shippingAddress: '1 Demo Street',
      shippingCity: 'London',
      shippingPostcode: 'SW1A 1AA',
      shippingCountry: 'GB',
      createdAt: stub.createdAt,
    }).returning();

    await db.insert(orderItems).values({
      orderId: order.id,
      productId: 1,
      productName: 'Mango Ice 4mg',
      quantity: 2,
      price: '6.00',
      total: stub.total,
    });
  }

  console.log('Demo account seeded: demo@puxx.com with 4 stub orders and referral profile.');
}

async function seed() {
  const db = getDb();
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: 'owner',
      },
    ])
    .returning();

  console.log('Initial user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  await seedProducts();
  await seedDemoAccount();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
