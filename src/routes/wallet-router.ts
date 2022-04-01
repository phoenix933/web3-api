import { Request, Response, Router } from "express";
import * as ethUtil from "ethereumjs-util";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { verifySignature } from "@utils/verifySignature";

// Constants
const router = Router();

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

function hashMessage(msg: string): string {
  const data = encodePersonalMessage(msg);
  const buf = ethUtil.toBuffer(data);
  const hash = ethUtil.keccak256(buf);
  return ethUtil.bufferToHex(hash);
}

// mockDB
function initDatabase() {
  // "0xB58758c87A535dCDcb608F5a6Bb48dFC434e3FfF"
  let walletMap: Map<string, { address: string; chainId: number }> = new Map(
    []
  );

  const getAll = () => {
    return [...walletMap.values()];
  };

  const getOne = (address: string) => {
    return walletMap.get(address);
  };

  const add = (address: string, chainId: number) => {
    walletMap.set(address, { address, chainId });
  };

  const remove = (address: string) => {
    walletMap.delete(address);
  };

  return {
    getAll,
    getOne,
    add,
    remove,
  };
}

const db = initDatabase()

router.get("/", async (req: Request, res: Response) => {
  const wallets = db.getAll()

  return res.status(200).json({ wallets });
});

router.post("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  const { signature, chainId, message } = req.body;

  if ([address, signature, chainId, message].includes(undefined)) {
    console.log({
      address, signature, chainId, message
    })
    return res.status(400).json({ message: "Invalid data" });
  }

  const hash = hashMessage(message);
  const valid = await verifySignature(address, signature, hash, chainId);

  if (valid) {
    db.add(address, chainId)
  }

  return res.status(200).json({ valid });
});

router.delete("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;

  db.remove(address)

  return res.status(200).json({ success: true });
});

// Export default
export default router;
