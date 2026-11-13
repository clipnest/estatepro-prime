import { CurrencyCode } from '../types';

export const EXCHANGE_RATES: Record<CurrencyCode, { rateToPKR: number; symbol: string; prefix: string; label: string }> = {
  PKR: { rateToPKR: 1, symbol: '₨', prefix: 'PKR', label: 'Pakistani Rupee (PKR)' },
  AED: { rateToPKR: 75.8, symbol: 'د.إ', prefix: 'AED', label: 'UAE Dirham (AED)' },
  USD: { rateToPKR: 278.0, symbol: '$', prefix: 'USD', label: 'US Dollar (USD)' },
  GBP: { rateToPKR: 352.5, symbol: '£', prefix: 'GBP', label: 'British Pound (GBP)' },
};

export function convertFromPKR(amountPKR: number, targetCurrency: CurrencyCode): number {
  const rate = EXCHANGE_RATES[targetCurrency].rateToPKR;
  return Math.round(amountPKR / rate);
}

export function formatPrice(amountPKR: number, currency: CurrencyCode, period?: string): string {
  const converted = convertFromPKR(amountPKR, currency);
  const info = EXCHANGE_RATES[currency];

  let formattedNumber = '';
  if (currency === 'PKR') {
    // Standard comma formatting or million/crore
    formattedNumber = converted.toLocaleString('en-US');
  } else {
    formattedNumber = converted.toLocaleString('en-US');
  }

  const periodSuffix = period ? ` ${period}` : '';
  return `${info.prefix} ${formattedNumber}${periodSuffix}`;
}
