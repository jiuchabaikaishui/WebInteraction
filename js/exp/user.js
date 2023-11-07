// 导入 express
const express = require('express');
// 创建 路由 对象
const router = express.Router();

// 挂载 路由
router.get('/user/login', function(req, res) {
    res.send('login');
});
router.post('/user/add', function(req, res) {
    res.send('add');
});

// 向外导出路由对象
module.exports = router;