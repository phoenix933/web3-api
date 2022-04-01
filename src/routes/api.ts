import { Request, Response, NextFunction, Router } from "express";
import chainRouter from "./chain-router";
import walletRouter from "./wallet-router";

// Export the base-router
const baseRouter = Router();

const checkChain = (req: Request, res: Response, next: NextFunction) => {
  const { chain } = req.params;

  if (chain !== "eth") {
    return res.status(400).json({ message: "Unsupported chain" });
  }

  next();
};

baseRouter.use("/wallets", walletRouter);
baseRouter.use("/:chain", checkChain, chainRouter);

// Export default.
export default baseRouter;
