'use client';

import { Address } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address;
}

export function AddressFormModal({ isOpen, onClose, address }: AddressFormModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: address?.name || '',
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    county: address?.county || '',
    eircode: address?.eircode || '',
    country: address?.country || 'IE',
    phone: address?.phone || '',
    isDefaultShipping: address?.isDefaultShipping || false,
    isDefaultBilling: address?.isDefaultBilling || false,
  });

  useEffect(() => {
    if (address) {
      setFormData({
        name: address.name,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        county: address.county || '',
        eircode: address.eircode || '',
        country: address.country,
        phone: address.phone || '',
        isDefaultShipping: address.isDefaultShipping,
        isDefaultBilling: address.isDefaultBilling,
      });
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const url = address
        ? `/api/account/addresses/${address.id}`
        : '/api/account/addresses';

      const method = address ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: address ? 'Address updated!' : 'Address added!' });
        router.refresh();
        setTimeout(() => {
          onClose();
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save address' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {address ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              required
              placeholder="Street address, P.O. box"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
            <Input
              id="addressLine2"
              type="text"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                placeholder="Dublin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County (Optional)</Label>
              <Input
                id="county"
                type="text"
                value={formData.county}
                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                placeholder="County Dublin"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="eircode">Eircode (Optional)</Label>
              <Input
                id="eircode"
                type="text"
                value={formData.eircode}
                onChange={(e) => setFormData({ ...formData, eircode: e.target.value.toUpperCase() })}
                placeholder="D02 XY45"
                maxLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+353 XX XXX XXXX"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isDefaultShipping"
                checked={formData.isDefaultShipping}
                onChange={(e) => setFormData({ ...formData, isDefaultShipping: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <Label htmlFor="isDefaultShipping" className="font-normal cursor-pointer">
                Set as default shipping address
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isDefaultBilling"
                checked={formData.isDefaultBilling}
                onChange={(e) => setFormData({ ...formData, isDefaultBilling: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <Label htmlFor="isDefaultBilling" className="font-normal cursor-pointer">
                Set as default billing address
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Saving...' : address ? 'Update Address' : 'Add Address'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
