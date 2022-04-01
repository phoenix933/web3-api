import * as ethUtil from "ethereumjs-util";
import { convertUtf8ToHex } from "@walletconnect/utils";

function encodePersonalMessage(msg: string): string {
  const data = ethUtil.toBuffer(convertUtf8ToHex(msg));
  const buf = Buffer.concat([
    Buffer.from(
      "\u0019Ethereum Signed Message:\n" + data.length.toString(),
      "utf8"
    ),
    data,
  ]);
  return ethUtil.bufferToHex(buf);
}

export function hashMessage(msg: string): string {
  const data = encodePersonalMessage(msg);
  const buf = ethUtil.toBuffer(data);
  const hash = ethUtil.keccak256(buf);
  return ethUtil.bufferToHex(hash);
}
