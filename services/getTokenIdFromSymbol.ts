import { TokenListProvider, ENV, Strategy } from 'flow-native-token-registry'
import * as fcl from '@onflow/fcl'

export default async function getTokenIdFromSymbol(symbol: string): Promise<string>{
  const flowNetwork = await fcl.config.get('flow.network')
  switch (flowNetwork) {
    case 'testnet':
      return findTokenId(symbol, ENV.Testnet)
    case 'mainnet':
      return findTokenId(symbol, ENV.Mainnet)
    default:
      return null
  }
}

async function findTokenId(symbol: string, env: ENV): Promise<string> {
  const tokens = await new TokenListProvider().resolve(Strategy.GitHub, env)
  const token = tokens.getList().find(token => token.symbol === symbol)
  return `${token.address.replace("0x", "A.")}.${token.contractName}`
}
