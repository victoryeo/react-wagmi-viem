import React, { useState } from 'react';
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { greeter_abi } from "./greeter_abi.json";
import { wagmiConfig } from './config';

const Dapp = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [greeter, setGreeter] = useState("");

  const { data: currentGreet = "", refetch: reFetchGreeter }: any =
    useReadContract({
      abi: greeter_abi,
      address: "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
      functionName: "greet",
    });

  const updateGreet = async () => {
    try {
      //prepare transaction
      const { request } = await simulateContract(wagmiConfig,{
        address: "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
        abi: greeter_abi,
        functionName: "setGreeting",
        args: [greeter],
      });
      //send transaction to blockchain
      const hash = await writeContract(wagmiConfig, request);
      if (!hash) {
        throw new Error("Transaction failed");
      }
      //wait for transaction to be mined
      await waitForTransactionReceipt(wagmiConfig, { hash });
      //refetch data
      await reFetchGreeter();
      alert("Transaction successful");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => isConnected ? disconnect : open}>
        {isConnected ? address : "Connect to wallet"}
      </button>
    </div>
  );
};

export default Dapp; 