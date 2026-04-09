'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, title: 'Cart', shortTitle: 'Cart' },
  { number: 2, title: 'Customer Info', shortTitle: 'Info' },
  { number: 3, title: 'Shipping', shortTitle: 'Shipping' },
  { number: 4, title: 'Method', shortTitle: 'Method' },
  { number: 5, title: 'Payment', shortTitle: 'Payment' },
  { number: 6, title: 'Confirm', shortTitle: 'Confirm' },
];

export function CheckoutProgress({ currentStep, totalSteps = 6 }: CheckoutProgressProps) {
  return (
    <div className="w-full">
      {/* Desktop Progress */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.slice(0, totalSteps).map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                    currentStep > step.number
                      ? 'bg-primary border-primary text-white'
                      : currentStep === step.number
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white border-gray-300 text-gray-400'
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'absolute top-12 text-xs font-medium whitespace-nowrap transition-colors',
                    currentStep >= step.number ? 'text-primary' : 'text-gray-400'
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 h-0.5 mx-2 -mt-6">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      currentStep > step.number
                        ? 'bg-primary'
                        : 'bg-gray-300'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-center gap-2">
          {steps.slice(0, totalSteps).map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step Circle (smaller on mobile) */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300',
                    currentStep > step.number
                      ? 'bg-primary border-primary text-white'
                      : currentStep === step.number
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white border-gray-300 text-gray-400'
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-semibold">{step.number}</span>
                  )}
                </div>
                {currentStep === step.number && (
                  <span className="absolute mt-10 text-xs font-medium text-primary whitespace-nowrap">
                    {step.shortTitle}
                  </span>
                )}
              </div>

              {/* Connector Line (smaller on mobile) */}
              {index < totalSteps - 1 && (
                <div className="w-6 h-0.5 mx-1">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      currentStep > step.number
                        ? 'bg-primary'
                        : 'bg-gray-300'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
