import { logger } from '@/server/logger';
import { ISendEmailData } from './media.types'
import { renderEmailTemplate, emailTransport } from './helpers'

async function sendEmail(sendEmail: ISendEmailData): Promise<any> {
  const { to, template, data } = sendEmail
  try {
    const html = await renderEmailTemplate(template, data);

    await emailTransport().sendMail({
      from: process.env.EMAIL_FROM_ADDRESS,
      to,
      subject: data.subject,
      html
    });

    logger.info(`Successfully sent an email to ${to} using template ${template}`)

    return { success: 'ok' }
  } catch (error) { 
    logger.error(`Couldnot send email to ${to}. Template used: ${template}`)
    logger.error(error)
    throw {
      code: 500,
      message: 'Couldnot send email'
    }
  }
}

export default {
  sendEmail
}
