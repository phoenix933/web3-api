import { Request, Response, Router } from "express";
import { postsService } from "@services/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { contractAddress, tokenId } = req.query;

  if (!contractAddress || !tokenId) {
    return res
      .status(400)
      .json({ message: "must include contractAddress and tokenId" });
  }

  const posts = postsService.getAll();

  return res.status(200).json(posts);
});

export default router;
