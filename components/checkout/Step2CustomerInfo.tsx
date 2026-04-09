'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckoutStore } from '@/lib/stores/checkout-store';
import {
  customerInfoSchema,
  type CustomerInfoFormData,
} from '@/lib/validations/checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step2CustomerInfoProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function Step2CustomerInfo({ onNext, onPrevious }: Step2CustomerInfoProps) {
  const { checkoutData, setCustomerInfo } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      email: checkoutData.customerInfo?.email || '',
      ageVerified: checkoutData.customerInfo?.ageVerified || false,
      createAccount: checkoutData.customerInfo?.createAccount || false,
      password: checkoutData.customerInfo?.password || '',
    },
  });

  const ageVerified = watch('ageVerified');
  const createAccount = watch('createAccount');

  const onSubmit = async (data: CustomerInfoFormData) => {
    setCustomerInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-heading text-foreground">
            Customer Information
          </h2>
        </div>
        <p className="text-muted-foreground ml-13">
          Enter your email and verify your age to continue
        </p>
      </div>

      {/* Email Address */}
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            We'll send your order confirmation to this email
          </p>
        </div>
      </div>

      {/* Age Verification */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 mt-1 flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Age Verification Required
              </h3>
              <p className="text-sm text-muted-foreground">
                You must be 18 years or older to purchase nicotine products
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="ageVerified"
                checked={ageVerified}
                onCheckedChange={(checked) => setValue('ageVerified', checked as boolean)}
                aria-invalid={!!errors.ageVerified}
                className={cn(
                  'mt-1',
                  errors.ageVerified && 'border-destructive'
                )}
              />
              <div className="flex-1">
                <Label
                  htmlFor="ageVerified"
                  className="font-normal cursor-pointer leading-tight"
                >
                  I confirm that I am 18 years of age or older
                </Label>
                {errors.ageVerified && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                    <AlertCircle className="h-3 w-3" />
                    {errors.ageVerified.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Account Option */}
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="createAccount"
            checked={createAccount}
            onCheckedChange={(checked) => setValue('createAccount', checked as boolean)}
          />
          <div className="flex-1">
            <Label
              htmlFor="createAccount"
              className="font-semibold cursor-pointer"
            >
              Create an account for faster checkout
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Save your information for future purchases and track your orders
            </p>
          </div>
        </div>

        {/* Password Field (shown when createAccount is checked) */}
        {createAccount && (
          <div className="space-y-2 pl-7 pt-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Choose a secure password"
              {...register('password')}
              aria-invalid={!!errors.password}
              className={cn(errors.password && 'border-destructive')}
            />
            {errors.password && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.password.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>
        )}
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
          Back to Cart
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gradient-emerald min-w-[200px]"
          size="lg"
        >
          {isSubmitting ? 'Validating...' : 'Continue to Shipping'}
        </Button>
      </div>
    </form>
  );
}
