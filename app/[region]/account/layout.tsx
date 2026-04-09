import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AccountNav } from '@/components/account/AccountNav';
import { db } from '@/lib/db/drizzle';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Force dynamic rendering for all account pages
export const dynamic = 'force-dynamic';

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const user = await getUser();

  if (!user) {
    redirect(`/${region}/sign-in`);
  }

  let profile = null;
  if (db) {
    const profileResult = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);
    profile = profileResult[0] || null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={`/${region}`} className="text-2xl font-bold text-green-600">
              PUXX
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {user.name || user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <AccountNav user={user} profile={profile} />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
