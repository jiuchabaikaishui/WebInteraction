const express = require('express');
const router = express.Router();

// 添加解析body中数据的中间件
router.use(express.urlencoded({ extended: false }));

router.get('/get', function(req, res) {
    console.log(req.query);
    const msg = req.method + '请求：' + req.hostname + req.url + ' 成功';
    res.send({
        status: 0,
        message: msg,
        data: req.query
    });
});
router.post('/post', function(req, res) {
    console.log(req.body);
    const msg = req.method + '请求：' + req.hostname + req.url + ' 成功';
    res.send({
        status: 0,
        message: msg,
        data: req.body
    });
});
router.delete('/delete', function(req, res) {
    console.log(req.body);
    const msg = req.method + '请求：' + req.hostname + req.url + ' 成功';
    res.send({
        status: 0,
        message: msg,
        data: req.body
    });
});

module.exports = router;