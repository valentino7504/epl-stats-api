import { SITE_URL } from './config.js';

export const welcomeMessageHTML = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #1a1a1a;
            color: #e0e0e0;
            border-radius: 8px;
        }
        h1 {
            color: #4caf50;
        }
        a {
            color: #4caf50;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Hi ${name},</h1>
    <p>Welcome to <strong>PremStats</strong> - your ultimate destination for EPL stats!</p>
    <p>We're thrilled to have you on board. With PremStats, you can:</p>
    <ul>
        <li>Explore player and club stats</li>
        <li>Create personalized collections</li>
        <li>Keep track of your favorite teams and players like never before</li>
    </ul>
    <p>If you ever have questions or need assistance, don't hesitate to reach out.</p>
    <p>You must have received your API token as a response; please make sure you store it carefully. You can get another if you lose it using the <strong>POST generate_token</strong> route.</p>
    <p>Visit the docs for more info at <a href="https://premstats.tech" target="_blank">premstats.tech</a></p>
    <p>Let's get started!</p>
    <p>Best regards,<br>Edwin, creator of Premstats.tech</p>
</body>
</html>
`;

export const welcomeMessage = (name) => `
Hi ${name},

Welcome to PremStats - your ultimate destination for EPL stats!

We're thrilled to have you on board.
With PremStats, you can:
1. Explore player and club stats
2. Create personalized collections, and
3. Keep track of your favorite teams and players like never before.

If you ever have questions or need assistance, don't hesitate to reach out.
You must have received your API token as a response, please make sure you store it carefully.
You can get another if you lose it using the get_token route. Visit the docs for more info at premstats.tech
Let's get started!

Best regards,
Edwin, creator of Premstats.tech
`;

export const resetMsgHTML = (resetToken) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #1a1a1a;
            color: #e0e0e0;
            border-radius: 8px;
        }
        h1 {
            color: #4caf50;
        }
        a {
            color: #4caf50;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Password Reset Request</h1>
    <p>Hi there,</p>
    <p>You requested to reset your password. Click on the link below to confirm your password reset:</p>
    <p><a href="${SITE_URL}/api/users/reset_password/confirm?token=${resetToken.token}">Reset Password</a></p>
    <p>This link will expire in 30 minutes. Upon clicking this link, your new password will take effect</p>
    <p>If you didn't request this, or do not wish to change your password any longer, please ignore this email.</p>
    <p>Best regards,<br>Premstats.tech Team</p>
</body>
</html>
`;

export const resetMsg = (resetToken) => `
Password Reset Request

Hi there,

You requested to reset your password. Click on the link below to confirm your password reset:

Reset Password: ${SITE_URL}/api/users/reset_password/confirm?token=${resetToken.token}

Upon clicking this link, your new password will take effect.
This link will expire in 1 hour. If you didn't request this or do not wish to change your password, please ignore this email.

Best regards,
Premstats.tech Team
`;
