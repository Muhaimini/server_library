import { Request, Response, NextFunction } from "express";
import { UserProfile } from "models";
import { onDecodeToken } from "../helper/token";
import { USER_TYPE } from "../types";
import { UserProfiles as UserProfilesModel } from "../models";

export const request = (
  req: Request,
  _: Response,
  nextFunction: NextFunction
) => {
  console.log(req);
  nextFunction();
};

export const protectedData = async (
  req: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  try {
    const tokenWithBearer = req.headers?.authorization;

    const tokenParts = tokenWithBearer?.split?.(" ");
    const token = tokenParts?.[1] || "";
    const userProfile = onDecodeToken<UserProfile>(token);
    const userProfiles = await UserProfilesModel.findByPk(userProfile?.id);

    if (userProfiles?.dataValues?.type !== USER_TYPE.LIBRARIAN) {
      return res.status(403).json({ message: "Not authorize" });
    }

    nextFunction();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default request;
