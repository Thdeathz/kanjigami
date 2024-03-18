import fs from 'fs'

import dotenv from 'dotenv'
import Handlebars from 'handlebars'

import transporter from '@/servers/init.mailer'

dotenv.config()

const getMailTemplate = (token: string) => {
  const source = fs.readFileSync('src/templates/verify-email.template.html', 'utf8').toString()

  const template = Handlebars.compile(source)

  const replacements = {
    webURL: process.env.WEB_URL,
    verifyURL: `${process.env.WEB_URL}/reset-password?token=${token}`,
  }

  return template(replacements)
}

const sendResetPasswordEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Reset your password',
    html: getMailTemplate(token),
  }

  await transporter.sendMail(mailOptions)
}

export default {
  sendResetPasswordEmail,
}
