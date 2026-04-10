import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AccountNav } from '@/components/account/AccountNav';
import { getSupabaseClient } from '@/lib/db/supabase';

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

  const supabase = getSupabaseClient();
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .limit(1)
    .single();
  const profile = profileData || null;

  return (
    <div className="min-h-screen bg-gray-50">
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
          <AccountNav user={user} profile={profile} region={region} />

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
