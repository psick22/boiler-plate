const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(console.log);

app.get('/', (req, res) => {
  res.send('Hello World!23123123123');
});

//test
app.get('/api/hello', (req, res) => {
  res.send('1231231232123');
});

//회원가입 route
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//로그인 route
app.post('/api/users/login', (req, res) => {
  //요청된 email을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다',
      });
    }
    //email이 있다면 비밀번호가 같은지 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      //비밀번호가 같다면 Token 을 생성
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        }

        //토큰을 저장한다. (>> 쿠키 <<, 로컬 스토리지, 세션 스토리지 등)
        // cookieparser library이용
      });
    });
  });
});

// auth route
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 토오가해 왔다는 얘기는 Atuthentication이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃 route
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
