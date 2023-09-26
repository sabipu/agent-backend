import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core'
import { Attribute, PrimaryKey, Index, Default, BelongsTo, NotNull } from '@sequelize/core/decorators-legacy'
import { createShortId } from '@/utils/utilts'
import { TokenTypes } from './tokens.constant';
import { Users } from '../users/users.model';

export class Tokens extends Model<InferAttributes<Tokens>, InferCreationAttributes<Tokens>> {
  public user: string;
  
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(24))
  @Index
  @Default(() => createShortId())
  declare tokenId: CreationOptional<string>;

  @BelongsTo(() => Users, {
    foreignKey: {
      allowNull: false,
      columnName: 'user',
      name: 'user'
    },
    inverse: {
      as: 'user',
      type: 'hasMany'
    },
    targetKey: 'id',
    foreignKeyConstraints: true
  })
  declare userId: NonAttribute<Users>;

  @Attribute(DataTypes.ENUM(TokenTypes))
  @NotNull
  declare type: TokenTypes;

  @Attribute(DataTypes.TEXT)
  declare refreshToken: string | undefined;

  @Attribute(DataTypes.BIGINT)
  declare otp: number | undefined;
}
