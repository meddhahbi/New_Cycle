var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../Models/User');


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
      userModel.findById(id, function (err, user) {
        done(err, user);
      });
    });
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:3001/auth/google/callback",
        },
    
        function (accessToken, refreshToken, profile, cb) {
            
            console.log(profile);
            User.findOne({ googleId: profile.id }, { timeout: 15000 })
  .then((user) => {
    if (user) {
      const updatedUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
       // isActive:true,
        secret: accessToken,
      };
      return User.findOneAndUpdate(
        { _id: user.id },
        { $set: updatedUser },
        { new: true }
      );
    } else {
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        isActive:true,
        secret: accessToken,
      });
      return newUser.save();
    }
  })
  .then((result) => {
    return cb(null, result);
  })
  .catch((err) => {
    return cb(err);
  });
          }
        )
      );}