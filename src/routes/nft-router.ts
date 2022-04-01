import { Request, Response, Router } from "express";
import axios from "axios";

// Constants
const router = Router();

// Add and verify
router.get("/", async (req: Request, res: Response) => {
  const { owner } = req.query;

  const url = `https://testnets-api.opensea.io/api/v1/assets?owner=${owner}`;

  const { data } = await axios.get(url);

  return res.status(200).json(data);
});

// Delete

// Get wallets
router.get(
  "/:contractAddress/:tokenId",
  async (req: Request, res: Response) => {
    const { contractAddress, tokenId } = req.params;

    const url = `https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`;

    const { data } = await axios.get(url);

    return res.status(200).json(data);
  }
);

export default router;
