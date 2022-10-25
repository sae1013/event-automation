const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/async-handler');
const {UserModel} = require('../models/index');

router.post("/", asyncHandler(async(req,res) => {

}))

router.get("/", asyncHandler(async(req,res) => {

}))

module.exports = router;
