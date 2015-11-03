
var newsSchema  = require('../schemas/news');
var connection  = require('../connections/news').createConnection();


module.exports = {
    createModel: function () {
        return connection.model('news', newsSchema);
    },
    close: function () {
        connection.close();
    }
};