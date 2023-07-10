import getCryptoConversion from './getCryptoConversion'
import getFiatRates from './getFiatRates'
import getUSDCTokenId from './getUSDCTokenId'
import getTokenIdFromSymbol from './getTokenIdFromSymbol'

// Note: for demonstration purposes only!
export default async function getCryptoToFiatConversion(amount: number, fromCrypto: string, toFiat: string): Promise<number> {
  const cryptoId = await getTokenIdFromSymbol(fromCrypto)
  const cryptoConversionRate = await getCryptoConversion(amount, cryptoId, await getUSDCTokenId())
  const fiatRates = await getFiatRates()
  const fiatRate = Number(fiatRates.rates[toFiat])
  return cryptoConversionRate * fiatRate
}
