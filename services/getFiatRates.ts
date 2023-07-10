export default async function getFiatRates(): Promise<CurrencyRates> {
  const response = await fetch(`https://test.payglide.io/api/v1/currencies/usd`)
  const { rates, base } = await response.json()
  return { rates, base }
}

export interface CurrencyRates {
  rates: Record<string, string>
  base: String
}