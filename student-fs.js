/**
 * 封装提取student 数据
 * 不考虑业务，只关心数据
 */

var fs = require('fs');

var dbPath = './db.json';

 /**
  * 查找学生数据
  */

 exports.find = function (callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if(err){
            return callback(err);
        }
        callback(null, JSON.parse(data).students);
    })
 }

/**
 * 根据id获取学生
 */
exports.findById = function(id, callback){
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var ret = students.find(function (item) {
            return item.id === parseInt(id);
        })
        callback(null, ret);
    })
    
}



   /**
  * 添加保存学生
  */
 exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;

        //处理id唯一的，不重复
        if(students.length==0){
            student.id = 1;
        }else{
            student.id = students[students.length - 1].id + 1;

        }

        //把用户的数据保存到数组中
        students.push(student);

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null);
        })
    })

 }


 /**
  * 更新学生数据
  */

 exports.updateById = function (student, callback) {

    fs.readFile(dbPath, 'utf-8', function(err, data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;

        //你需要修改谁，你就把谁找出来
        //es6 中的一个数组方法： find
        //需要接收一个函数作为参数
        //当某个遍历项符合 item.id === student.id的时候，find会终止遍历，同时返回遍历项
        student.id = parseInt(student.id);

        var stu = students.find(function(item){
            return item.id === student.id;
        }) 

        for (var key in student) {
            stu[key] = student[key];
        } 

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null);
        })
        
    })
     
 }


 




 /**{}
  * 删除学生数据
  */
 exports.delete = function (id, callback) {

    fs.readFile(dbPath, 'utf-8', function(err, data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;

       //findIndex 方法专门用来根据条件查元素的下标
       var index = students.findIndex(function (item) {
           return item.id === parseInt(id);
       })       

       students.splice(index,1)

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null);
        })
        
    })
    
     
 }

