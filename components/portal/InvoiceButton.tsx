import { Download } from 'lucide-react';

interface InvoiceButtonProps {
  orderId: number | string;
  orderNumber: string;
}

export default function InvoiceButton({ orderId, orderNumber }: InvoiceButtonProps) {
  return (
    <a
      href={`/api/portal/orders/${orderId}/invoice`}
      target="_blank"
      rel="noopener noreferrer"
      download={`PUXX-Invoice-${orderNumber}.pdf`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
    >
      <Download size={14} />
      Download Invoice
    </a>
  );
}
