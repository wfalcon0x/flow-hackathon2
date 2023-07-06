const EXAMPLE_QUOTE = {
  id: '3f5296bc-6640-64c2-9102-c86c6e8917ea',
  conversionRate: '0.51',
  cryptoAmount: '10.00',
  cryptoCurrency: 'FLOW',
  fiatAmount: '5.10',
  fiatCurrency: 'GBP',
  fees: {
    breakdowns: [
        {
            description: 'Network Fee',
            amount: '0.50',
            currency: 'GBP'
        },
        {
            description: 'Processing Fee',
            amount: '0.50',
            currency: 'GBP'
        }
    ],
    total: {
        description: 'Total Fees',
        amount: '1.00',
        currency: 'GBP'
    }
  },
  createdAt: '2023-06-28T07:53:17.837Z',
  updatedAt: '2023-06-28T07:53:17.837Z',
  expiresAt: '2023-06-28T08:03:17.837Z'
}

export default function handler(req, res) {
  res.status(200).json(EXAMPLE_QUOTE)
}
