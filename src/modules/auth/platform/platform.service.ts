import { AuthProviderStatuses, AuthProviderTypes } from "@/modules/auth_providers/authProviders.constants"
import authProvidersService from "@/modules/auth_providers/authProviders.service"
import { UserStatuses, UserTypes } from "@/modules/users/users.constants"
import usersService from "@/modules/users/users.service"
import { generateJWTLoginTokens } from "../auth.service"
import { PlatformLoginPayload, ResetPasswordPayload, PlatformPayload } from "./platform.type"
import { comparePassword, hashPassword } from "../helpers/password.helper"
import tokensService from "@/modules/tokens/tokens.service"
import { TokenTypes } from "@/modules/tokens/tokens.constant"
import { generateOTP } from "@/utils/utilts"
import { Tokens } from "@/modules/tokens/tokens.model"
import emailService from "@/modules/email/email.service"
import { AllEmailTemplateTypes } from "@/modules/email/email.types"
import { EmailSubjectConstants } from "@/modules/email/email.constants"

async function loginWithPlatform(payload: PlatformLoginPayload) {
  const existingAuthProvider = await authProvidersService.findAuthProvider({
    email: payload.email
  })

  if (!existingAuthProvider) {
    throw {
      code: 400,
      message: 'Auth provider not registered'
    }
  }


  if (existingAuthProvider.status === AuthProviderStatuses.DEACTIVATED) {
    throw {
      code: 400,
      message: 'Auth provider was deactivated'
    }
  }

  const user = await usersService.findUser({ id: existingAuthProvider.user })

  if (user?.userStatus === UserStatuses.DEACTIVATED) {
    throw {
      code: 400,
      message: 'User does not exist'
    }
  }
  const passwordMatch = await comparePassword(payload.password, user?.hashedPassword as string);
  if (!passwordMatch) {
    throw {
      code: 404,
      message: "IncorrectPassword"
    }
  }

  return generateJWTLoginTokens(user!)
}

// Find a user with an email. If user exist complain user exists
// If authProvider other than the platform, return accessToken
// If new email. create user, and send validation email.
async function signupWithPlatform(payload: PlatformPayload): Promise<Tokens | any> {
  const user = await usersService.findUser({ email: payload.email });
  if(user?.userStatus === UserStatuses.ACTIVE) {
    throw {
      code: 400,
      message: 'UserExists'
    }
  }

  if (!user) {
    const newUser = await usersService.createUser({
      firstName: payload.firstName,
      email: payload.email,
      avatar: payload.picture,
      hashedPassword: await hashPassword(payload.password),
    });
    const token = await tokensService.createToken({ user: newUser.id, type: TokenTypes.OTP_EMAIL_VERIFICATION, otp: generateOTP() });
    await emailService.sendEmail({
      to: newUser.email,
      template: AllEmailTemplateTypes.INVITATION,
      data: {
        firstName: "",
        otp: Number(token.otp),
        subject: EmailSubjectConstants.SIGNUP_EMAIL_VERIFICATION
      }
    })
    return token
  }

  const authProvider = await authProvidersService.findAuthProvider({ email: payload.email });
  const otpToken = await tokensService.findToken({ user: user.id, type: TokenTypes.OTP_EMAIL_VERIFICATION });

  if (!authProvider && !otpToken) {
    const token = await tokensService.createToken({ user: user.id, type: TokenTypes.OTP_EMAIL_VERIFICATION, otp: generateOTP() });
    
    await emailService.sendEmail({
      to: user.email,
      template: AllEmailTemplateTypes.INVITATION,
      data: {
        firstName: "",
        otp: Number(token.otp),
        subject: EmailSubjectConstants.SIGNUP_EMAIL_VERIFICATION
      }
    })
    
    return token
  }

  return otpToken ? tokensService.updateToken(otpToken.tokenId, { otp: generateOTP() }) : user && authProvider?.type === AuthProviderTypes.PLATFORM ? { code: 400, message: 'User already exists' } : null;
}

async function forgotWithPlatform(email: string) {
  const findUser = await usersService.findUser({ email });
  if (!findUser) {
    throw {
      code: 400,
      message: 'No user found',
    };
  }
  
  const token = await tokensService.createToken({ user: findUser.id, type: TokenTypes.OTP_RESET_PASSWORD, otp: generateOTP() });
    
  await emailService.sendEmail({
    to: findUser.email,
    template: AllEmailTemplateTypes.INVITATION,
    data: {
      firstName: "",
      otp: Number(token.otp),
      subject: EmailSubjectConstants.FORGOT_PASSWORD
    }
  })

  return token
}

async function resetPasswordWithPlatform(payload: ResetPasswordPayload): Promise<boolean> {
  return true
}



export default {
  loginWithPlatform,
  signupWithPlatform,
  forgotWithPlatform,
  resetPasswordWithPlatform
}