import "sequelize";
import { Express } from "express";

declare module "sequelize" {
  interface InitiateSequelizePops {
    onSuccess: (sequelize: Sequelize, app: Express) => void;
    onError: (error: any) => void;
  }
}
