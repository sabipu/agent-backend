import path from 'path'
import nodemailer from 'nodemailer'
import Email from 'email-templates'
import { AllEmailTemplateTypes, IEmailContentDataTypes } from '../email.types'

export const emailTransport = () => {
  return nodemailer.createTransport({
    host: "localhost",
    port: 1025
  });
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