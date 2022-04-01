import type { ChainData } from "@models/ChainData";
import * as ethUtil from "ethereumjs-util";
import { providers } from "ethers";
import { eip1271 } from "../routes/eip1271";
import { SUPPORTED_CHAINS } from "@shared/constants"

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

  const API_KEY = process.env.INFURA_API_KEY;

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
