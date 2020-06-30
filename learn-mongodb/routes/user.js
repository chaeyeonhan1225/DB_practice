const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

// user/join
router.post('/join',(req,res,next)=>{
    const user = new User({
        userId: req.body.userId,
        userPassword: req.body.password,
        nick: req.body.nick
    });
    user.save()
        .then((result)=>{
            console.log(result);
            res.status(201).json(result);
        })
        .catch((error)=>{
            console.log(error);
            next(error);
        });
});

// user/login

module.exports = router;