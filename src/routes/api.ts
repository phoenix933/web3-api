import { checkChain } from "@middleware/checkChain";
import { Router } from "express";
import nftRouter from "./nft-router";
import postRouter from "./post-router";
import walletRouter from "./wallet-router";

// Export the base-router
const baseRouter = Router();

baseRouter.use("/nfts", checkChain, nftRouter);
baseRouter.use("/posts", checkChain, postRouter);
baseRouter.use("/wallets", walletRouter);

// Export default.
export default baseRouter;
