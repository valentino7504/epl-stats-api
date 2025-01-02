import { Router } from 'express';
import { validateEmailAndPassword } from '../utils/auth.js';
import { sendMail, sendWelcomeMail } from '../services/emailService.js';
import {
  createUser, deleteUser, getUserByEmail, updateUser,
} from '../services/usersService.js';
import { verifySecret } from '../utils/secretHashing.js';
import { assignUserToken, deleteUserTokens } from '../services/tokenService.js';
import { createPasswordToken, updateUserPassword } from '../services/passwordResetTokenService.js';
import { resetMsg, resetMsgHTML } from '../utils/emailMessages.js';
import { authenticateToken } from '../utils/middleware.js';

const usersRouter = Router();

usersRouter.post('/signup', async (req, res) => {
  let user;
  try {
    user = await createUser(req);
  } catch (error) {
    return res.status(400).json({ error: 'Input error', message: error.message });
  }
  sendWelcomeMail(user.email);
  const tokenJson = await assignUserToken(user, req.body.sendEmail);
  return res.status(201).json(tokenJson);
});

usersRouter.get('/me', authenticateToken, async (req, res) => {
  const me = req.user;
  return res.status(200).json(me);
});

usersRouter.delete('/me', authenticateToken, async (req, res) => {
  try {
    await deleteUser(req);
    return res.status(204).end();
  } catch (err) {
    return res.json({ error: 'Unauthorized', message: err.message });
  }
});

usersRouter.post('/me', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await updateUser(req);
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
});

usersRouter.post('/generate_token', async (req, res) => {
  const { email, password, sendEmail } = req.body;
  let user;
  try {
    validateEmailAndPassword(email, password);
    user = await getUserByEmail(email);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
  const verified = await verifySecret(user.hashedPassword, password);
  if (!verified) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid password for provided email' });
  }
  const tokenJson = await assignUserToken(user, sendEmail, email);
  return res.status(201).json(tokenJson);
});

usersRouter.delete('/revoke_all_tokens', authenticateToken, async (req, res) => {
  await deleteUserTokens(req.user);
  return res.status(204).end();
});

usersRouter.post('/reset_password', async (req, res) => {
  let resetToken;
  try {
    resetToken = await createPasswordToken(req);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
  sendMail(
    req.body.email,
    'Password Reset',
    resetMsg(resetToken),
    resetMsgHTML(resetToken),
  );
  return res.status(200).json({ message: 'Check the registered email for further details' });
});

usersRouter.get('/reset_password/confirm', async (req, res) => {
  const { token } = req.query;
  try {
    const user = await updateUserPassword(token);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
});

export default usersRouter;
