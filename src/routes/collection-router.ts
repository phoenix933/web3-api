import { Request, Response, Router } from "express";
import { nftsService } from "@services/nfts";
import { collectionsService } from "@services/collections";
import { removeDuplicates } from "@utils/removeDuplicates";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  const collection = await collectionsService.getOne(slug);
  const { assets } = await nftsService.getAllForCollection(
    slug,
    res.locals.user
  );

  const owners = removeDuplicates(
    assets
      .map((asset: any) => asset.owner)
      .filter((owner: any) => !!owner.real_user),
    "address"
  );

  return res.status(200).json({
    collection: {
      ...collection,
      owners,
    },
    assets,
  });
});

export default router;
