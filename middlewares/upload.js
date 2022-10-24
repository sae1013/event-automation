const uploadImageMiddleware = async (req, res,next) => {
  const uploadedImages = req.files;
  const imagePaths = uploadedImages.map((img) => img.location);
  if (!uploadedImages) {
    res.status(400).json({ message: "이미지가 없습니다!" });
  }
  // res.status(200).json(imagePaths);
  next();
}
module.exports = {
  uploadImageMiddleware
}