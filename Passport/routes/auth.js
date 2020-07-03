const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../schemas/user');

const router = express.Router();

router.post('/login',isNotLoggedIn,passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
}),(req,res,next)=>{
    console.log("로그인");
    console.log(req.body);
   
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.redirect('/');
    });
});

router.post('/join',isNotLoggedIn,async (req,res,next)=>{
    const { email, password, nick } = req.body;
    try{
        const exUser = await User.findOne({
            email: email
        });
        if(exUser){
            console.log('이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password,12);
        console.log("암호화된 비밀번호: ",hash);
        await new User({
            email: email,
            password: hash,
            nick: nick,
        }).save();
        return res.redirect('/');
    } catch(error) {
        console.log(error);
        return next(error);
    }
    
});

module.exports = router;