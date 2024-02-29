import { Model, Column, Table, DataType, HasMany } from "sequelize-typescript";
import { UserProfile } from "models";
import Borrower from "../borrower";
import { USER_TYPE } from "../../types";

@Table
class UserProfiles extends Model<UserProfile> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ allowNull: false, unique: true })
  identityId!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  address!: string;

  @Column({ allowNull: false })
  contact!: string;

  @Column({ defaultValue: USER_TYPE.MEMBER })
  type!: USER_TYPE;

  @HasMany(() => Borrower)
  borrower!: Borrower;
}

export default UserProfiles;
