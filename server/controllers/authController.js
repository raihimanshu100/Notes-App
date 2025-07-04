import User from '../models/User.js';
import { sendOTP } from '../utils/mailer.js';
import { setOtp, verifyOtp } from '../tempOtpStore.js';


export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  setOtp(email, otp);
  await sendOTP(email, otp);

  res.status(200).json({ message: 'OTP sent to email' });
};

export const verifyOtpController = async (req, res) => {
  const { email, otp, name, dob } = req.body;

  const isValid = verifyOtp(email, otp);
  if (!isValid) return res.status(401).json({ message: 'Invalid or expired OTP' });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, dob });
      await user.save();
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const logoutController = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
};


export const getUserController = (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
