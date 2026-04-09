import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { addresses } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddressCard } from '@/components/account/AddressCard';
import { AddAddressButton } from '@/components/account/AddAddressButton';
import { MapPin, Plus } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AddressesPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!db) {
    throw new Error('Database not configured');
  }

  // Get user addresses
  const userAddresses = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, user.id))
    .orderBy(desc(addresses.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
          <p className="text-gray-600 mt-2">
            Manage your delivery and billing addresses
          </p>
        </div>
        <AddAddressButton />
      </div>

      {/* Addresses List */}
      {userAddresses.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No addresses saved
              </h3>
              <p className="text-gray-600 mb-6">
                Add an address to make checkout faster
              </p>
              <AddAddressButton />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userAddresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}
    </div>
  );
}
