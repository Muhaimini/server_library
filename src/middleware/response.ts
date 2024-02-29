import { Request, Response, NextFunction } from "express";

export const response = (
  _: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  nextFunction();
};

export default response;
