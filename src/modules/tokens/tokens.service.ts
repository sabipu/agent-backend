import { AuthProviderStatuses, AuthProviderTypes } from '../auth_providers/authProviders.constants';
import authProvidersService from '../auth_providers/authProviders.service';
import { UserStatuses } from '../users/users.constants';
import usersService from '../users/users.service';
import { TokenTypes } from './tokens.constant';
import { Tokens, Tokens as tokensRepository } from './tokens.model';
import { CreateTokenData, FindOneTokenQuery, UpdateTokenData, TokenValidateData } from './tokens.type';

async function createToken(data: CreateTokenData): Promise<Tokens> {
  return await tokensRepository.create(data);
}

async function updateToken(tokenId: string, data: UpdateTokenData) {
  const token = await tokensRepository.findOne({
    where: { tokenId }
  })

  if (!token) {
    throw {
      code: 404,
      message: 'TokenNotFound'
    }
  }
  token.set(data);
  return await token.save()
}

async function findToken(query: FindOneTokenQuery): Promise<Tokens | null> {
  return tokensRepository.findOne({
    where: query,
  });
}

async function validateEmailOTPToken(tokenId: string, data: TokenValidateData): Promise<any> {
  const token = await tokensRepository.findOne({ where: { tokenId: tokenId, type: TokenTypes.OTP_EMAIL_VERIFICATION }});

  if(!token) {
    throw {
      code: 404,
      message: 'TokenNotFound'
    }
  }

  const user = await usersService.findUser({ id: token.user })

  if(!user) {
    throw {
      code: 404,
      message: 'UserNotFound'
    }
  }

  if(user.email === data.email && Number(token.otp) === Number(data.otp)) {
    await authProvidersService.createAuthProvider({
      user: user.id,
      type: AuthProviderTypes.PLATFORM,
      email: user.email,
      status: AuthProviderStatuses.ACTIVE
    })
    return await usersService.updateUser(user.userId, { userStatus: UserStatuses.ACTIVE })
  } else {
    throw {
      code: 400,
      message: 'Invalid input'
    }
  }
}

async function validateResetPasswordOTPToken(tokenId: string, data: TokenValidateData): Promise<any> {
  const token = await tokensRepository.findOne({ where: { tokenId: tokenId, type: TokenTypes.OTP_RESET_PASSWORD }});

  if(!token) {
    throw {
      code: 404,
      message: 'TokenNotFound'
    }
  }

  const user = await usersService.findUser({ id: token.user })

  if(!user) {
    throw {
      code: 404,
      message: 'UserNotFound'
    }
  }

  if(user.email === data.email && Number(token.otp) === Number(data.otp)) {
    // Add logic to reset the password
    await authProvidersService.createAuthProvider({
      user: user.id,
      type: AuthProviderTypes.PLATFORM,
      email: user.email,
      status: AuthProviderStatuses.ACTIVE
    })
    return await usersService.updateUser(user.userId, { userStatus: UserStatuses.ACTIVE })
  } else {
    throw {
      code: 400,
      message: 'Invalid input'
    }
  }
}

async function deleteToken(tokenId: string) {
  const token = await tokensRepository.findOne({
    where: {
      tokenId
    }
  })

  if (!token) {
    throw {
      code: 404,
      message: 'TokenNotFound'
    }
  }

  return await token.destroy()
}

export default {
  createToken,
  updateToken,
  findToken,
  validateEmailOTPToken,
  validateResetPasswordOTPToken,
  deleteToken
};
