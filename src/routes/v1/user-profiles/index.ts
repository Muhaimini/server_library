import { UserProfile } from "models";
import { DeleteByPK } from "@client/request";
import { omit, startCase } from "lodash";
import { ClientRequest, Response, Router } from "express";
import { UserProfiles as UserProfilesModel } from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { isValidPayload, onValidateUserType } from "../../../helper/validation";
import { protectedData } from "../../../middleware/resquest";

const router: Router = Router();

router.delete(
  "/user",
  async (req: ClientRequest<DeleteByPK>, res: Response) => {
    try {
      const userId = req.body.id;

      if (!userId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const userProfile = await UserProfilesModel.findByPk(userId);

      if (!userProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await UserProfilesModel.destroy();
      res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put(
  "/user/:id",
  async (req: ClientRequest<UserProfile>, res: Response) => {
    try {
      const userId = req.params.id;
      const payload = omit(req.body, "id");

      if (!userId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const userProfile = await UserProfilesModel.findByPk(userId);

      if (!userProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await UserProfilesModel.update(payload, {
        where: { id: userId },
      });

      res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post("/user", async (req: ClientRequest<UserProfile>, res: Response) => {
  try {
    const payload: UserProfile = {
      name: startCase(req.body.name),
      type: onValidateUserType(req.body.type),
      address: req.body.address,
      contact: req.body.contact,
      identityId: req.body.identityId,
    };

    if (!isValidPayload(payload)) {
      res.status(400).send({
        timestamp: req.timestamp,
        message: "Uncompeted. Please full fill the data",
      });
      return;
    }

    const findTargetUser = await UserProfilesModel.findOne({
      where: { identityId: payload.identityId },
    });

    if (findTargetUser) {
      res.status(403).json({
        message: "ID already exists, please check again",
      });
      return;
    }

    const addUserProfile = await UserProfilesModel.create(payload);

    res.status(201).json(
      jsonResponse({
        response: addUserProfile,
        message: "User created",
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users", async (_, res) => {
  try {
    const userProfiles = await UserProfilesModel.findAll();
    res.json(jsonResponse({ response: userProfiles }));
  } catch (error) {
    console.error("Error fetching profile user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user/:id", protectedData, async (req, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const userProfiles = await UserProfilesModel.findByPk(userId);
    res.json(jsonResponse({ response: userProfiles }));
  } catch (error) {
    console.error("Error fetching profile user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router };
