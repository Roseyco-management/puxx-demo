'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckoutStore } from '@/lib/stores/checkout-store';
import {
  shippingAddressSchema,
  type ShippingAddressFormData,
} from '@/lib/validations/checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, MapPin, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step3ShippingAddressProps {
  onNext: () => void;
  onPrevious: () => void;
}

const IRISH_COUNTIES = [
  'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin',
  'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim',
  'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan',
  'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford',
  'Westmeath', 'Wexford', 'Wicklow',
];

export function Step3ShippingAddress({ onNext, onPrevious }: Step3ShippingAddressProps) {
  const { checkoutData, setShippingAddress } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: checkoutData.shippingAddress?.fullName || '',
      addressLine1: checkoutData.shippingAddress?.addressLine1 || '',
      addressLine2: checkoutData.shippingAddress?.addressLine2 || '',
      city: checkoutData.shippingAddress?.city || '',
      county: checkoutData.shippingAddress?.county || '',
      eircode: checkoutData.shippingAddress?.eircode || '',
      phone: checkoutData.shippingAddress?.phone || '',
    },
  });

  const onSubmit = async (data: ShippingAddressFormData) => {
    setShippingAddress(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-heading text-foreground">
            Shipping Address
          </h2>
        </div>
        <p className="text-muted-foreground ml-13">
          Enter your Irish delivery address
        </p>
      </div>

      {/* Shipping Address Form */}
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            {...register('fullName')}
            aria-invalid={!!errors.fullName}
            className={cn(errors.fullName && 'border-destructive')}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            type="text"
            placeholder="123 Main Street"
            {...register('addressLine1')}
            aria-invalid={!!errors.addressLine1}
            className={cn(errors.addressLine1 && 'border-destructive')}
          />
          {errors.addressLine1 && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="space-y-2">
          <Label htmlFor="addressLine2">
            Address Line 2{' '}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Input
            id="addressLine2"
            type="text"
            placeholder="Apartment, suite, etc."
            {...register('addressLine2')}
          />
        </div>

        {/* City and County */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City/Town</Label>
            <Input
              id="city"
              type="text"
              placeholder="Dublin"
              {...register('city')}
              aria-invalid={!!errors.city}
              className={cn(errors.city && 'border-destructive')}
            />
            {errors.city && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="county">
              County{' '}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <select
              id="county"
              {...register('county')}
              className={cn(
                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              )}
            >
              <option value="">Select County</option>
              {IRISH_COUNTIES.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Eircode and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="eircode">
              Eircode{' '}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="eircode"
              type="text"
              placeholder="D02 XY45"
              maxLength={8}
              {...register('eircode')}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              aria-invalid={!!errors.eircode}
              className={cn(errors.eircode && 'border-destructive')}
            />
            {errors.eircode && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.eircode.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Format: ABC D123 or ABCD123
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+353 87 123 4567"
              {...register('phone')}
              aria-invalid={!!errors.phone}
              className={cn(errors.phone && 'border-destructive')}
            />
            {errors.phone && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phone.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              For delivery updates
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Delivery to Ireland only:</strong> We currently deliver to all counties in the Republic of Ireland. Standard delivery takes 2-3 business days.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="min-w-[140px]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gradient-emerald min-w-[200px]"
          size="lg"
        >
          {isSubmitting ? 'Saving...' : 'Continue to Shipping Method'}
        </Button>
      </div>
    </form>
  );
}
