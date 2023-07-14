import * as fcl from '@onflow/fcl'

export default async function getCryptoConversion(
  amount: number,
  fromId: string,
  toId: string,
): Promise<number> {
  const ufix64Amount = amount.toFixed(8)
  console.log(`fromId: ${fromId} toId: ${toId}`)
  try {
    const result = await fcl.query({
      cadence: `
import SwapRouter from 0xSwapRouter
pub fun main(amountIn: UFix64, fromId: String, toId: String): UFix64 {
  let tokenKeyPath = [fromId, toId]
  let amountsOut = SwapRouter.getAmountsOut(
    amountIn: amountIn,
    tokenKeyPath: tokenKeyPath
  )
  return amountsOut[1]
}
      `,
      args: (arg, t) => [
        arg(ufix64Amount, t.UFix64),
        arg(fromId, t.String),
        arg(toId, t.String),
      ],
    })
    return Number(result)
  } catch (e) {
    console.log(e)
    throw new Error('Unsupported conversion from ' + fromId + ' to ' + toId)
  }
}
