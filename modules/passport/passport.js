const passport = require('passport');
const {UserModel} = require('../../models/index');
const LocalStrategy = require('passport-local').Strategy;
const {comparePassword} = require('../../utils/validate');

module.exports = () => {

  passport.serializeUser(function (user, done) {
    console.log('serialize:',user)
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) { // user: jmw93 (email)
    console.log('deserialize:',email)
    UserModel.findOne({email:email}, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) { //email을 id로 사용
      UserModel.findOne({email: email}, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) { // id가 없는경우
          return done(null, false,{message:'존재하지 않는 ID 입니다.'});
        }
        try{
          const validate = await comparePassword(password,user.password);
          if(!validate) {
            return done(null, false,{message:'비밀번호가 일치하지 않습니다.'});
          }
          return done(null,user)

        }catch(err){
          return done(null,false,{message:err.message})
        }


      });
    }
  ));

}