import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send('SignUp endpoint');
});
router.get('/login', (req, res) => {
  res.send('SignUp endpoint');
});
router.get('/logout', (req, res) => {
  res.send('Logout endpoint');
});
router.get('/update', (req, res) => {
  res.send('Update endpoint');
});

export default router;
