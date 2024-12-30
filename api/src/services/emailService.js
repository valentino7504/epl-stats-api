import * as nodemailer from 'nodemailer';
import {
  EMAIL_USER, EMAIL_PWD, SIGNUP_EMAIL_USER, SIGNUP_EMAIL_PWD,
} from '../utils/config.js';
import { welcomeMessage, welcomeMessageHTML } from '../utils/emailMessages.js';

const signUpTransport = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: SIGNUP_EMAIL_USER,
    pass: SIGNUP_EMAIL_PWD,
  },
});
const emailTransport = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PWD,
  },
});

export const sendWelcomeMail = async (to) => {
  const info = await signUpTransport.sendMail({
    to,
    from: SIGNUP_EMAIL_USER,
    subject: 'Welcome',
    text: welcomeMessage(to.split('@')[0]),
    html: welcomeMessageHTML(to.split('@')[0]),
  });
  return info.messageId;
};

export const sendMail = async (to, subject, text, html) => {
  const info = await emailTransport.sendMail({
    from: `"Premstats.tech" <${EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
  return info.messageId;
};
