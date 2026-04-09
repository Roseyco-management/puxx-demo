export type RegionCode = 'ca' | 'uk' | 'us';

export interface RegionConfig {
  currency: 'CAD' | 'GBP' | 'USD';
  currencySymbol: string;
  locale: string;
  paymentMethod: string;
  countryCode: string;
  flagEmoji: string;
  basePrice: number;
}

export type RegionContextValue = {
  region: RegionCode;
  config: RegionConfig;
};

export const VALID_REGIONS: RegionCode[] = ['ca', 'uk', 'us'];

export const REGIONS: Record<RegionCode, RegionConfig> = {
  ca: {
    currency: 'CAD',
    currencySymbol: 'CA$',
    locale: 'en-CA',
    paymentMethod: 'Gift Card',
    countryCode: 'CA',
    flagEmoji: '🇨🇦',
    basePrice: 6.50,
  },
  uk: {
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    paymentMethod: 'WorldPay',
    countryCode: 'GB',
    flagEmoji: '🇬🇧',
    basePrice: 6.00,
  },
  us: {
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    paymentMethod: 'Gift Card',
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    basePrice: 4.99,
  },
};

export function getRegionConfig(region: string): RegionConfig {
  if (!VALID_REGIONS.includes(region as RegionCode)) {
    throw new Error(`Unknown region: ${region}`);
  }
  return REGIONS[region as RegionCode];
}
