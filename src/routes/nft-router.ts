import { Request, Response, Router } from "express";
import axios from "axios";
import { wait } from "@utils/wait";

const API_URL = "https://testnets-api.opensea.io/api/v1";

const router = Router();

router.get(
  "/:contractAddress/:tokenId",
  async (req: Request, res: Response) => {
    const { contractAddress, tokenId } = req.params;

    const url = `${API_URL}/asset/${contractAddress}/${tokenId}`;

    // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
    await wait(500);

    const { data } = await axios.get(url);

    return res.status(200).json(data);
  }
);

router.get("/", async (req: Request, res: Response) => {
  const { collection } = req.query;

  const url = `${API_URL}/assets?collection=${collection}`;

  // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
  await wait(1000);

  const { data } = await axios.get(url);

  return res.status(200).json(data);
});

export default router;
