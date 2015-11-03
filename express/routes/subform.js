var express = require('express');
var router = express.Router();

// get 方式提交了一个表单
router.get('/', function(req, res) {
  var
      userName = req.query.user,
      userPwd = req.query.password,

      userName2 = req.param('user'),
      userPwd2 = req.param('password');


  res.render('subform', {
        title: '提交表单及接收参数'
  });
});

// post 方式提交一个表单
router.post('/', function (req, res) {
    var
        userName = req.body.user,
        userPwd = req.body.pwd,

        userName2 = req.param('user'),
        userPwd2 = req.param('pwd');


        console.log('req.body用户名:'+userName);
        console.log('req.body密码:'+userPwd);

        console.log('req.param用户名:'+userName2);
        console.log('req.param密码:'+userPwd2);

        //req.query：用来接收GET方式提交参数
        //req.body：用来接收POST提交的参数
        //req.params：两种都能接收到

});

module.exports = router;












