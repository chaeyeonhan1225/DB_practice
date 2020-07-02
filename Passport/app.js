const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
const user = {
    userId : "abcd",
    userPassword : "1111"
};

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        secure: false,
    }
  }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log("serializeUser: ",user);
    done(null, user.userId);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    done(null,user);
  });

passport.use(new LocalStrategy({
        usernameField: "userId",
        passwordField: "userPassword"
    },
    function(username, password, done) {
        console.log('LocalStrategy',username,password);
        if(user.userId===username && user.userPassword===password){
            console.log("아이디,비밀번호 일치");
            // 일치하는 유저가 있다.
            return done(null,user);
        }
        if(user.userId!==username){
            console.log("아이디 불일치");
            return done(null,false,{ message : "Incorrect id"});
        }
        if(user.userPassword!==password){
            console.log("비밀번호 불일치");
            return done(null,false,{ message : "Incorrect password"});
        }
    }
  ));

app.get('/',(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("로그인 되어있음");
    }
    console.log('req.user: ',req.user);
    console.log(req.session);
    res.render('main',{ user: req.user, message: req.flash('error') });
});

app.post('/auth/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
}),(req,res,next)=>{
    console.log("로그인");
    console.log(req.body);
   
});

app.get('/auth/logout',(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.redirect('/');
    });
});

app.listen(3000,()=>{
    console.log("3000번 포트에서 서버 실행 중");
});