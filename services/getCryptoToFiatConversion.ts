import getCryptoConversion from './getCryptoConversion'
import getFiatRates from './getFiatRates'
import getUSDCTokenId from './getUSDCTokenId'
import getTokenIdFromSymbol from './getTokenIdFromSymbol'

async function getCryptoToUsdcConversion(amount: number, fromCrypto: string): Promise<number> {
  const usdcTokeId = await getUSDCTokenId()
  const cryptoId = await getTokenIdFromSymbol(fromCrypto)
  if (cryptoId === usdcTokeId) {
    return 1
  }
  return getCryptoConversion(amount, cryptoId, usdcTokeId)
}

// Note: for demonstration purposes only!
export default async function getCryptoToFiatConversion(amount: number, fromCrypto: string, toFiat: string): Promise<number> {

  const cryptoConversionRate = await getCryptoToUsdcConversion(amount, fromCrypto)
  const fiatRates = await getFiatRates()
  const fiatRate = Number(fiatRates.rates[toFiat])
  return cryptoConversionRate * fiatRate
}
