const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/async-handler');
const {UserModel} = require('../models/index');

router.post("/", asyncHandler(async(req,res) => {

  // res.status(200).json('Wery!')
}))

router.get("/", asyncHandler(async(req,res) => {
  const user = await UserModel.create({
    email:'jmw93',
    name:'asdf',
    password:'123123'
  })
  console.log(user)
  // res.status(200).json('Wery!')
}))
module.exports = router;
