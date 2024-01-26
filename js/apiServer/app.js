// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 在 路由 之前自定义中间件，处理错误的响应数据
app.use(function(req, res, next) {
    // status 默认值1，表示失败，0表示成功
    // err 可能是错误对象，也可能是错误描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        });
    };

    next();
});

// 配置跨域中间件
const cors = require('cors');
app.use(cors());

// 配置静态资源
app.use('/uploads', express.static('uploads'));

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 配置 解析 Token 的中间件
var { expressjwt } = require('express-jwt');
const constValue = require('./middleware/constValue');
app.use(expressjwt({
    secret: constValue.jwtSecretKey, 
    algorithms: [constValue.jwtAlgorithms]
}).unless({
    path: [constValue.jwtUnlessPath]
}));

// 配置路由
const user = require('./router/user');
app.use('/api', user);
const userinfo = require('./router/userinfo');
app.use('/my', userinfo);
const artcate = require('./router/artcate');
app.use('/my', artcate);
const article = require('./router/article');
app.use('/my', article);

// 配置 错误处理 中间件
const joi = require('joi');
app.use(function(err, req, res, next) {
    // console.log(err);
    if (err instanceof joi.ValidationError) {
        // 处理数据校验错误
    } else if (err.name === 'UnauthorizedError') {
        // 处理身份认证失败的错误
        return res.cc('身份验证失败！');
    } else {
        // 处理其他未知错误
    }
    return res.cc(err);
});

// 指定端口号并启动web服务器
app.listen('80', function() {
    console.log('server running at http://127.0.0.1:80');
});