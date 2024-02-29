import { UserProfile } from "models";
import { Response, Router, ClientRequest } from "express";
import { UserProfiles as UserProfilesModel } from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { onGenerateToken } from "../../../helper/token";
import { startCase } from "lodash";
import { onValidateUserType } from "../../../helper/validation";

const router: Router = Router();

router.post(
  "/signup",
  async (req: ClientRequest<UserProfile>, res: Response) => {
    try {
      const payload = req.body;

      if (!payload.identityId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const userProfile = await UserProfilesModel.findOne({
        where: { identityId: String(payload.identityId) },
      });

      if (userProfile) {
        res.status(403).json({ message: "Id already taken" });
        return;
      }

      await UserProfilesModel.create(payload);

      const addUserprofile: UserProfile = {
        name: startCase(req.body.name),
        type: onValidateUserType(req.body.type),
        address: req.body.address,
        contact: req.body.contact,
        identityId: req.body.identityId,
      };

      const token = onGenerateToken(addUserprofile);

      console.log("token", token);

      res.header({ token }).json(jsonResponse({ response: token }));
    } catch (error) {
      console.error("Error fetching profile user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export { router };
