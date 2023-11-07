const express = require('express');
const app = express();

// 导入 路由 模块
const router = require('./user.js');

// 注册 路由
app.use('/api', router);
// app.use(router);
app.listen(80, ()=> {
    console.log('server running at http://127.0.0.1:80');
});