import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core'
import { DeletedAt, Attribute, PrimaryKey, NotNull, Index, Default, Unique } from '@sequelize/core/decorators-legacy'
import { createShortId } from '@/utils/utilts'
import { UserStatuses, UserTypes } from './users.constants';

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(24))
  @Index
  @Default(() => createShortId())
  declare userId: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  @Index
  declare email: string;

  @Attribute(DataTypes.STRING)
  declare hashedPassword: string | null;

  @Attribute(DataTypes.STRING)
  declare firstName: string | null;

  @Attribute(DataTypes.STRING)
  declare lastName: string | null;

  @Attribute(DataTypes.STRING)
  declare avatar: string | null;

  @Attribute(DataTypes.ENUM(UserTypes))
  @Default(UserTypes.CONSUMER)
  declare userType: UserTypes | undefined;

  @Attribute(DataTypes.ENUM(UserStatuses))
  @Default(UserStatuses.INACTIVE)
  declare userStatus: UserStatuses | undefined;

  @DeletedAt
  declare deletedAt: Date | null;
}