import Head from "next/head";
import Mint from "../components/mint";
import Navbar from "../components/navbar";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { Contract, providers, utils } from "ethers";

export default function mint() {
  return (
    <>
      <Head>
        <title>Commonwealth Capital</title>
        <meta name="description" content="Commonwealth DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Mint />
    </>
  );
}
