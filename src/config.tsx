import { http, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { injected } from 'wagmi/connectors' 
import { walletConnect } from 'wagmi/connectors'
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  connectors: [
    injected(), 
    metaMask(),
    walletConnect({
      projectId: '3fcc6bba6f1de962d911bb5b5c3dba68',
    }),
  ],
});