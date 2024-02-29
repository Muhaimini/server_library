import { DeleteByPK } from "@client/request";
import { omit, startCase } from "lodash";
import { ClientRequest, Response, Router } from "express";
import { Book } from "models";
import { Books as BooksModel, Genres } from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { isValidPayload } from "../../../helper/validation";
import { Op } from "sequelize";

const router: Router = Router();

router.delete(
  "/book",
  async (req: ClientRequest<DeleteByPK>, res: Response) => {
    try {
      const userId = req.body.id;

      if (!userId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const book = await BooksModel.findByPk(userId);

      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      await book.destroy();
      res.status(200).json({ message: "Book successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put("/book/:id", async (req: ClientRequest<Book>, res: Response) => {
  try {
    const bookId = req.params.id;
    const payload = omit(req.body, "id");

    if (!bookId) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const book = await BooksModel.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    await BooksModel.update(payload, {
      where: { id: bookId },
    });

    res.status(200).json({ message: "Book successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/book", async (req: ClientRequest<Book>, res: Response) => {
  try {
    const payload: Book = {
      title: startCase(req.body.title),
      isbn: req.body.isbn,
      author: req.body.author,
      publishedAt: req.body.publishedAt,
      genreId: req.body.genreId,
    };

    if (!isValidPayload(payload)) {
      res.status(400).send({
        timestamp: req.timestamp,
        message: "Uncompeted. Please full fill the data",
      });
      return;
    }

    const findTargetBook = await BooksModel.findOne({
      where: { isbn: payload.isbn },
    });

    if (findTargetBook) {
      res.status(403).json({
        message: "ISBN already exists, please check again",
      });
      return;
    }

    const createdBook = await BooksModel.create(payload);

    const targetBook = await BooksModel.findByPk(createdBook.id, {
      include: [
        {
          model: Genres,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["genreId"] },
    });

    res.status(201).json({
      response: targetBook,
      message: "Book created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await BooksModel.findAll({
      where: { title: { [Op.iLike]: `%${req.query?.search}%` } },
      include: [
        { model: Genres, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
      attributes: { exclude: ["genreId"] },
    });

    res.json(jsonResponse({ response: books }));
  } catch (error) {
    console.error("Error fetching Books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/book/:id", async (req, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const userProfiles = await BooksModel.findByPk(userId, {
      include: [
        { model: Genres, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
    });
    res.json(jsonResponse({ response: userProfiles }));
  } catch (error) {
    console.error("Error fetching profile user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router };
