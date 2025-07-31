import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// 定义 Monad 测试网
const monad = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MONAD',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://testnet.monadscan.io' },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [mainnet, sepolia, monad],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'FHE Rock Paper Scissors' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [monad.id]: http(),
  },
})