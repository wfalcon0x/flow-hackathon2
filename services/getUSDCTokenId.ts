import * as fcl from '@onflow/fcl'
import { USDC_TOKEN_ID } from '../constants'

export default async function getUSDCTokenId(): Promise<string> {
  const flowNetwork = await fcl.config.get('flow.network')
  return USDC_TOKEN_ID[flowNetwork]
}


