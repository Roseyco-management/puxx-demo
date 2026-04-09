'use client';

import { toast } from 'sonner';

export default function InvoiceButton() {
  return (
    <button
      onClick={() => toast.info('Invoice download coming in v1')}
      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
    >
      Download Invoice
    </button>
  );
}
