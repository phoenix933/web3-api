import { Request, Response, Router } from "express";
import { postsService } from "@services/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { contractAddress, tokenId, collection } = req.query;

  if (!(contractAddress && tokenId) || !collection) {
    return res
      .status(400)
  }

  const posts = postsService.getAll();

  return res.status(200).json(posts);
});

export default router;
