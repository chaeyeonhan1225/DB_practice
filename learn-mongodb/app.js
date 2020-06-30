const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
// const passport = require('passport');

require('dotenv').config();

// routers
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const connect = require('./schemas');
// const passportConfig = require('./passport');
const { truncateSync } = require('fs');

const app = express();
connect();  // mongodb connection
// passportConfig(passport);

// set
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT||8001);

// middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

// routers
app.use('/',indexRouter);
app.use('/user',userRouter);

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

// app.listen
app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 포트에서 서버 실행 중`);
})