module.exports = {
  loginRequired: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({
        message: '로그인이 필요합니다'
      })
    }
  },

  adminRequired: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({
        message: '로그인이 필요합니다'
      })
      return
    }
    if(!req.user.isAdmin) {
      res.status(401).json({
        message:'관리자 권한이 필요합니다'
      })
      return
    }
      next();
  }
}