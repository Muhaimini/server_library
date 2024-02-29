import { NextFunction, Request, Response } from "express";
import { Borrower } from "models";
import { Books, Borrower as BooksModel } from "../models";

export const createBorrowMiddleware = async (
  req: Request<Borrower>,
  res: Response,
  nextFunction: NextFunction
) => {
  try {
    const findTargetBook = await Books.findOne({
      where: { id: req.body.bookId },
    });

    const myCollectionBooks = await BooksModel.findOne({
      where: {
        bookId: findTargetBook?.id,
        userProfileId: req.body.userProfileId,
      },
    });

    const quantity = findTargetBook?.quantity || 3;
    const totalBorrowed = findTargetBook?.totalBorrowed || 0;

    if (myCollectionBooks) {
      res.status(403).json({
        message:
          "You cannot borrow more than one of the same book. Please choose another!",
      });
      return;
    }

    if (quantity === totalBorrowed) {
      res.status(404).json({
        message: "Sorry!, empty stock!",
      });
      return;
    }

    nextFunction();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default createBorrowMiddleware;
