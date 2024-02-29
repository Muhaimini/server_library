import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Genres from "../genres";
import { Book } from "models";

@Table
class Books extends Model<Book> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ allowNull: false, unique: true })
  isbn!: string;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  author!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  publishedAt!: Date;

  @Column({ type: DataType.INTEGER, defaultValue: 3 })
  quantity!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  totalBorrowed!: number;

  @ForeignKey(() => Genres)
  @Column({ type: DataType.UUID, allowNull: false })
  genreId!: string;

  @BelongsTo(() => Genres)
  genre!: Genres;
}

export default Books;
