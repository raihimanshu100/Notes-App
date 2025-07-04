import express from 'express';
import passport from 'passport';
import {
  sendOtpController,
  verifyOtpController,
  logoutController,
  getUserController,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);


router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: true,
  }),
  (req, res) => {
    if (req.user) {
      req.session.user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
      };
    }

    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/user', getUserController);

router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ loggedIn: true, user: req.user });
  }
  return res.status(200).json({ loggedIn: false });
});

router.post('/logout', logoutController);

export default router;
