const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/async-handler');
const {UserModel} = require('../models/index');
const passport = require('passport');
const bcrypt = require('bcrypt');

router.get("/",asyncHandler(async (req, res) => {
    console.log(req.isAuthenticated())
    res.json({message:'yes'})

}))

//로그인
router.post('/login',(req,res,next) => {
    passport.authenticate('local',(err,user,info) => {
        if(err){
            throw Error(err)
        }
        if(!user) {return res.status(401).json({message:info.message})}
        if(user) {return res.status(200).json(user)}
    })(req,res,next)

});

//회원가입
router.post('/signup',asyncHandler(async(req,res,next) => {
    const {email,password,name} = req.body;
    const existedUser = await UserModel.findOne({email});
    if(existedUser){
        res.status(401).json({message:'이미 가입된 이메일이 존재합니다.'});
        return
    }
    try{
        const hashPassword = await bcrypt.hash(password,11)
        await UserModel.create({
            email,
            password:hashPassword,
            name,
        })

        res.status(200).json({message:'회원가입이 완료되었습니다'});

    }catch (err){
        throw Error(err)
    }
}))





module.exports = router;
