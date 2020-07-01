const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/',(req,res,next)=>{
    User.find({})
    .then((users)=>{
        res.render('main',{
            title:"Learn Mongoose",
            users,
        });
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});



module.exports = router;