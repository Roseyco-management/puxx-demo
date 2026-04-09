import { describe, it, expect } from 'vitest';
import { getRegionConfig, VALID_REGIONS } from './regions';

describe('getRegionConfig', () => {
  it('returns UK config', () => {
    const cfg = getRegionConfig('uk');
    expect(cfg.currency).toBe('GBP');
    expect(cfg.currencySymbol).toBe('£');
    expect(cfg.paymentMethod).toBe('WorldPay');
    expect(cfg.countryCode).toBe('GB');
  });
  it('returns CA config', () => {
    const cfg = getRegionConfig('ca');
    expect(cfg.currency).toBe('CAD');
    expect(cfg.paymentMethod).toBe('Gift Card');
  });
  it('returns US config', () => {
    const cfg = getRegionConfig('us');
    expect(cfg.currency).toBe('USD');
    expect(cfg.currencySymbol).toBe('$');
  });
  it('throws on unknown region', () => {
    expect(() => getRegionConfig('xx')).toThrow('Unknown region: xx');
  });
  it('VALID_REGIONS contains exactly ca, uk, us', () => {
    expect(VALID_REGIONS).toEqual(expect.arrayContaining(['ca', 'uk', 'us']));
    expect(VALID_REGIONS).toHaveLength(3);
  });
});
