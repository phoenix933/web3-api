import { Request, Response, Router } from "express";
import { hashMessage } from "@utils/hashMessage";
import { verifySignature } from "@utils/verifySignature";
import { walletsService } from "@services/wallets";

const router = Router();

// ⚠️ IMPORTANT ⚠️
// All of these endpoints should perform operations per user.

router.get("/", async (req: Request, res: Response) => {
  // Get wallets for user
  const wallets = walletsService.getAll();

  return res.status(200).json({ wallets });
});

router.post("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  const { signature, chainId, message } = req.body;

  if ([address, signature, chainId, message].includes(undefined)) {
    console.log({
      address,
      signature,
      chainId,
      message,
    });
    return res.status(400).json({ message: "Invalid data" });
  }

  const hash = hashMessage(message);
  const valid = await verifySignature(address, signature, hash, chainId);

  if (valid) {
    // Save wallet to user's wallets
    walletsService.add(address, chainId);
  }

  return res.status(200).json({ valid });
});

router.delete("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;

  // Remove wallet from user's wallets
  walletsService.remove(address);

  return res.status(200).json({ success: true });
});

export default router;
