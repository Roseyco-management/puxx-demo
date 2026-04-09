/**
 * Test database connection
 */

import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

console.log('Testing database connection...\n');
console.log('Connection string:', connectionString?.replace(/:[^:@]+@/, ':****@'));

if (!connectionString) {
  console.error('❌ POSTGRES_URL not set');
  process.exit(1);
}

const sql = postgres(connectionString);

async function test() {
  try {
    const result = await sql`SELECT current_database(), current_user, version()`;
    console.log('\n✅ Connection successful!');
    console.log('Database:', result[0].current_database);
    console.log('User:', result[0].current_user);
    console.log('Version:', result[0].version.split(' ')[0], result[0].version.split(' ')[1]);

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:',error);
    await sql.end();
    process.exit(1);
  }
}

test();
