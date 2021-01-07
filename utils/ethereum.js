import { ethers } from "ethers";
import ERC1155abi from "../contractsABI/ERC1155.json";
import AuctionableERC1155abi from "../contractsABI/AuctionableERC1155.json";
//
// Test this file by running: http://localhost:3000/?id=123
// We need to have contract per each network as their addresses are different
// I think we have to options:
// - add built contracts to project as JSON
// - pass contract address via GET params

// const ethereumNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
// const contractAddr = ERC1155.networks[ethereumNetworkId].address;
const providerUrls = {
  ropsten:
    "https://eth-ropsten.alchemyapi.io/v2/mxlKqKI5tfDXjwlJLQDgP90fUJWXnJ4L",
  maticTestnet: "https://rpc-mumbai.matic.today",
};

const fetchMetaDataFile = async (url) => {
  const response = await fetch(url);
  const license = await response.json(); // parse DIN json
  return license;
};

const getLicenseInfo = async (id, contractAddr, network) => {
  try {
    const tokenId = parseInt(id, 10);
    const provider = new ethers.providers.JsonRpcProvider(
      providerUrls[network]
    );
    // TODO: hotifx for new contracts
    const abi = contractAddr === "0x7c72F31DEa8C7E24858a7165D7D7d941a1E8C344"
      ? AuctionableERC1155abi
      : ERC1155abi;
    const contract = new ethers.Contract(contractAddr, abi, provider);
    const fileURI = await contract.getMetaFileUrl(tokenId);
    const checksums = await contract.getChecksums(tokenId);
    const license = await fetchMetaDataFile(fileURI);
    const isUpgradable = contract.isUpgradable
      ? await contract.isUpgradable(tokenId)
      : false;
    let childId;
    try {
      childId = await contract.getChildId(tokenId);
    } catch (err) {
      childId = 0;
    }

    return {
      license,
      fileURI,
      checksums,
      isUpgradable,
      childId: childId.toString(),
      errorMessage: null,
    };
  } catch (err) {
    console.log("error here", err);
    return { license: {}, fileURI: [], errorMessage: err.message };
  }
};

const getTransaction = async (txHash, network) => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrls[network]);

  const transaction = await provider.getTransaction(txHash);

  return transaction;
};

export { ethers, getLicenseInfo, fetchMetaDataFile, getTransaction };
