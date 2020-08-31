// router.js 职责
//处理路由
//根据不同的请求方法+请求路径设置具体的请求处理函数

var express = require('express');
var fs = require('fs');
var Students = require('../student-fs');
const {
    callbackify
} = require('util');


//1.创建路由容器
var router = express.Router();

var User = require('../models/user');

// var md5 = require('blueimp-md5');
const user = require('../models/user');


//2.把路由全部挂载到路由容器中
router.get('/', function (req, res) {
    //readFile 的第二个参数是可选的，传入utf-8 就是告诉读取的文件按照utf-8编码
    //也可以使用 data.toString()

    Students.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('index.html', {
            students: students,
            user: req.session.user
        })
    })

})

//渲染添加页面
router.get('/students/new', function (req, res) {
    res.render('new.html')
});


//处理添加页面
router.post('/students/new', function (req, res) {

    Students.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    })

});


//渲染编辑学生页面
router.get('/students/edit', function (req, res) {
    
    Students.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('edit.html', {
            student: student
        });
    })

});

router.post('/students/edit', function (req, res) {

    Students.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    })
});



router.get('/students/delete', function (req, res) {

    Students.delete(parseInt(req.query.id), function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    });
});


//3.导出路由
module.exports = router;