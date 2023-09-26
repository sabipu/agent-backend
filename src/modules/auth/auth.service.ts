import { Users } from '@/modules/users/users.model'
import jwt from 'jsonwebtoken'
import { AuthTokenResData } from './auth.type';
import tokensService from '../tokens/tokens.service';
import { TokenTypes } from '../tokens/tokens.constant';

export const generateJWTLoginTokens = async (user: Users): Promise<AuthTokenResData> => {
  try {
    const data = { userId: user.userId };
    const accessToken = jwt.sign({ data }, process.env.ACCESS_TOKEN_PRIVATE_KEY!, { expiresIn: '60d' });
    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_PRIVATE_KEY!, { expiresIn: '100d' });

    const userToken = await tokensService.findToken({ user: user.id, type: TokenTypes.JWT_REFRESH_TOKEN });
    if (userToken) await tokensService.deleteToken(userToken.tokenId);
    await tokensService.createToken({ user: user.id, type: TokenTypes.JWT_REFRESH_TOKEN, refreshToken });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};