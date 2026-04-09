import { jsPDF } from 'jspdf';
import { OrderWithItems } from '@/lib/types/orders';

export function generateInvoicePDF(order: OrderWithItems) {
  const doc = new jsPDF();

  // Colors
  const primaryGreen = [16, 185, 129]; // Emerald-500
  const darkGray = [55, 65, 81]; // Gray-700
  const lightGray = [156, 163, 175]; // Gray-400

  // Page margins
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Current Y position
  let yPos = margin;

  // Helper function to add text
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    doc.setFont('helvetica', options.style || 'normal');
    doc.setFontSize(options.size || 10);
    if (options.color) {
      doc.setTextColor(options.color[0], options.color[1], options.color[2]);
    } else {
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    }
    doc.text(text, x, y, options);
  };

  // Header - Company Info
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  addText('PUXX IRELAND', margin, 20, {
    size: 24,
    style: 'bold',
    color: [255, 255, 255],
  });

  addText('Premium Nicotine Pouches', margin, 28, {
    size: 10,
    color: [255, 255, 255],
  });

  yPos = 50;

  // Company details (right side)
  const companyInfo = [
    'PUXX Ireland Ltd.',
    'Dublin, Ireland',
    'VAT: IE1234567T',
    'www.puxxnicotine.ie',
  ];

  companyInfo.forEach((line, index) => {
    addText(line, pageWidth - margin, yPos + index * 5, {
      align: 'right',
      size: 9,
      color: lightGray,
    });
  });

  yPos += 30;

  // Invoice title and number
  addText('INVOICE', margin, yPos, {
    size: 20,
    style: 'bold',
    color: primaryGreen,
  });

  addText(order.orderNumber, pageWidth - margin, yPos, {
    size: 12,
    style: 'bold',
    align: 'right',
  });

  yPos += 10;

  // Invoice date
  const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  addText(`Date: ${invoiceDate}`, margin, yPos, {
    size: 10,
    color: lightGray,
  });

  yPos += 15;

  // Billing information
  addText('BILL TO:', margin, yPos, {
    size: 10,
    style: 'bold',
  });

  yPos += 7;

  const billingInfo = [
    order.shippingName,
    order.shippingAddress,
    `${order.shippingCity}, ${order.shippingPostcode}`,
    order.shippingCountry,
    order.shippingEmail,
  ];

  if (order.shippingPhone) {
    billingInfo.push(order.shippingPhone);
  }

  billingInfo.forEach((line) => {
    addText(line, margin, yPos, { size: 10 });
    yPos += 5;
  });

  yPos += 10;

  // Items table header
  const tableStartY = yPos;
  const colWidths = {
    product: 80,
    sku: 35,
    qty: 20,
    price: 30,
    total: 30,
  };

  // Table header background
  doc.setFillColor(243, 244, 246); // Gray-100
  doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');

  // Table headers
  addText('Product', margin + 2, yPos, { style: 'bold', size: 9 });
  addText('SKU', margin + colWidths.product, yPos, { style: 'bold', size: 9 });
  addText('Qty', margin + colWidths.product + colWidths.sku, yPos, {
    style: 'bold',
    size: 9,
  });
  addText('Price', margin + colWidths.product + colWidths.sku + colWidths.qty, yPos, {
    style: 'bold',
    size: 9,
  });
  addText(
    'Total',
    pageWidth - margin - 2,
    yPos,
    { style: 'bold', size: 9, align: 'right' }
  );

  yPos += 8;

  // Table items
  order.items.forEach((item) => {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = margin;
    }

    addText(item.productName, margin + 2, yPos, { size: 9 });
    addText(item.productSku || '-', margin + colWidths.product, yPos, { size: 9 });
    addText(item.quantity.toString(), margin + colWidths.product + colWidths.sku, yPos, {
      size: 9,
    });
    addText(
      `€${parseFloat(item.price).toFixed(2)}`,
      margin + colWidths.product + colWidths.sku + colWidths.qty,
      yPos,
      { size: 9 }
    );
    addText(`€${parseFloat(item.total).toFixed(2)}`, pageWidth - margin - 2, yPos, {
      size: 9,
      align: 'right',
    });

    yPos += 6;
  });

  yPos += 5;

  // Divider line
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  yPos += 10;

  // Summary section
  const summaryX = pageWidth - margin - 60;
  const valueX = pageWidth - margin - 2;

  const summaryItems = [
    { label: 'Subtotal:', value: order.subtotal },
    { label: 'Shipping:', value: order.shippingCost },
    { label: 'Tax (VAT 23%):', value: order.tax },
  ];

  if (parseFloat(order.discount) > 0) {
    summaryItems.push({ label: 'Discount:', value: order.discount });
  }

  summaryItems.forEach((item) => {
    addText(item.label, summaryX, yPos, { size: 10, color: lightGray });
    addText(`€${parseFloat(item.value).toFixed(2)}`, valueX, yPos, {
      size: 10,
      align: 'right',
    });
    yPos += 6;
  });

  yPos += 3;

  // Total background
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(summaryX - 5, yPos - 5, 65, 10, 'F');

  addText('TOTAL:', summaryX, yPos, {
    size: 12,
    style: 'bold',
    color: [255, 255, 255],
  });
  addText(`€${parseFloat(order.total).toFixed(2)}`, valueX, yPos, {
    size: 12,
    style: 'bold',
    align: 'right',
    color: [255, 255, 255],
  });

  yPos += 20;

  // Payment information
  addText('Payment Information', margin, yPos, {
    size: 11,
    style: 'bold',
  });

  yPos += 7;

  const paymentInfo = [
    `Payment Method: ${order.paymentMethod || 'Credit Card'}`,
    `Payment Status: ${order.paymentStatus.toUpperCase()}`,
    `Transaction ID: ${order.stripePaymentIntentId || 'N/A'}`,
  ];

  paymentInfo.forEach((line) => {
    addText(line, margin, yPos, { size: 9, color: lightGray });
    yPos += 5;
  });

  // Footer
  const footerY = pageHeight - 30;
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  const footerText = [
    'Thank you for your business!',
    'For questions about this invoice, please contact support@puxxnicotine.ie',
    'All sales are subject to our Terms & Conditions available at www.puxxnicotine.ie/terms',
  ];

  footerText.forEach((line, index) => {
    addText(line, pageWidth / 2, footerY + 7 + index * 5, {
      size: 8,
      color: lightGray,
      align: 'center',
    });
  });

  return doc;
}

export function downloadInvoice(order: OrderWithItems) {
  const doc = generateInvoicePDF(order);
  doc.save(`PUXX-Invoice-${order.orderNumber}.pdf`);
}

export function getInvoiceBlob(order: OrderWithItems): Blob {
  const doc = generateInvoicePDF(order);
  return doc.output('blob');
}
