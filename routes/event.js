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

  try{
    const targetEvent = await EventModel.findOne({
      eventId:eventId
    })

    res.status(200).json(targetEvent)
  }catch(err){
    throw Error('조회에 실패');
  }
}))

// 이벤트 등록
eventRouter.post("/enroll",upload.fields([{name:'eventImageUrl'},{name:'eventKeyVisualImageUrl'}]),uploadImageMiddleware, asyncHandler(async(req,res) => {
  const eventImageUrl = req.eventImageUrl
  const eventKeyVisualImageUrl = req.eventKeyVisualImageUrl;

  let {eventId,eventTitle,eventStartDate,eventEndDate,eventFooter,eventArea} = req.body;
  eventFooter = JSON.parse(eventFooter)
  eventArea = JSON.parse(eventArea);
  let errorMessage = "이벤트 생성에 실패했습니다."
  try{
    const existEvent = await EventModel.findOne({
      eventId
    });
    if(existEvent) {
      errorMessage = '해당 고유번호는 이미 등록된 이벤트 입니다'
      throw Error()
    }

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
    throw Error(errorMessage)
  }
  
}))

eventRouter.post("/edit",upload.fields([{name:'eventImageUrl'},{name:'eventKeyVisualImageUrl'}]),uploadImageMiddleware, asyncHandler(async(req,res) => {

  console.log(req.file)
  let {eventId,eventTitle,eventStartDate,eventEndDate,eventFooter,eventArea} = req.body;
  eventFooter = JSON.parse(eventFooter)
  eventArea = JSON.parse(eventArea);

  const eventImageUrl = req.eventImageUrl;
  const eventKeyVisualImageUrl = req.eventKeyVisualImageUrl;

  const updateState = {
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventFooter,
    eventArea,
  }

  eventImageUrl ? updateState.eventImageUrl = eventImageUrl : null
  eventKeyVisualImageUrl ? updateState.eventKeyVisualImageUrl = eventKeyVisualImageUrl:null

  try{
    await EventModel.findOneAndUpdate({eventId:eventId},updateState,{ new:true })
    res.json({message:'수정이 완료되었습니다'})

  }catch(err){
    console.log('에러',err)
    throw Error('편집이 실패했습니다')
  }

}))

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