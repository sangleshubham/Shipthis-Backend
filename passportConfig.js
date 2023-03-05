import { Strategy } from "passport-local";
import bcrypt from "bcrypt";


export default async function initialize(passport, getUserByEmail, getUserById) {
  async function authenticateUser(username, password, done) {
    const user = await getUserByEmail(username);
    if (user == null) {
      return done(null, false, { message: "no user with that email" });
    } else {
      try {
        // console.log('comparing password' , user)
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password Incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    }
  }

  passport.use(new Strategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

