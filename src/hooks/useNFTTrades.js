import React from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { networkCollections } from "../helpers/collections";
import { useWeb3ExecuteFunction } from "react-moralis";



export const useNFTTrades = () => {
  const { web3, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const web3Api = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();

  useEffect(() => {

    async function fetchData(addrs) {
  if (isWeb3Enabled){
      const options = {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        limit: 200000,
        chain: chainId,
      };

      const NFTTrades = await web3Api.token.getNFTTrades(options);
      console.log(NFTTrades);
    } else {
      enableWeb3();
    }
  }
    fetchData();
  }, [isWeb3Enabled]); // Or [] if effect doesn't need props or state


};
 // default useNFTTrades;
