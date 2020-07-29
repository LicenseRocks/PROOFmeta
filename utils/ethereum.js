import { ethers } from "ethers";
import ERC1155 from "../contracts/ropsten/ERC1155.json";

//
// Test this file by running: http://localhost:3000/contract?id=123
// We need to have contract per each network as their addresses are different
// I think we have to options:
// - add built contracts to project as JSON
// - pass contract address via GET params

// const ethereumNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
// const contractAddr = ERC1155.networks[ethereumNetworkId].address;

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ETHEREUM_JSON_RPC_URL
);

const contractAddr = "0x1710Da7B9F57F599C7e9a8E0Ca3e011B3a504Cf7"; // get from params or JSON
const contract = new ethers.Contract(contractAddr, ERC1155.abi, provider);

const getLicenseInfo = async (id) => {
  try {
    const fileURIs = await contract.getFiles(parseInt(id, 10));
    const lastFileURI = fileURIs[fileURIs.length - 1];
    const response = await fetch(lastFileURI);
    const license = await response.json(); // parse DIN json

    return { license, fileURIs, errMsg: null };
  } catch (err) {
    return { license: null, fileURIs: [], errMsg: err.message };
  }
};

export { contract, provider, ethers, getLicenseInfo };
