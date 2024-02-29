import { UserProfiles, Books, Genres, Borrower } from "../../models";
import { Options } from "sequelize";

export const DB_CONFIG: Options = {
  define: { timestamps: true },
  dialect: "postgres",
  database: "library",
  host: "localhost",
  password: "admin",
  username: "postgres",
  port: 5432,
};

export const MODELS = [UserProfiles, Books, Genres, Borrower];
