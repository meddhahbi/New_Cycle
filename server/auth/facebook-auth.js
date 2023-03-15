const FacebookStrategy = require("passport-facebook").Strategy;
const User = require('../Models/User');

FACEBOOK_APP_ID = "112503405109537";
FACEBOOK_APP_SECRET = "c61235236f907cf527db89c8a6291ffd"
module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3001/auth/facebook/callback",
        profileFields: ["id", "displayName", "emails"],
        scope: ["email"],
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