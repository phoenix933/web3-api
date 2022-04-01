import { Router } from 'express';
import nftRouter from './nft-router';
import postRouter from './post-router';
import walletRouter from './wallet-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/nfts', nftRouter);
baseRouter.use('/posts', postRouter);
baseRouter.use('/wallets', walletRouter);

// Export default.
export default baseRouter;
