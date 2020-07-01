const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const user = require('../schemas/user');

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

// user/search
router.post('/search',(req,res,next)=>{
    const userId = req.body.userId;
    if(userId){
        User.findOne({
            userId: userId
        })
        .then((result)=>{
            if(result){
                res.status(201).json({result:result.nick});
            } else {
                res.status(201).send({result:"검색 결과가 없습니다."});
            }
        })
        .catch((err)=>{
            console.error(err);
            next(error);
        });
        
    }
});

// user/login


module.exports = router;