import { Request, Response, Router } from "express";
import { hashMessage } from "@utils/hashMessage";
import { verifySignature } from "@utils/verifySignature";
import { walletsService } from "@services/wallets";

// Constants
const router = Router();

router.get("/", async (req: Request, res: Response) => {
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
    walletsService.add(address, chainId);
  }

  return res.status(200).json({ valid });
});

router.delete("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;

  walletsService.remove(address);

  return res.status(200).json({ success: true });
});

// Export default
export default router;
