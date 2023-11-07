const express = require('express');
const app = express();

// 全局中间件
const mw = function(req, res, next) {
    console.log('第一个全局中间件');
    next();
}
app.use(mw);
app.use(function(req, res, next) {
    console.log('第二个全局中间件');
    next();
})

// 路由 级别 中间件
const router = express.Router();
router.use('/user', function(req, res, next) {
    console.log('第一个路由级别中间件');
    next();
});
app.use(router);

// 局部中间件
app.get('/', function(req, res, next) {
    console.log('第一个局部中间件');
    next();
}, function(req, res) {
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});

const mw1 = function(req, res, next) {
    console.log('第二个局部中间件');
    next();
};
app.get('/user', mw1, function(req, res) {
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});

// 内置中间件
// 解析 表单中的 url-encoded 编码格式的中间件
app.use('/post', express.urlencoded({ extended: false }));
// 解析表单中的 JSON 格式的数据的中间件
app.use('/post', express.json());
app.post('/post', function(req, res) {
    // 在服务器端，可以通过 req,body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
    // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
    console.log(req.body);
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});

// 第三方中间件
// 导入中间件
const parser = require('body-parser');
// 注册中间件
app.use('/parser', parser.urlencoded({ extended: false }));
app.use('/parser', parser.json());
app.post('/parser', function(req, res) {
    console.log(req.body);
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});

// 使用自定义中间件
const customparser = require('./custom-parser');
app.post('/custom', customparser, (req, res)=> {
    console.log(req.body);
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});

// 路由
app.get('/error', function(req, res) {
    // 抛出错误
    throw new Error('服务器发生错误！');
    res.send(req.method + '请求：' + req.hostname + req.url + ' 成功');
});
// 错误级别的中间件
app.use(function(err, req, res, next) {
    console.log('发生错误：' + err.message);
    // 向客户端响应错误相关内容
    res.send('Error! ' + err.message);
})

app.listen(80, function() {
    console.log('server running at http://127.0.0.1:80');
});