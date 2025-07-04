import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      // 🔍 Check if user already exists
      let user = await User.findOne({ email });

      // 👤 If not, create new
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: email
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
