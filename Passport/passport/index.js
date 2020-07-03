const localStrategy = require('./localStrategy');
const User = require('../schemas/user');

module.exports = (passport)=>{
    passport.serializeUser(function(user, done) {
        console.log("serializeUser: ",user);
        done(null, user.email);
    });
      
    passport.deserializeUser((id, done) => {
        console.log("deserializeUser");
        User.findOne({ email : id })
            .then(user => done(null,user))
            .catch(err => done(err)); 
    });
    
    localStrategy(passport);
}