import { Request, Response, Router } from "express";
import { nftsService } from "@services/nfts";
import { collectionsService } from "@services/collections";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  const collection = await collectionsService.getOne(slug);
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
