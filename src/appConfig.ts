export enum EmailValidationMethod {
  EMAILOTPCODE = 'EMAILOTPCODE',
  EMAILVALIDATIONLINK = 'EMAILVALIDATIONLINK',
}

export const appConfig = {
  authProviders: ['google'],
  emailValidationMethod: EmailValidationMethod.EMAILOTPCODE
}