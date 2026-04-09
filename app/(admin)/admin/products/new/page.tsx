import { ProductForm } from '@/components/admin/products/ProductForm';

export const metadata = {
  title: 'Create Product | PUXX Admin',
  description: 'Add a new product to your catalog',
};

export default function NewProductPage() {
  return (
    <div className="p-6">
      <ProductForm mode="create" />
    </div>
  );
}
