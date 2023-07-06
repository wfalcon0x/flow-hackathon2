import { useEffect, useState } from 'react'
import useCurrentUser from './useCurrentUser'
import useTokenBalance, { TokenBalance } from './useTokenBalance'
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
    function getBalance(balanceItem: TokenBalance): string {
      return balanceItem ? balanceItem.balance : '0.00000000'
    }
    if (tokenList === undefined) {
      return setUserTokenList([])
    }
    const result = tokenList.map(token => {
      const balanceItem = tokenBalance.find(balance => balance.id.startsWith(token.id))
      return {
        ...token,
        balance: loggedIn ? getBalance(balanceItem) : ''
      }
    })
    setUserTokenList(result)
  }, [addr, loggedIn, tokenList, tokenBalance])

  return { userTokenList }
}