const express = require('express');
const app = express();

// JSONP 接口
app.get('/jsonp', function(req, res) {
    const msg = req.method + '请求：' + req.hostname + req.url + ' 成功';
    const data = {
        status: 0,
        message: msg
    };
    // 根据回调函数名和返回数据，拼接出一个回调函数调用的字符串
    const result = req.query.callback + '(' + JSON.stringify(data) + ')';
    res.send(result);
})

// 配置 cors 这个中间件，从而解决接口跨域的问题，一定要在路由之前，
const cors = require('cors');
app.use('/cors', cors());

// 注册路由
const router = require('./apiRouter.js');
app.use('/api', router);
app.use('/cors', router);

app.listen(80, function() {
    console.log('server running at http://127.0.0.1:80');
});