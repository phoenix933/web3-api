import { Router } from "express";
import nftRouter from "./nft-router";
import postRouter from "./post-router";

const chainRouter = Router();

chainRouter.use("/nfts", nftRouter);
chainRouter.use("/posts", postRouter);

export default chainRouter;
