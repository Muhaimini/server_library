import { InitiateSequelizePops } from "sequelize";
import express, { json } from "express";
import dotenv from "dotenv";
import { timestamp } from "../middleware";
import sequelize from "./sequelize";

const onInitializeApp = ({ onSuccess, onError }: InitiateSequelizePops) => {
  dotenv.config();

  const app = express();
  app.use(timestamp);
  app.use(json());

  sequelize
    .sync()
    .then((response) => onSuccess(response, app))
    .catch(onError);
};

export default onInitializeApp;
