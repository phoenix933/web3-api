import { OPENSEA_API_URL } from "@shared/constants";
import { Request, Response, Router } from "express";
import axios from "axios";
import { wait } from "@utils/wait";
import { nftsService } from "@services/nfts";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  const {
    data: { collection },
  } = await axios.get(`${OPENSEA_API_URL}/collection/${slug}`);

  // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
  await wait(500);

  const { assets } = await nftsService.getAllForCollection(
    slug,
    res.locals.user
  );

  return res.status(200).json({
    collection,
    assets,
  });
});

export default router;
