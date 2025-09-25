import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// 회원가입
export const signup = async (req, res) => {
  const { fullName, email, password } = await req.body;
  const name = typeof fullName === 'string' ? email.trim().toLowerCase() : '';
  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';
  const pass = typeof password === 'string' ? password : '';

  try {
    if (!name || !normalizedEmail || !pass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    // check if email is valid: reges
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (user) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      fullName: name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser.id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });
      // TODO: send a welcome email to user
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
