var express = require('express');
var path = require('path');
var app = express();
var indexRouter = require('./routes/index');
var studentRouter = require('./routes/student');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//parser application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parser application/json
app.use(bodyParser.json());

app.engine('html', require('express-art-template'));

app.use(session({
  //配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  secret: 'itcast', 
  resave: false,
  //无论你是否使用Session，我都默认直接给你分配一把钥匙
  // false 时，只有使用Session 才给你配钥匙
  saveUninitialized: true
}))


app.use(indexRouter);
app.use(studentRouter);

app.listen(5000,function(){
  console.log('server is running');
})