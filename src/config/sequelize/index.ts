import { Sequelize } from "sequelize-typescript";
import { MODELS, DB_CONFIG } from "./constants";

export const sequelize = new Sequelize(DB_CONFIG);
sequelize.addModels(MODELS);

export default sequelize;
