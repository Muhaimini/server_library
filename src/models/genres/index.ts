import { Model, Column, Table, DataType } from "sequelize-typescript";
import { Genre } from "models";

@Table
class Genres extends Model<Genre> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ allowNull: false, unique: true })
  label!: string;
}

export default Genres;
