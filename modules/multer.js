const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2"
});
const upload = multer(
  {
    storage: multerS3({
      s3,
      bucket: process.env === 'development'? "event-auto/static" : "event-auto-real/static",
      acl: "public-read-write",
      key: function (req, file, cb) {
        const fileExtend =  file.originalname.split('.').pop()
        cb(null, `${Date.now()}_${file.originalname.split('.').slice(0,-1).join('_')}.${fileExtend}`);
      },
    }),
  },
  
);

module.exports = upload;

