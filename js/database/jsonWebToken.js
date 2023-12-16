// 导入生成 JWT 字符串的包
const jwt = require('jsonwebtoken');
// 导入将 JWT 字符串还原成 JSON 对象的包
var {expressjwt: expressJWT} = require('express-jwt');

// 定义秘钥
const secretKey = 'abc123ABC!@#';

const express = require('express');
const app = express();
// 添加解析中间件
app.use(express.urlencoded( { extended: false } ));

// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
// use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }) 用来解析 token 的中间件
// unless({ path: [/^\/api\//] }) 指定哪些接口不需要访问权限
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

app.post('/api/login', function(req, res) {
    if (req.body.username === 'zs' && req.body.password === '123456') {
        // jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
        // 参数1：用户的信息对象
        // 参数2：加密的秘钥
        // 参数3：配置对象，可以配置当前 token 的有效期
        // 记住：千万不要把密码加密到 token 字符中
        const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '2h', algorithm: 'HS256'});
        res.send({
            status: 0,
            token: token,
            message: '登录成功'
        });
    } else {
        res.send({
            status: 1,
            message: '登录失败'
        });
    }
});
app.get('/my/info', function(req, res) {
    console.log(req.auth);
    res.send({
        status: 0,
        userinfo: req.auth,
        message: '请求成功'
    });
});

// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use(function(err, req, res, next) {
    console.log(err, req, res);
    // err.name === 'UnauthorizedError' 的错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
        res.send({
            status: 2,
            message: '无效的token'
        });
    } else {
        res.send({
            status: 3,
            message: '未知错误'
        });
    }
});

// 监听端口，启动服务器
app.listen('80', function() {
    console.log('server running at http://127.0.0.1:80');
});