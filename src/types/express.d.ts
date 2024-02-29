import "express";

declare module "express" {
  interface Express {
    run?: () => void;
  }
  interface Request {
    timestamp?: number;
  }

  type ClientRequest<T> = Request<any, any, T>;
}
