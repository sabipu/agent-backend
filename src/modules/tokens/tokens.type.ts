import { TokenTypes } from './tokens.constant';

export type CreateTokenData = {
  type: TokenTypes;
  user: string;
  otp?: number;
  refreshToken?: string
};

export type FindOneTokenQuery = {
  user?: any;
  type?: TokenTypes;
  otpHash?: string
};

export type UpdateTokenData = {
  otp?: number
  refreshToken?: string
}

export type TokenValidateData = {
  email: string
  otp: number
}