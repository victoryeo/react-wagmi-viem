import React from 'react';
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

const Dapp = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => isConnected ? disconnect : open}>
        {isConnected ? address : "Connect to wallet"}
      </button>
    </div>
  );
};

export default Dapp; 