const {Schema} = require('mongoose');

const EventSchema = new Schema(
  {
    eventId: {
      type:String,
      required:true
    },

    eventTitle:{
      type:String,
      required:true,
    },
    eventImageUrl: {
      type:String,
      required:true
    },
    eventKeyVisualImageUrl : {
      type:String,
      required:false
    },

    eventStartDate: {
      type:Date,
      required:true
    },
    eventEndDate: {
      type:Date,
      required:true
    },
    eventFooter: {
      type:[String],
      required:false
    },
    eventArea:{
      type:[
        {
          couponNumber: {
            type:String,
            required:true
          },
          eventType:{
            type:String,
            required:true
          },
          coordXY: {
            type:String,
            required:true
          },
          _id:false
        }
      ],
      required:false
    }

  },
  {
    timestamps:true
  }
);

module.exports = EventSchema
