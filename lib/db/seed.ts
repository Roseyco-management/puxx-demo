import { getDb } from './drizzle';
import { users, teams, teamMembers, products } from './schema';
import { hashPassword } from '@/lib/auth/session';

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
