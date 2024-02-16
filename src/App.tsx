import React from 'react';
import { http, createConfig, WagmiProvider } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import Dapp from "./Dapp"
import './App.css';

const theChains = [bscTestnet];
const projectId = "your-walletconnect-project-id";

const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});
const ethereumClient = new EthereumClient(wagmiConfig, theChains);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WagmiProvider config={wagmiConfig}>
          <Dapp />
        </WagmiProvider>
        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          defaultChain={bscTestnet}
        />
      </header>
    </div>
  );
}

export default App;
