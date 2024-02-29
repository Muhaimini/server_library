import { DeleteByPK } from "@client/request";
import { Borrower } from "models";
import { ClientRequest, Response, Router } from "express";
import {
  Books,
  Borrower as BorrowerModel,
  Genres,
  UserProfiles,
} from "../../../models";
import { jsonResponse } from "../../../helper/response";
import { isValidPayload } from "../../../helper/validation";
import { omit } from "lodash";
import { createBorrowMiddleware } from "../../../middleware/borrow";

const router: Router = Router();

router.delete(
  "/borrower",
  async (req: ClientRequest<DeleteByPK>, res: Response) => {
    try {
      const borrowId = req.body.id;

      if (!borrowId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const borrower = await BorrowerModel.findByPk(borrowId);

      if (!borrower) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      await borrower.destroy();
      res.status(200).json({ message: "Data successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put(
  "/borrower/return/:id",
  async (req: ClientRequest<Borrower>, res: Response) => {
    try {
      const borrowerId = req.params.id;
      const userProfileId = req.body.userProfileId;

      const borrower = await BorrowerModel.findByPk(borrowerId);

      if (!borrower) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      if (borrower.returnDate) {
        res.status(404).json({ message: "Already borrowed" });
        return;
      }

      const targetBook = await Books.findByPk(borrower?.bookId);

      if (!!targetBook) {
        const totalBorrowed = targetBook?.totalBorrowed || 0;

        await Books.update(
          { totalBorrowed: totalBorrowed - 1 },
          { where: { id: targetBook?.id } }
        );
        await BorrowerModel.update(
          { returnDate: new Date() },
          { where: { userProfileId, bookId: targetBook?.id, id: borrower?.id } }
        );
      }

      const response = await BorrowerModel.findByPk(borrowerId);

      res.status(200).json({ response, message: "Data successfully updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.put(
  "/borrower/:id",
  async (req: ClientRequest<Borrower>, res: Response) => {
    try {
      const borrowerId = req.params.id;
      const payload = omit(req.body, "id");

      if (!borrowerId) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const borrower = await BorrowerModel.findByPk(borrowerId);

      if (!borrower) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await BorrowerModel.update(payload, {
        where: { id: borrowerId },
      });

      res.status(200).json({ message: "Data successfully updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/borrower",
  createBorrowMiddleware,
  async (req: ClientRequest<Borrower>, res: Response) => {
    try {
      const payload: Borrower = {
        userProfileId: req.body.userProfileId,
        bookId: req.body.bookId,
      };

      if (!isValidPayload(payload)) {
        res.status(400).send({
          timestamp: req.timestamp,
          message: "Uncompeted. Please full fill the data",
        });
        return;
      }

      const createBorrower = await BorrowerModel.create(payload);
      const findTargetBook = await Books.findByPk(payload.bookId);

      if (!findTargetBook) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      const totalBorrowed = (findTargetBook?.totalBorrowed || 0) + 1;
      await Books.update({ totalBorrowed }, { where: { id: payload.bookId } });

      res.status(201).json(
        jsonResponse({
          response: createBorrower,
          message: "Data created",
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/borrower", async (_, res) => {
  try {
    const borrower = await BorrowerModel.findAll({
      include: [
        {
          model: Books,
          attributes: { exclude: ["genreId"] },
          include: [
            {
              model: Genres,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
        { model: UserProfiles },
      ],
      attributes: { exclude: ["userProfileId", "bookId"] },
    });
    res.json(jsonResponse({ response: borrower }));
  } catch (error) {
    console.error("Error fetching Borrower:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router };
