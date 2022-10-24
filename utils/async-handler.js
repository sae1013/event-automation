module.exports = (requestHandler) => {
  return async (req, res, next) => { // 실제로 얘가 돈다.
    try {
      await requestHandler(req, res); 
      
    } catch (err) {
      console.log(err.message)
      next(err);
    }
  }
}