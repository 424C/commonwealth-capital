import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Faq from "../components/faq";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { benefitOne, benefitTwo } from "../components/data";
import { Contract, providers, utils } from "ethers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Commonwealth Capital</title>
        <meta name="description" content="Commonwealth DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <SectionTitle
        pretitle="Membership Benefits"
        title="Join the Neighborhood"
      ></SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle pretitle="Ecosystem Token" title="Native Token">
        Native ERC20 token. Lorem Ipsum Blah BLah
      </SectionTitle>
      <SectionTitle
        pretitle="Decentralized Exchange"
        title="Built in DEX for added liquidity."
      >
        Exchange both NEIGHBOR tokens and GOODWILL tokens at the NeighborDEX.
      </SectionTitle>
      <SectionTitle
        pretitle="FAQ"
        title="Frequently Asked Questions"
      ></SectionTitle>
      <Faq />
      <Footer />
    </>
  );
}
