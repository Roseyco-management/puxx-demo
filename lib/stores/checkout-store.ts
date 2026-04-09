'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CustomerInfo {
  email: string;
  ageVerified: boolean;
  createAccount: boolean;
  password?: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  eircode?: string;
  phone: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface CheckoutData {
  customerInfo: CustomerInfo | null;
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod | null;
  couponCode?: string;
  couponDiscount?: number;
}

interface CheckoutStore {
  currentStep: number;
  checkoutData: CheckoutData;
  setCurrentStep: (step: number) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setCouponCode: (code: string, discount?: number) => void;
  resetCheckout: () => void;
  canProceedToStep: (step: number) => boolean;
}

const initialCheckoutData: CheckoutData = {
  customerInfo: null,
  shippingAddress: null,
  shippingMethod: null,
  couponCode: undefined,
  couponDiscount: undefined,
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      checkoutData: initialCheckoutData,

      setCurrentStep: (step) => {
        // Validate that we can proceed to this step
        if (get().canProceedToStep(step)) {
          set({ currentStep: step });
        }
      },

      setCustomerInfo: (info) => {
        set({
          checkoutData: {
            ...get().checkoutData,
            customerInfo: info,
          },
        });
      },

      setShippingAddress: (address) => {
        set({
          checkoutData: {
            ...get().checkoutData,
            shippingAddress: address,
          },
        });
      },

      setShippingMethod: (method) => {
        set({
          checkoutData: {
            ...get().checkoutData,
            shippingMethod: method,
          },
        });
      },

      setCouponCode: (code, discount) => {
        set({
          checkoutData: {
            ...get().checkoutData,
            couponCode: code,
            couponDiscount: discount,
          },
        });
      },

      resetCheckout: () => {
        set({
          currentStep: 1,
          checkoutData: initialCheckoutData,
        });
      },

      canProceedToStep: (step) => {
        const { checkoutData, currentStep } = get();

        // Can always go back to previous steps
        if (step <= currentStep) {
          return true;
        }

        // Step 1 is always accessible (Cart Review)
        if (step === 1) {
          return true;
        }

        // Step 2 requires no prerequisites (Customer Info)
        if (step === 2) {
          return true;
        }

        // Step 3 requires customer info
        if (step === 3) {
          return checkoutData.customerInfo !== null;
        }

        // Step 4 requires shipping address
        if (step === 4) {
          return (
            checkoutData.customerInfo !== null &&
            checkoutData.shippingAddress !== null
          );
        }

        // Step 5 requires shipping method
        if (step === 5) {
          return (
            checkoutData.customerInfo !== null &&
            checkoutData.shippingAddress !== null &&
            checkoutData.shippingMethod !== null
          );
        }

        // Step 6 is confirmation (requires payment to be complete)
        if (step === 6) {
          return (
            checkoutData.customerInfo !== null &&
            checkoutData.shippingAddress !== null &&
            checkoutData.shippingMethod !== null
          );
        }

        return false;
      },
    }),
    {
      name: 'puxx-checkout-storage',
    }
  )
);
