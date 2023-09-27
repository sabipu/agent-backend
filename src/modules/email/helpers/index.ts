import path from 'path'
import nodemailer from 'nodemailer'
import nodemailerSendgrid  from 'nodemailer-sendgrid'
import Email from 'email-templates'
import { AllEmailTemplateTypes, IEmailContentDataTypes } from '../email.types'
import { APP_ENVIRONMENT, config } from '@/config'

export const emailTransport = () => {
  if(APP_ENVIRONMENT === 'development') return nodemailer.createTransport(config.EMAIL_SERVICE_INFO);
  if(APP_ENVIRONMENT === 'production') return nodemailer.createTransport(nodemailerSendgrid(config.EMAIL_SERVICE_INFO));
  return nodemailer.createTransport(config.EMAIL_SERVICE_INFO);
}

export const renderEmailTemplate = async(template: AllEmailTemplateTypes, emailData: IEmailContentDataTypes) => {
  const templatePath = path.join(__dirname, '..', 'templates');
  const emailTemplate = new Email({ views: { root: templatePath } });
  const localData = {
    data: {
      ...emailData,
      serverHost: process.env.STATIC_HOST_URL
    }
  }

  return emailTemplate.render(`${template}.pug`, localData);
}