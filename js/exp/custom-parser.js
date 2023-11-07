// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring');
const parser = function(req, res, next) {
    var data = '';
    // 监听 req 的 data 事件
    req.on('data', (chunk)=> {
        data += chunk;
    });
    // 监听 req 的 end 事件
    req.on('end', (d)=> {
        console.log(data);
        // 把字符串格式的请求体数据，解析成对象格式
        req.body = qs.parse(data);
        next();
    });
};

module.exports = parser;