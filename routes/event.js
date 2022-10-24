const asyncHandler = require('../utils/async-handler')

let bodyParser = require('body-parser');
let parser = bodyParser.urlencoded({extended:false});

const express = require("express");
const eventRouter = express.Router();
const {EventModel} = require('../models/index');
const upload = require("../modules/multer");
const {uploadImageMiddleware} = require('../middlewares/upload');

//이벤트 전체 조회
eventRouter.get("/",asyncHandler(async(req,res) => {
  
  try{
    const targetEvent = await EventModel.find({
    })
    res.status(200).json(targetEvent)
  }catch(err){
    throw Error('조회에 실패');
  }
  
}))

//ID로 이벤트 조회
eventRouter.get("/:eventId",asyncHandler(async(req,res) => {
  const {eventId} = req.params;
  console.log(req.params)
  
  try{
    const targetEvent = await EventModel.findOne({
      eventId:eventId
    })

    console.log(targetEvent)
    res.status(200).json(targetEvent)
  }catch(err){
    throw Error('조회에 실패');
  }
  
}))

// 이벤트 등록
eventRouter.post("/enroll",upload.array("eventImageUrl", 4),uploadImageMiddleware, async(req,res) => {
  const eventImageUrl = req.files[0].location;
  const eventKeyVisualImageUrl = req.files[1]?.location;

  let {eventId,eventTitle,eventStartDate,eventEndDate,eventFooter,eventArea} = req.body;
  eventFooter = JSON.parse(eventFooter)
  eventArea = JSON.parse(eventArea);
  
  try{
    const generatedEvent = await EventModel.create({
      eventId,
      eventTitle,
      eventStartDate,
      eventEndDate,
      eventFooter,
      eventArea,
      eventImageUrl,
      eventKeyVisualImageUrl
    })
    res.json(generatedEvent)
  }catch(err){
    throw Error('등록이 실패했습니다')
  }
  
})

eventRouter.delete("/", asyncHandler(async(req,res) => {
  const {eventId} = req.body;
  try {
    const deletedEvent = await EventModel.findOneAndDelete({
      eventId:eventId
    })
    res.json({message:'이벤트가 삭제되었습니다'})

  }catch(err){
    throw Error('해당하는 이벤트가 없습니다.')
  }

}))

module.exports = eventRouter;