// value of enum should match the email template name
// in ./src/templates folder
export enum AllEmailTemplateTypes {
  INVITATION = "invitation",
  WELCOME = "welcome"
}

export type IInvitationEmailData = {
  otp: number
  firstName: string
  subject: string
}

export type IWelcomeEmailData = {
  forgotPasswordToken: number
  subject: string
}

export type IEmailContentDataTypes = IInvitationEmailData | IWelcomeEmailData

export type ISendEmailData = {
  to: string
  template: AllEmailTemplateTypes
  data: IEmailContentDataTypes
}