export const dynamic = 'force-dynamic';

import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getRegionConfig } from '@/lib/config/regions';
import { ReferralCard } from '@/components/account/ReferralCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AffiliatePageProps {
  params: Promise<{ region: string }>;
}

const STUB_REFERRED = [
  { name: 'Sarah M.', email: 'sarah.m@example.com', joinedDate: '15 Jan 2026', status: 'Active', orders: 3 },
  { name: 'James T.', email: 'james.t@example.com', joinedDate: '3 Feb 2026', status: 'Active', orders: 1 },
  { name: 'Priya K.', email: 'priya.k@example.com', joinedDate: '22 Mar 2026', status: 'Pending', orders: 0 },
];

export default async function AffiliatePage({ params }: AffiliatePageProps) {
  const { region } = await params;
  const user = await getUser();

  if (!user) {
    redirect(`/${region}/sign-in`);
  }

  const config = getRegionConfig(region);
  const currencySymbol = config?.currencySymbol ?? '£';

  const supabase = getSupabaseClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your referral codes, referred customers, and commission summary
        </p>
      </div>

      <ReferralCard
        retailCode={profile?.retail_referral_code ?? null}
        wholesaleCode={profile?.wholesale_referral_code ?? null}
        commissionEarned={profile?.commission_earned ?? '0.00'}
        currencySymbol={currencySymbol}
      />

      <Card>
        <CardHeader>
          <CardTitle>Commission Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-emerald-600">
              {currencySymbol}{parseFloat(profile?.commission_earned ?? '0').toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Total commission earned to date</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Commission rates and payout schedule available in v1
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referred Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STUB_REFERRED.map((customer) => (
                <TableRow key={customer.email}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-gray-500">{customer.email}</TableCell>
                  <TableCell>{customer.joinedDate}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-gray-400 mt-3">
            Showing demo data — live referral tracking available in v1
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
