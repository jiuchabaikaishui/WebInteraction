// 导入模块
const express = require('express');
// 创建服务器
const app = express();
// 监听客户端请求
app.get('/user', function(req, res) {
    res.send('请求成功');
});
app.post('/user', function(req, res) {
    res.send('请求成功');
});
app.get('/', function(req, res) {
    // 查询参数
    console.log('查询参数', req.query);
    res.send('请求成功');
});
app.get('/user/:id/:name', function(req, res) {
    // 动态参数
    console.log('动态参数', req.params);
    res.send('请求成功');
});
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/files', express.static('files'))
// 调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, ()=>{
    console.log('server running at http://127.0.0.1:80');
});