const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 70,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킴
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plain password와 암호화된 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      console.log(isMatch);
      cb(null, isMatch);
      console.log(isMatch);
    }
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 토큰 생성
  var token = jwt.sign(user._id.toHexString(), "1234");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });

  // user._id + "secretToken" = token;
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // token을 디코딩
  jwt.verify(token, "1234", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 후
    // 클라이언트에서 가져온 token 과 DB에 저장된 token 이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
