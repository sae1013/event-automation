const express = require("express");
const imageRouter = express.Router();
const upload = require("../modules/multer");

imageRouter.post("/upload",upload.array("eventImageUrl", 4),
  async (req, res) => {
    const uploadedImages = req.files;
    const imagePaths = uploadedImages.map((img) => img.location);
    if (!uploadedImages) {
      res.status(400).json({ message: "이미지가 없습니다!" });
    }
    console.log(req.body.eventType);
    res.status(200).json(imagePaths);
  }
);

module.exports = imageRouter;