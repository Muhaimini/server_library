import { DeleteByPK } from "@client/request";
import { Genre } from "models";
import { omit, startCase } from "lodash";
import { ClientRequest, Response, Router } from "express";
import { Genres } from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { isValidPayload } from "../../../helper/validation";

const router: Router = Router();

router.delete(
  "/genre",
  async (req: ClientRequest<DeleteByPK>, res: Response) => {
    try {
      const userId = req.body.id;

      if (!userId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const genre = await Genres.findByPk(userId);

      if (!genre) {
        res.status(404).json({ message: "Genre not found" });
        return;
      }

      await genre.destroy();
      res.status(200).json({ message: "Genre successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put("/genre/:id", async (req: ClientRequest<Genre>, res: Response) => {
  try {
    const genreId = req.params.id;
    const payload = omit(req.body, "id");

    if (!genreId) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const genre = await Genres.findByPk(genreId);

    if (!genre) {
      res.status(404).json({ message: "Genre not found" });
      return;
    }

    await Genres.update(payload, {
      where: { id: genreId },
    });

    res.status(200).json({ message: "Genre successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/genre", async (req: ClientRequest<Genre>, res: Response) => {
  try {
    const payload: Genre = {
      label: startCase(req.body.label),
    };

    if (!isValidPayload(payload)) {
      res.status(400).send({
        timestamp: req.timestamp,
        message: "Uncompeted. Please full fill the data",
      });
      return;
    }

    const createGenre = await Genres.create(payload);

    res.status(201).json(
      jsonResponse({
        response: createGenre,
        message: "Genre created",
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/genre", async (_, res) => {
  try {
    const genre = await Genres.findAll();
    res.json(jsonResponse({ response: genre }));
  } catch (error) {
    console.error("Error fetching Genre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router };
