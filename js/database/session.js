// 导入模块
const express = require('express');
const session = require('express-session');

const app = express();
// 配置中间件
app.use(session({
    secret: 'keyword: myKeyword', //可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true // 固定写法
}));
// 添加解析body中数据的中间件
app.use(express.urlencoded({ extended: false }));
// 托管静态资源
app.use(express.static('./pages'));

// 登录接口
app.post('/api/login', function(req, res) {
    if (req.body.username !== 'zs' && req.body.password !== '123456') {
        return res.send({ status: 1, message: '登录失败' });
    }

    // 将用户信息、登录状态存储到session中
    req.session.user = { username: req.body.username };
    req.session.islogin = true;
    res.send({ status: 0, message: '登录成功' });
});
app.get('/api/username', function(req, res) {
    if (!req.session.islogin) {
        return res.send({ status: 1, message: '请求失败' });
    }

    res.send({ status: 0, username: req.session.username, message: '请求成功' });
});
app.post('/api/logout', function(req, res) {
    // 清空当前客户端 session 信息
    req.session.destroy();
    res.send({ status: 0, message: '退出成功' });
});

app.listen('80', function() {
    console.log('server running at http://127.0.0.1:80');
});