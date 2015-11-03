var mongoose = require('mongoose');
// 创建了一个连接
module.exports = {
    createConnection: function () {
        // 创建了一个连接
        var connection = mongoose.createConnection('mongodb://localhost:27017/news/');// db的名称
            connection.on('error', console.error.bind(console, '连接错误.'));
            connection.on('open', function () {
                console.log('数据库连接成功');
            });
            connection.on('close', function () {
                console.log('数据库关闭');
            });
        return connection;
    }
};