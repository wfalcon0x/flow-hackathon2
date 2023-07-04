import { TokenListProvider, ENV, Strategy } from 'flow-native-token-registry'
import { useEffect, useState } from 'react'
import useConfig from './useConfig'

export interface TokenListItem {
  id: string
  logo: string
  symbol: string
}

export default function useTokenList(): { tokenList: TokenListItem[] | null } {
  const [tokenList, setTokenList] = useState<TokenListItem[]>()
  const { network } = useConfig()

  useEffect(()  => {
    async function createTokenListForEnv(env: ENV) {
      const tokens = await new TokenListProvider().resolve(Strategy.GitHub, env)
      const tokenList = tokens.getList().map((token) => {
        return {
          id: `${token.address.replace("0x", "A.")}.${token.contractName}`,
          logo: token.logoURI,
          symbol: token.symbol
        }
      })
      return tokenList
    }

    async function createTokenList() {
      switch (network) {
        case 'testnet':
          setTokenList(await createTokenListForEnv(ENV.Testnet))
          break;
        case 'mainnet':
          setTokenList(await createTokenListForEnv(ENV.Mainnet))
          break;
        default:
          setTokenList([])
          break;
      }
    }

    createTokenList()
  }, [network])

  return { tokenList }
}