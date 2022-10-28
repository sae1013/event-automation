const uploadImageMiddleware = async (req, res,next) => {
  const uploadedImages = req.files;
  const eventImageUrls = uploadedImages?.eventImageUrl;
  const eventKeyVisualImageUrls = uploadedImages?.eventKeyVisualImageUrl;

  eventImageUrls ? req.eventImageUrl = eventImageUrls[0].location : null
  eventKeyVisualImageUrls ? req.eventKeyVisualImageUrl = eventKeyVisualImageUrls[0].location : null
  next();
}
module.exports = {
  uploadImageMiddleware
}