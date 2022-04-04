import { Request, Response, Router } from "express";
import { nftsService } from "@services/nfts";

const router = Router();

router.get(
  "/:contractAddress/:tokenId",
  async (req: Request, res: Response) => {
    const { contractAddress, tokenId } = req.params;

    const nft = await nftsService.getOne(
      contractAddress,
      tokenId,
      res.locals.user
    );

    return res.status(200).json(nft);
  }
);

router.get("/", async (req: Request, res: Response) => {
  const { collection } = req.query;

  if (!collection) {
    return res.status(400).json({ message: "Collection is required" });
  }

  const nfts = await nftsService.getAllForCollection(
    collection as string,
    res.locals.user
  );

  return res.status(200).json(nfts);
});

export default router;
