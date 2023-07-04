import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'

const code = `
import FungibleToken from 0xFungibleToken

pub struct TokenBalance {
  pub let address: Address
  pub let path: String
  pub let id: String
  pub let balance: UFix64?

  init(address: Address, path: String, id: String, balance: UFix64?) {
      self.address = address
      self.path = path
      self.id = id
      self.balance = balance
  }
}

pub fun main(address: Address): [TokenBalance] {
  let account = getAuthAccount(address)
  let vaultType = Type<@FungibleToken.Vault>()
  let items: [TokenBalance] = []
  for path in account.storagePaths {
    let type = account.type(at: path)!
    if type != nil {
      let isVault = type.isSubtype(of: vaultType) 
      var balance: UFix64? = nil
      
      if isVault {
        if let vaultRef = account.borrow<&FungibleToken.Vault>(from: path) {
          balance = vaultRef.balance
          let item = TokenBalance(
            address: address,
            path: path.toString(),
            id: type.identifier,
            balance: balance
          )
          items.append(item)
        }
      }
    }
  }
  return items
}`

export interface TokenBalance {
  address: string;
  path: string;
  id: string;
  balance: string;
}

export default function useTokenBalance(address: string | null): { tokenBalance: TokenBalance[] | null } {

  const [tokenBalance, setTokenBalance] = useState<TokenBalance[]>()

  useEffect(()  => {
    async function queryTokenBalance() {
      if (address === null) {
        return setTokenBalance([])
      }
      const balance = await fcl.query({
        cadence: code,
        args: (arg, t) => [
          arg(address, t.Address)
        ]
      })
  
      setTokenBalance(balance)
    }
    queryTokenBalance()
  }, [address])

  return { tokenBalance }
}