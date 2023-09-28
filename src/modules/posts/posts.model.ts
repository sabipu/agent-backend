import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core'
import { DeletedAt, Attribute, PrimaryKey, NotNull, Index, Default, Unique, BelongsTo } from '@sequelize/core/decorators-legacy'
import { createShortId } from '@/utils/utilts'
import { Users } from '@/modules/users/users.model'

export class Posts extends Model<InferAttributes<Posts>, InferCreationAttributes<Posts>> {
  public user: any
  
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(24))
  @Index
  @Default(() => createShortId())
  declare postId: CreationOptional<string>;

  @BelongsTo(() => Users, {
    foreignKey: {
      allowNull: false,
      columnName: 'user',
      name: 'user'
    },
    targetKey: 'id',
    foreignKeyConstraints: true
  })
  declare userAssociation: NonAttribute<Users>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.TEXT)
  declare description: string | null;

  @DeletedAt
  declare deletedAt: Date | null;
}