import { dataSource } from '../../database/database'
import { AuthProviders, AuthProviders as authProvidersRepository } from './authProviders.model'
import { CreateAuthProviderData, FindOneAuthProviderQuery, UpdateAuthProviderData } from './authProviders.type'

async function createAuthProvider(authProvider: CreateAuthProviderData): Promise<AuthProviders> {
  return await authProvidersRepository.create(authProvider)
}

async function updateAuthProvider(id: string, data: UpdateAuthProviderData) {
  const authProvider = await authProvidersRepository.findOne({
    where: {
      id,
    }
  })

  if (!authProvider) {
    throw {
      code: 404,
      message: 'Auth provider not found'
    }
  }
  authProvider.set(data);
  return await authProvider.save()
}

async function findAuthProvider(query: FindOneAuthProviderQuery): Promise<AuthProviders | null> {
  return authProvidersRepository.findOne({
    where: query
  })
}

export default {
  createAuthProvider,
  updateAuthProvider,
  findAuthProvider,
}