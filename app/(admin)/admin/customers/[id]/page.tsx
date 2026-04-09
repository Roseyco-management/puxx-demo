"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, ExternalLink, Trash2 } from "lucide-react";
import { CustomerProfile } from "@/components/admin/customers/CustomerProfile";
import { CustomerOrderHistory } from "@/components/admin/customers/CustomerOrderHistory";
import { CustomerNotes } from "@/components/admin/customers/CustomerNotes";
import { toast } from "sonner";

interface Address {
  id: number;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  eircode?: string;
  country: string;
  phone?: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCustomer();
  }, [params.id]);

  async function fetchCustomer() {
    try {
      const response = await fetch(`/api/admin/customers/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setCustomer(data.customer);
        setAddresses(data.customer.addresses || []);
      } else {
        toast.error('Customer not found');
        router.push('/admin/customers');
      }
    } catch (error) {
      toast.error('Failed to load customer');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/customers/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Customer deleted successfully');
        router.push('/admin/customers');
      } else {
        toast.error('Failed to delete customer');
      }
    } catch (error) {
      toast.error('Failed to delete customer');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/customers')}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Details
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage customer information
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(`mailto:${customer.email}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Mail size={16} />
            Send Email
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete Customer
          </button>
        </div>
      </div>

      {/* Customer Profile */}
      <CustomerProfile customer={customer} />

      {/* Saved Addresses */}
      {addresses.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Saved Addresses
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {addresses.length} address{addresses.length !== 1 ? 'es' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {address.name}
                    </p>
                    {(address.isDefaultShipping || address.isDefaultBilling) && (
                      <div className="flex gap-2 mt-1">
                        {address.isDefaultShipping && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded dark:bg-emerald-900/20 dark:text-emerald-400">
                            Default Shipping
                          </span>
                        )}
                        {address.isDefaultBilling && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-900/20 dark:text-blue-400">
                            Default Billing
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}
                    {address.county && `, ${address.county}`}
                  </p>
                  {address.eircode && <p>{address.eircode}</p>}
                  <p>{address.country}</p>
                  {address.phone && <p className="mt-1">Tel: {address.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      <CustomerOrderHistory customerId={params.id} />

      {/* Admin Notes */}
      <CustomerNotes customerId={params.id} />
    </div>
  );
}
