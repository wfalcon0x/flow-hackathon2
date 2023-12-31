import { config } from '@onflow/fcl'
import { ACCESS_NODE_URLS, FUNGIBLE_TOKEN_ADDRESS, INCREMENTFI_SWAP_ROUTER_ADDRESS } from '../constants'
import flowJSON from '../flow.json'

const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK

console.log('Dapp running on network:', flowNetwork)

config({
  'flow.network': flowNetwork,
  'accessNode.api': ACCESS_NODE_URLS[flowNetwork],
  'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
  'app.detail.icon': 'https://avatars.githubusercontent.com/u/62387156?v=4',
  'app.detail.title': 'FCL Next Scaffold',
  '0xFungibleToken': FUNGIBLE_TOKEN_ADDRESS[flowNetwork],
  '0xSwapRouter': INCREMENTFI_SWAP_ROUTER_ADDRESS[flowNetwork],
}).load({ flowJSON })