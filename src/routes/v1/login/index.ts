import { Response, Request, Router } from "express";
import { UserProfiles as UserProfilesModel } from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { onGenerateToken } from "../../../helper/token";

const router: Router = Router();

router.get(
  "/login",
  async (req: Request<{ identityId: string; name: string }>, res: Response) => {
    try {
      const identityId = req.query.identityId;
      const name = req.query.name;

      if (!identityId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const userProfile = await UserProfilesModel.findOne({
        where: { identityId: String(identityId), name: String(name) },
      });

      if (!userProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = onGenerateToken(userProfile.dataValues);

      res.header({ token }).json(jsonResponse({ response: token }));
    } catch (error) {
      console.error("Error fetching profile user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export { router };
