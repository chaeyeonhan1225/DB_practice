const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const connect = require('./schemas');

require('dotenv').config();

const passportConfig = require('./passport');
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');

const app = express();
connect();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

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

passportConfig(passport);

app.use('/',indexRouter);
app.use('/auth',authRouter);

// Error Handler
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000,()=>{
    console.log("3000번 포트에서 서버 실행 중");
});