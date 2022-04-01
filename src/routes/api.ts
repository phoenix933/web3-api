import { Router } from 'express';
import walletRouter from './wallet-router';
import nftRouter from './nft-router';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/wallets', walletRouter);
baseRouter.use('/nfts', nftRouter);

// Export default.
export default baseRouter;
