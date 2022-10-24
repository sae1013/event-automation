const {Schema} = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type:String,
      required:true
    },

    name:{
      type:String,
      required:true,
    },
    password: {
      type:String,
      required:true
    },

    isAdmin: {
      type:Boolean,
      defualt:false
    },
    

  },
  {
    timestamps:true
  }
);

module.exports = UserSchema