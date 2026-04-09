export const dynamic = 'force-dynamic';

import { getSupabaseClient } from '@/lib/db/supabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function PortalProductsPage() {
  const supabase = getSupabaseClient();
  const { data: allProducts, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  const products = error || !allProducts ? [] : allProducts;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Catalogue</h1>
        <p className="text-sm text-gray-500 mt-1">
          Wholesale pricing — 20% trade discount · {products.length} products
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>RRP</TableHead>
                <TableHead>Trade Price</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.nicotine_strength ? (
                      <Badge variant="secondary">{product.nicotine_strength}</Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>£{product.price}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-emerald-600">
                      £{(parseFloat(product.price) * 0.8).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
