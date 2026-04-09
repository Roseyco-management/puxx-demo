import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Logo variant="black" size="lg" href="/" />
        </div>
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-6">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the product you're looking for. It may have
            been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
              Browse All Products
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
