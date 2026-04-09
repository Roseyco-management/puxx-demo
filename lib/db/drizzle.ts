import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// Check if database URL is properly configured (not a placeholder)
const isValidDatabaseUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  // Check if URL contains placeholder text
  if (url.includes('[PROJECT-REF]') || url.includes('[PASSWORD]') || url.includes('[REGION]')) {
    return false;
  }
  return true;
};

// Only initialize database if URL is valid
let client: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (isValidDatabaseUrl(process.env.POSTGRES_URL)) {
  try {
    client = postgres(process.env.POSTGRES_URL!);
    db = drizzle(client, { schema });
  } catch (error) {
    console.warn('Failed to initialize database connection:', error);
  }
} else {
  console.warn(
    '⚠️  Database not configured. Please update POSTGRES_URL in .env file.\n' +
    '   Get your database URL from: Supabase Dashboard -> Settings -> Database -> Connection string'
  );
}

// Helper function to get db and throw if not configured
export function getDb(): ReturnType<typeof drizzle<typeof schema>> {
  if (!db) {
    throw new Error('Database not configured. Please set POSTGRES_URL in your environment variables.');
  }
  return db as ReturnType<typeof drizzle<typeof schema>>;
}

// Export with type assertion - consumers should check for null
export { client, db };
