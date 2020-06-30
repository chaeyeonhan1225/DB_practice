const local = require('./localStrategy');
const User = require('../schemas');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    
    passport.deserializeUser((id,done)=>{
        // 구현 필요
    })
}