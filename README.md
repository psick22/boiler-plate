# boiler-plate

## 1. 목적

Nodejs 와 React 를 이용하여 웹페이지를 구성하기 위한 기본 기능 템플릿 구현
(회원가입, 로그인, 로그아웃, 인증 관련 기초 기능)

## 2. 사용한 프레임워크/라이브러리

- Back : Node, express, MongoDB,
- Front : React, React Hooks, Redux
- 기타 : nodemon, bcrypt, jsonwebtoken, proxy, concurrently,

## 3. 설치방법

(1) root directory에서 Backend dependencies 설치
`$ npm install`

(2) client directory에서 Frontend dependencies 설치
`$ npm install`

(3) server/config/dev.js 를 생성하고 MongoDB Cluster 정보를 입력

#### <dev.js>

```JavaScript
module.exports = {
  mongoURI:
    "mongodb+srv://<user>:<password>@boilerplate.vbjgi.mongodb.net/<dbname>?retryWrites=true&w=majority",
};
```

## 4. Source

[John Ahn (Youtube)](https://www.youtube.com/watch?v=fgoMqmNKE18&feature=emb_title)
