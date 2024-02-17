import React from 'react';
import { http, createConfig, WagmiProvider } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dapp from "./Dapp"
import './App.css';
import { wagmiConfig } from './config';

const theChains = [bscTestnet];
const projectId = "your-walletconnect-project-id";

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}> 
            <Dapp/>
          </QueryClientProvider>
        </WagmiProvider>
      </header>
    </div>
  );
}

export default App;
