import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

// JWT 토큰 발급
export const generateToken = (userId, res) => {
  if (!ENV.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: 'strict',
    secure: ENV.NODE_ENV === 'development' ? false : true, // http or https
  });

  return token;
};
