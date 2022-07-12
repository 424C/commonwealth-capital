// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { METADATA_URL } = require("../constants");

async function main() {
  // URL storing our metadata
  const metadataURL = METADATA_URL;
  const NeighborNFTContract = await ethers.getContractFactory("Neighbor");

  // deploy the contract
  const deployedNeighborNFTContract = await NeighborNFTContract.deploy(
    metadataURL
  );

  // print the address of the deployed contracts
  console.log("NEIGHBOR NFT: ", deployedNeighborNFTContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
