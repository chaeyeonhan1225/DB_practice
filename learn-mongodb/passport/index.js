const local = require('./localStrategy');
const User = require('../schemas/user');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    
    passport.deserializeUser((id,done)=>{
        // 구현 필요
        User.findOne({userId:id})
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });

    local(passport);
}