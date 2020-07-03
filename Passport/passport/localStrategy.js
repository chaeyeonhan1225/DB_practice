const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            console.log("LocalStrategy 수행");
            const exUser = await User.findOne({
                email: username
            });
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password);
                if(result){
                    done(null,exUser);
                } else {
                    console.log("Incorrect password");
                    done(null,false,{ message : "Incorrect password"});
                } 
            } else {
                console.log("Incorrect email");
                done(null,false,{ message : "Incorrect id"});
            }
        } catch {
            console.error(error);
            done(error);
        }
    }
  ));
}