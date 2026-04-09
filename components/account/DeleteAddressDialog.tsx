'use client';

import { Address } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address;
}

export function DeleteAddressDialog({ isOpen, onClose, address }: DeleteAddressDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/account/addresses/${address.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
        onClose();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete address');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Delete Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Are you sure you want to delete this address?
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium">{address.name}</p>
                <p>{address.addressLine1}</p>
                <p>{address.city}, {address.eircode}</p>
              </div>
              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Address'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
