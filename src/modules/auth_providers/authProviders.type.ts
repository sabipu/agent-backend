import { AuthProviderStatuses, AuthProviderTypes } from './authProviders.constants'

export type CreateAuthProviderData = {
  user: any
  type: AuthProviderTypes
  email: string
  status: AuthProviderStatuses
  metadata?: AuthProviderMetadata
}

export type UpdateAuthProviderData = {
  email?: string
  providedUserId?: string
  verifiedAccountId?: string
  metadata?: AuthProviderMetadata
  status?: AuthProviderStatuses
}

export type FindOneAuthProviderQuery = {
  user?: any
  email?: string
  type?: AuthProviderTypes
  verifiedAccountId?: string
  providedUserId?: string
  status?: AuthProviderStatuses
}



export type AuthProviderMetadata = {
  [key: string]: string | number | Date
}