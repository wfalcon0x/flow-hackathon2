import { useEffect, useState } from 'react'
import useCurrentUser from './useCurrentUser'
import useTokenBalance from './useTokenBalance'
import useTokenList from './useTokenList'

export interface UserToken {
  id: string
  logo: string
  symbol: string
  balance: string
}

export default function useUserTokenList(): { userTokenList: UserToken[] | null } {
  const [userTokenList, setUserTokenList] = useState<UserToken[]>()
  const { addr, loggedIn } = useCurrentUser()
  const { tokenBalance } = useTokenBalance(addr)
  const { tokenList } = useTokenList()

  useEffect(()  => {
    if (tokenList === undefined) {
      return setUserTokenList([])
    }
    const result = tokenList.map(token => {
      const balanceItem = tokenBalance.find(balance => balance.id.startsWith(token.id))
      return {
        ...token,
        balance: balanceItem ? balanceItem.balance : '0.00'
      }
    })
    setUserTokenList(result)
  }, [addr, loggedIn, tokenList, tokenBalance])

  return { userTokenList }
}