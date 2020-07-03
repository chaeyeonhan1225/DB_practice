const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('req.user: ',req.user);
    res.render('main',{ user: req.user, message: req.flash('error') });
});

router.get('/join',isNotLoggedIn,(req,res,next)=>{
    res.render('join');
});

module.exports = router;
