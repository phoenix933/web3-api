import { Request, Response, NextFunction } from "express";

export function checkChain(req: Request, res: Response, next: NextFunction) {
  const { chain } = req.query;

  if (chain && chain !== "eth") {
    return res.status(400).json({ message: "Unsupported chain" });
  }

  next();
}
