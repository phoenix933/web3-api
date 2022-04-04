import { Request, Response, NextFunction } from "express";

const MOCK_USER_ID = "us-east-1:a529e77c-0342-40b3-a923-2e1d6a49cb0f";

export function setUser(req: Request, res: Response, next: NextFunction) {
  res.locals.userId = MOCK_USER_ID;
  res.locals.user = {
    id: MOCK_USER_ID,
    username: "mock.user",
  };

  next();
}
