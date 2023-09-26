import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core'
import { DeletedAt, Attribute, PrimaryKey, NotNull, Index, Default, BelongsTo } from '@sequelize/core/decorators-legacy'
import { Users } from '@/modules/users/users.model'
import { AuthProviderStatuses, AuthProviderTypes } from './authProviders.constants';
import { AuthProviderMetadata } from './authProviders.type';

export class AuthProviders extends Model<InferAttributes<AuthProviders>, InferCreationAttributes<AuthProviders>> {
  public user: any

  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;
  
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

  @Attribute(DataTypes.STRING)
  @NotNull
  @Index
  declare email: string;

  @Attribute(DataTypes.ENUM(AuthProviderTypes))
  declare type: AuthProviderTypes;

  @Attribute(DataTypes.ENUM(AuthProviderStatuses))
  declare status: AuthProviderStatuses;

  @Attribute(DataTypes.JSON)
  declare metadata: AuthProviderMetadata | undefined;

  @DeletedAt
  declare deletedAt: Date | null;
}