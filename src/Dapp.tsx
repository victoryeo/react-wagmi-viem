import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { injected } from 'wagmi/connectors'
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import greeter_abi from "./greeter_abi.json";
import { wagmiConfig } from './config';

const Dapp = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect()
  const [greeter, setGreeter] = useState("");

  const { data: currentGreet = "", refetch: reFetchGreeter }: any =
    useReadContract({
      abi: greeter_abi.greeter_abi,
      address: "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
      functionName: "greet",
    });

  const updateGreet = async () => {
    try {
      //prepare transaction
      const { request } = await simulateContract(wagmiConfig,{
        address: "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8",
        abi: greeter_abi.greeter_abi,
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
    <>
      <table>
      <tr>
        <th>Address&nbsp;</th>
        <th>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => isConnected ? disconnect() : connect({ connector: injected() })}>
        {isConnected ? address : "Connect to wallet"}
        </button>
        </th>
      </tr>
      </table>
      <hr/>
      <table>
      <tr>
      <th>Interaction with smart contract</th>
      </tr>
      <tr>
      <td>Current greeting is {currentGreet}</td>
      </tr >
      <tr>
      <td>
        <input
          type="text"
          value={greeter}
          onChange={(e) => setGreeter(e.target.value)}
        />&nbsp;
        <button onClick={updateGreet}>Update greeting</button>
      </td>
      </tr >
      </table>
    </>
  );
};

export default Dapp; 