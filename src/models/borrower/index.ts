import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
  BeforeValidate,
} from "sequelize-typescript";
import Books from "../books";
import { Borrower as BorrowerProps } from "models";
import UserProfiles from "../user-profiles";

@Table
class Borrower extends Model<BorrowerProps> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ type: DataType.DATE, defaultValue: null })
  returnDate!: Date;

  @Column({ type: DataType.DATE })
  maximumReturnAt!: Date;

  @BeforeValidate
  static setMaximumReturnAt(book: Borrower) {
    if (!book.maximumReturnAt && book.createdAt) {
      const returnOfDate = new Date(book.createdAt);
      returnOfDate.setDate(returnOfDate.getDate() + 14);
      book.maximumReturnAt = returnOfDate;
    }
  }

  @ForeignKey(() => UserProfiles)
  @Column({ type: DataType.UUID, allowNull: false })
  userProfileId!: string;

  @BelongsTo(() => UserProfiles)
  userProfile!: UserProfiles;

  @ForeignKey(() => Books)
  @Column({ type: DataType.UUID, allowNull: false })
  bookId!: string;

  @BelongsTo(() => Books)
  book!: Books;
}

export default Borrower;
