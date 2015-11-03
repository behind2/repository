// 排行的路由
var express = require('express');
var router = express.Router();

// 获取新闻的model
var newsModel = require('../models/news').createModel();


router.get('/', function(req, res, next) {
    newsModel.find({}, function (err, news) {
        if (err) console.log(err);
        res.render('ranking', {data: news}, function (err, htmlStr) {
            if (err) console.log(err);
            //res.jsonp({msg: 0, data: [1, 2, 3, 4]});
            res.jsonp({msg: 0, data: JSON.parse(htmlStr)});
        });
    });
});

module.exports = router;