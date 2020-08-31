var express = require('express');

var User = require('../models/user');

// var md5 = require('blueimp-md5');
const user = require('../models/user');
var router = express.Router();

router.get('/register', function (req, res) {
  res.render('register.html');
})

router.post('/register', function (req, res) {

  var body = req.body;
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    //邮箱或昵称已存在
    if(data){
      return res.status(200).json({
        err_code: 1,
        message: 'A mailbox or nickname already exists'
      })
    }

    // body.password = md5(md5(body.password)+'itcast')
    new User(body).save(function(err,user){

      if(err){
        return res.status(500).json({
          err_code: 500,
          message: err.message
        })
      }
      req.session.user = user;
      return res.status(200).json({
        err_code: 0,
        message: 'ok'
      })    
    })
  })
})

router.get('/login', function (req, res) {
  res.render('login.html');
})


router.post('/login', function (req, res) {
  var body = req.body;
  User.findOne({
    
    email: body.email,
    password: body.password
    
  },function(err,user){
    if(err){
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }

    //邮箱或密码不正确
    if(!user){
      return res.status(200).json({
        err_code: 1,
        message: 'Incorrect email or password'
      })     
    }

    req.session.user = user; 
    //邮箱密码都正确
    return res.status(200).json({
      err_code: 0,
      message: 'ok'
    })  
  })
})

router.get('/logout', function (req, res) {
  res.render('register.html');
})



module.exports = router;