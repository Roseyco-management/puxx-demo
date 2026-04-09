import { getDb } from '@/lib/db/drizzle';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
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
  const db = getDb();
  const allProducts = await db.select().from(products).where(eq(products.isActive, true));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Catalogue</h1>
        <p className="text-sm text-gray-500 mt-1">
          Wholesale pricing — 20% trade discount · {allProducts.length} products
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
              {allProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.nicotineStrength ? (
                      <Badge variant="secondary">{product.nicotineStrength}</Badge>
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
                  <TableCell>{product.stockQuantity}</TableCell>
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
