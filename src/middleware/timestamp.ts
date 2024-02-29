import { Request, Response, NextFunction } from "express";

export const timestamp = (
  req: Request,
  _: Response,
  nextFunction: NextFunction
) => {
  req.timestamp = Date.now();
  nextFunction();
};

export default timestamp;
