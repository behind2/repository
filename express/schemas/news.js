// 定义新闻的schema
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// 此处的schema可以在补充完善, 目前先这两个字段吧
var newsSchema = new Schema({
    title: String,
    link: String
});

// 保存前, 做校验仅保存有效连接
newsSchema.pre('save', function (next) {

    if ( /^(http\:\/\/)/g.test(this.link) ) {
        this.link = this.link.replace(/[\n\s]*/g, '');
        this.title = this.title.replace(/[\n\s]*/g, '');
        next();
    }

});

// 保存后, 成功提示
newsSchema.post('save', function () {
    console.log('我是钩子函数, 保存成功了!');
    console.log('在这里可以加上入库时间.');
    //console.log(arguments);
});

// 静态方法
newsSchema.static({
    findDocs: function (conditions, cb) {// json条件, 回调函数
        return this
            .find(conditions)
            .exec(cb);
    }
});

// exposed API
module.exports = newsSchema;