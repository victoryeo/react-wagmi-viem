import React from 'react';
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { greeter_abi } from "./greeter_abi.json";

const Dapp = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: currentGreet = "", refetch: reFetchGreeter }: any =
    useReadContract({
      abi: greeter_abi,
      address: "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
      functionName: "greet",
    });

  return (
    <div>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => isConnected ? disconnect : open}>
        {isConnected ? address : "Connect to wallet"}
      </button>
    </div>
  );
};

export default Dapp; 