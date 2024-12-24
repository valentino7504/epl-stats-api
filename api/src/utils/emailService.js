import * as nodemailer from 'nodemailer';
import {
  EMAIL_USER, EMAIL_PWD, SIGNUP_EMAIL_USER, SIGNUP_EMAIL_PWD,
} from './config.js';

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

const welcomeMessage = (name) => `
Hi ${name},

Welcome to PremStats - your ultimate destination for EPL stats!

We're thrilled to have you on board.
With PremStats, you can:
1. Explore player and club stats
2. Create personalized collections, and
3. Keep track of your favorite teams and players like never before.

If you ever have questions or need assistance, don't hesitate to reach out.

You will receive an email with your API token shortly! Do not share it (:
(It's our little secret).

Let's get started!

Best regards,
Edwin, creator of Premstats.tech
`;

export const sendWelcomeMail = async (to, userName) => {
  console.log(SIGNUP_EMAIL_USER, SIGNUP_EMAIL_PWD);
  const info = await signUpTransport.sendMail({
    to,
    from: SIGNUP_EMAIL_USER,
    subject: 'Welcome',
    text: welcomeMessage(userName),
  });
  return info.messageId;
};

const sendMail = async (to, subject, text) => {
  const info = await emailTransport.sendMail({
    from: `"Premstats.tech" <${EMAIL_USER}>`,
    to,
    subject,
    text,
  });
  return info.messageId;
};

export default sendMail;
