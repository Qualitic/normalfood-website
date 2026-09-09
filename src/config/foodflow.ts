import type { DietId } from '../data/diets';

function fullUrl(value: string | undefined, name: string): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    throw new Error(`${name}: wymagany pełny adres HTTP(S) bez danych logowania.`);
  }
  return value.trim();
}

export const orderUrl = fullUrl(import.meta.env.PUBLIC_FOODFLOW_ORDER_URL, 'PUBLIC_FOODFLOW_ORDER_URL')
  ?? 'https://foodflow.qualitic.pl';

const dietOrderUrls: Partial<Record<DietId, string | undefined>> = {
  standard: fullUrl(import.meta.env.PUBLIC_FOODFLOW_STANDARD_URL, 'PUBLIC_FOODFLOW_STANDARD_URL'),
  wege: fullUrl(import.meta.env.PUBLIC_FOODFLOW_WEGE_URL, 'PUBLIC_FOODFLOW_WEGE_URL'),
  sport: fullUrl(import.meta.env.PUBLIC_FOODFLOW_SPORT_URL, 'PUBLIC_FOODFLOW_SPORT_URL'),
  lunch: fullUrl(import.meta.env.PUBLIC_FOODFLOW_LUNCH_URL, 'PUBLIC_FOODFLOW_LUNCH_URL'),
};

export function getOrderUrl(diet?: DietId): string {
  return (diet ? dietOrderUrls[diet] : undefined) ?? orderUrl;
}
