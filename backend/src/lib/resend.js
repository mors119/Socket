import { Resend } from 'resend';
import { ENV } from './env.js';

const { RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME } = ENV;

if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

export const resendClient = new Resend(RESEND_API_KEY);

export const sender = {
  email: EMAIL_FROM,
  name: EMAIL_FROM_NAME,
};
