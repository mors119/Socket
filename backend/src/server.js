import express from 'express';

import path from 'path';

import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json()); // request.body

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

// make ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../fronted', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
  connectDB();
});
