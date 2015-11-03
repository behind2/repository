
var cheerio         = require('cheerio');
var request         = require('request');
var iconv           = require('iconv-lite');
var url             = 'http://www.qq.com/';

var newsModel       = require('../models/news').createModel();

var getQQIndexAnchors = function (url) {

    request({
        uri: url,
        method: 'GET',
        encoding: null
    }, function (error, response, body) {

        if ( !error && response.statusCode === 200 ) {
            var $ = cheerio.load( iconv.decode(body, 'GBK') );
            var anchors = $('a');

                for ( var i = 0, iLen = anchors.length; i < iLen; i ++ ) {
                    var record = anchors.eq(i);
                    var link = record.attr('href');
                    var title = record.text();

                    newsModel.create({
                        title: title,
                        link: link
                    }, function () {
                        console.log('单条数据保存成功！');
                    });
                }

        } else {
            console.log('请求异常, 错误为：' + error);
            return;
        }

    });
};

// 调用下
getQQIndexAnchors(url);