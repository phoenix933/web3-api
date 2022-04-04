import { OPENSEA_API_URL } from "@shared/constants";
import { Request, Response, Router } from "express";
import axios from "axios";
import { wait } from "@utils/wait";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  const {
    data: { collection },
  } = await axios.get(`${OPENSEA_API_URL}/collection/${slug}`);

  // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
  await wait(500);

  // Retrieves the first 20
  // https://docs.opensea.io/reference/retrieving-assets-rinkeby
  const {
    data: { assets },
  } = await axios.get(`${OPENSEA_API_URL}/assets?collection=${slug}`);

  return res.status(200).json({
    collection,
    assets,
  });
});

export default router;
