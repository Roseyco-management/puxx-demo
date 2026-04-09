'use client';

import { Address } from '@/lib/db/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressFormModal } from './AddressFormModal';
import { DeleteAddressDialog } from './DeleteAddressDialog';

interface AddressCardProps {
  address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSetDefault = async (type: 'shipping' | 'billing') => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/account/addresses/${address.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...address,
          isDefaultShipping: type === 'shipping' ? true : address.isDefaultShipping,
          isDefaultBilling: type === 'billing' ? true : address.isDefaultBilling,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update address:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Card className="relative hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{address.name}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {address.isDefaultShipping && (
                    <Badge variant="success" className="text-xs">
                      Default Shipping
                    </Badge>
                  )}
                  {address.isDefaultBilling && (
                    <Badge variant="info" className="text-xs">
                      Default Billing
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm text-gray-700 mb-4">
            <p>{address.addressLine1}</p>
            {address.addressLine2 && <p>{address.addressLine2}</p>}
            <p>
              {address.city}
              {address.county && `, ${address.county}`}
            </p>
            {address.eircode && <p>{address.eircode}</p>}
            <p>{address.country === 'IE' ? 'Ireland' : address.country}</p>
            {address.phone && <p className="mt-2">{address.phone}</p>}
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 min-w-[100px]"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>

            {!address.isDefaultShipping && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSetDefault('shipping')}
                disabled={isUpdating}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 text-xs"
              >
                Set as Default Shipping
              </Button>
            )}

            {!address.isDefaultBilling && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSetDefault('billing')}
                disabled={isUpdating}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
              >
                Set as Default Billing
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddressFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        address={address}
      />

      <DeleteAddressDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        address={address}
      />
    </>
  );
}
