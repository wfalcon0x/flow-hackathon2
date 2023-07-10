import getCryptoToFiatConversion from '../../../services/getCryptoToFiatConversion'
import { randomUUID } from 'crypto'

const PROCESSING_FEE_PERCENT = 0.01;
const QUOTE_EXPIRY_MILLISECONDS = 20 * 1000;

export default async function handler(req, res) {
  const query = req.query;
  const { cryptoAmount, fromCrypto, toFiat } = query
  console.log(JSON.stringify(query))
  const currentTime = new Date()
  const expiryTime = new Date(currentTime.getTime() + QUOTE_EXPIRY_MILLISECONDS)
  try {
    const conversionRate = await getCryptoToFiatConversion(1, fromCrypto, toFiat)
    const fiatAmount = conversionRate * Number(cryptoAmount)
    const processingFee = fiatAmount * PROCESSING_FEE_PERCENT
    const total = fiatAmount - processingFee
    const quote = {
      id: randomUUID(),
      conversionRate,
      cryptoAmount,
      cryptoCurrency: fromCrypto,
      fiatAmount: fiatAmount + '',
      fiatCurrency: toFiat,
      fees: {
        breakdowns: [
          {
            description: 'Network Fee',
            amount: '0.00',
            currency: toFiat
          },
          {
            description: 'Processing Fee',
            amount: processingFee + '',
            currency: toFiat
          }
        ],
        total: {
          description: 'Total Fees',
          amount: total + '',
          currency: toFiat
        }
      },
      createdAt: currentTime.toISOString(),
      expiresAt: expiryTime.toISOString()
    }
    console.log(quote)
    res.status(200).json(quote)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
