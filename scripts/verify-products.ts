/**
 * Verify products are in the database
 */

import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL!;
const sql = postgres(connectionString);

async function verify() {
  try {
    console.log('📊 Verifying product data...\n');

    // Count products
    const productCount = await sql`SELECT COUNT(*) as count FROM products`;
    console.log(`✅ Total products: ${productCount[0].count}`);

    // Count categories
    const categoryCount = await sql`SELECT COUNT(*) as count FROM categories`;
    console.log(`✅ Total categories: ${categoryCount[0].count}\n`);

    // Get all products
    const products = await sql`
      SELECT name, nicotine_strength, flavor, price, is_featured, image_url
      FROM products
      ORDER BY name
    `;

    console.log('Products in database:');
    console.log('━'.repeat(80));
    products.forEach((p, i) => {
      const featured = p.is_featured ? '⭐' : '  ';
      console.log(`${featured} ${(i + 1).toString().padStart(2)}. ${p.name.padEnd(30)} ${p.nicotine_strength.padEnd(5)} €${p.price}`);
    });
    console.log('━'.repeat(80));

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await sql.end();
    process.exit(1);
  }
}

verify();
