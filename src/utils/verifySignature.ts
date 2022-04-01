import * as ethUtil from "ethereumjs-util";
import { providers } from "ethers";
import { eip1271 } from "../routes/eip1271";

interface AssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

interface ChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: AssetData;
}

const SUPPORTED_CHAINS: ChainData[] = [
  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ether",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Ropsten",
    short_name: "rop",
    chain: "ETH",
    network: "ropsten",
    chain_id: 3,
    network_id: 3,
    rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ether",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    chain_id: 4,
    network_id: 4,
    rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ether",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Görli",
    short_name: "gor",
    chain: "ETH",
    network: "goerli",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ether",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "RSK Mainnet",
    short_name: "rsk",
    chain: "RSK",
    network: "mainnet",
    chain_id: 30,
    network_id: 30,
    rpc_url: "https://public-node.rsk.co",
    native_currency: {
      symbol: "RSK",
      name: "RSK",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Kovan",
    short_name: "kov",
    chain: "ETH",
    network: "kovan",
    chain_id: 42,
    network_id: 42,
    rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ether",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Classic Mainnet",
    short_name: "etc",
    chain: "ETC",
    network: "mainnet",
    chain_id: 61,
    network_id: 1,
    rpc_url: "https://ethereumclassic.network",
    native_currency: {
      symbol: "ETH",
      name: "Ether Classic",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Sokol",
    short_name: "poa",
    chain: "POA",
    network: "sokol",
    chain_id: 77,
    network_id: 77,
    rpc_url: "https://sokol.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Core",
    short_name: "skl",
    chain: "POA",
    network: "core",
    chain_id: 99,
    network_id: 99,
    rpc_url: "https://core.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "xDAI Chain",
    short_name: "xdai",
    chain: "POA",
    network: "dai",
    chain_id: 100,
    network_id: 100,
    rpc_url: "https://dai.poa.network",
    native_currency: {
      symbol: "xDAI",
      name: "xDAI",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Callisto Mainnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id: 820,
    network_id: 1,
    rpc_url: "https://clo-geth.0xinfra.com/",
    native_currency: {
      symbol: "CLO",
      name: "CLO",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Polygon Testnet Mumbai",
    chain: "Polygon",
    network: "mumbai",
    rpc_url: "https://rpc-mumbai.maticvigil.com",
    native_currency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    short_name: "maticmum",
    chain_id: 80001,
    network_id: 80001,
  },
  {
    name: "Polygon Mainnet",
    chain: "Polygon",
    network: "mainnet",
    rpc_url: "https://rpc-mainnet.maticvigil.com",
    native_currency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    short_name: "MATIC",
    chain_id: 137,
    network_id: 137,
  },
  {
    name: "Avalanche Fuji Testnet",
    chain: "AVAX",
    network: "fuji",
    rpc_url: "https://api.avax-test.network/ext/bc/C/rpc",
    native_currency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    short_name: "Fuji",
    chain_id: 43113,
    network_id: 1,
  },
  {
    name: "Avalanche Mainnet",
    chain: "AVAX",
    network: "mainnet",
    rpc_url: "https://api.avax.network/ext/bc/C/rpc",
    native_currency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    short_name: "Avalanche",
    chain_id: 43114,
    network_id: 43114,
  },
  {
    name: "Arbitrum One",
    chain_id: 42161,
    network_id: 42161,
    network: "mainnet",
    short_name: "arb1",
    chain: "ETH",
    native_currency: {
      name: "Ether",
      symbol: "AETH",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    rpc_url: "https://arbitrum-mainnet.infura.io/v3/%API_KEY%",
  },
  {
    name: "Optimism",
    chain: "ETH",
    rpc_url: "https://mainnet.optimism.io/",
    network: "mainnet",
    native_currency: {
      name: "Ether",
      symbol: "OETH",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
    short_name: "oeth",
    chain_id: 10,
    network_id: 10,
  },
];

function recoverAddress(sig: string, hash: string): string {
  const params = ethUtil.fromRpcSig(sig);
  const result = ethUtil.ecrecover(
    ethUtil.toBuffer(hash),
    params.v,
    params.r,
    params.s
  );
  const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));
  return signer;
}

function getChainData(chainId: number): ChainData {
  const chainData = SUPPORTED_CHAINS.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "ff77cae3f7d3479b9608a9fb0e9159e1"; // process.env.REACT_APP_INFURA_PROJECT_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export async function verifySignature(
  address: string,
  sig: string,
  hash: string,
  chainId: number
): Promise<boolean> {
  const rpcUrl = getChainData(chainId).rpc_url;
  const provider = new providers.JsonRpcProvider(rpcUrl);
  const bytecode = await provider.getCode(address);
  if (
    !bytecode ||
    bytecode === "0x" ||
    bytecode === "0x0" ||
    bytecode === "0x00"
  ) {
    const signer = recoverAddress(sig, hash);
    return signer.toLowerCase() === address.toLowerCase();
  } else {
    return eip1271.isValidSignature(address, sig, hash, provider);
  }
}
