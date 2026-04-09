import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReferralCardProps {
  retailCode: string | null;
  wholesaleCode: string | null;
  commissionEarned: string | null; // decimal string e.g. "24.50"
  currencySymbol: string;
}

export function ReferralCard({
  retailCode,
  wholesaleCode,
  commissionEarned,
  currencySymbol,
}: ReferralCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Codes</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Retail Code Row */}
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-sm text-gray-600">Retail Code</span>
          <div className="flex items-center gap-2">
            {retailCode ? (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {retailCode}
              </code>
            ) : (
              <span className="text-sm text-gray-400">Not assigned</span>
            )}
            <Button variant="outline" size="sm">
              Copy
            </Button>
          </div>
        </div>

        {/* Wholesale Code Row */}
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-sm text-gray-600">Wholesale Code</span>
          <div className="flex items-center gap-2">
            {wholesaleCode ? (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {wholesaleCode}
              </code>
            ) : (
              <span className="text-sm text-gray-400">Not assigned</span>
            )}
            <Button variant="outline" size="sm">
              Copy
            </Button>
          </div>
        </div>

        <hr className="my-4" />

        {/* Commission Row */}
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-sm text-gray-600">Commission Earned</span>
          <span className="text-green-600 font-semibold">
            {currencySymbol}{parseFloat(commissionEarned ?? '0').toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
