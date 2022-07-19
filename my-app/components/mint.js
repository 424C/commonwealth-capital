import Image from "next/image";
import Container from "./container";
import Token1 from "../public/img/neighbors/11.png";
import Token2 from "../public/img/neighbors/7.png";
import Token3 from "../public/img/neighbors/4.png";
import Token4 from "../public/img/neighbors/15.png";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { Contract, providers, utils } from "ethers";

export default function Hero() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  // checks the price of minting a token
  const [tokenMintCost, setTokenMintCost] = useState("");
  // reads the max token supply of the contract
  const [MAX_NFT_SUPPLY, setMAX_NFT_SUPPLY] = useState("");
  // sets the sale state if required
  const [saleOpen, setSaleOpen] = useState(true);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  // Functions
  /**
   * @dev publicMint() grants caller an NFT upon execution
   */
  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.05"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("Mint succesful.");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @dev connectWallet() prompts user to connect wallet
   */
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @dev getOwner() calls the contract to retrieve the owner.
   */
  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _owner = await nftContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * @dev getTokenIdsMinted() gets total amount of tokens issued.
   */
  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIds();
      // Since _tokenIds is a 'Big Number', it needs to be converted to string.
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @dev getMintPrice() gets the mint price of a token.
   */
  const getMintPrice = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenPrice = (await nftContract._price()) / 10 ** 18;
      setTokenMintCost(_tokenPrice.toString());
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @dev getTokenSupply() gets the max amount of tokens for the contract.
   */
  const getTokenSupply = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const MAX_SUPPLY = await nftContract.maxTokenIds();
      setMAX_NFT_SUPPLY(MAX_SUPPLY.toString());
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * @dev getProviderOrSigner()
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   * @param {*} needSigner - boolean indicating if Signer is required.
   */
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Please change network to: Goerli");
      throw new Error("Please change network to: Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      getTokenIdsMinted();
      getTokenSupply();
      getMintPrice();

      // Check the amount of tokens minted every 5 seconds using setInterval.
      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  /**
   *
   * @dev Updates the button depending on state
   */
  const renderButton = () => {
    // Wallet disconnected
    if (!walletConnected) {
      return (
        <button
          onClick={connectWallet}
          className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
        >
          Connect your wallet
        </button>
      );
    }

    // Waiting on a transaction
    if (loading) {
      return (
        <button className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
          Loading...
        </button>
      );
    }

    // If presale started and has ended, its time for public minting
    if (saleOpen) {
      return (
        <button className="" onClick={publicMint}>
          Mint now
        </button>
      );
    }
  };

  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Mint Neighbor
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Mint a token for {tokenMintCost} ETH
              <br />
              {tokenIdsMinted}/{MAX_NFT_SUPPLY} have been minted.
            </p>
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                {renderButton()}
              </a>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <Image
              src={Token1}
              height="200"
              width="200"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
            />
            <Image
              src={Token2}
              height="200"
              width="200"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
            />
            <Image
              src={Token3}
              height="200"
              width="200"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
            />
            <Image
              src={Token4}
              height="200"
              width="200"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
