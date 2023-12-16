const db = require('../db/index');
const bcrypt = require('bcryptjs');
const constValue = require('../middleware/constValue');

const signin = (req, res) => {
    const info = req.body;

    // 数据校验交给 expressJoi 中间件处理
    // if (info.username && info.password) {
        db.query(constValue.selectUN, info.username, function(err, result) {
            if (err) {
                res.cc(err);
            } else if (result.length > 0) {
                res.cc('用户名被占用，请更换其他用户名！');
            } else {
                // 调用 bcrypt.hashSync(明文密码, 随机盐的长度) 方法，对用户的密码进行加密处理
                info.password = bcrypt.hashSync(info.password, 10);
                db.query(constValue.insertUser, {username: info.username, password: info.password}, function(err, result) {
                    if (err) {
                        res.cc(err);
                    } else if (result.affectedRows === 1) {
                        res.cc('注册成功！', 0);
                    } else {
                        res.cc('注册失败，请稍后重试！');
                    }
                });
            }
        });
    // } else {
    //     res.cc('用户名或密码不能为空！');
    // }
};

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { use } = require('../router/user');
const login = (req, res) => {
    const info = req.body;
    // 查询 username 是否存在
    db.query(constValue.selectUN, info.username, function(err, result) {
        if (err) {
            res.cc(err);
        } else if (result.length === 1) {
            // 判断密码是否正确
            if (bcrypt.compareSync(info.password, result[0].password)) {
                // 剔除用户敏感信息后的数据作为 token 的加密数据
                const user = { ...result[0], password: '', user_pic: '' }
                console.log(user);
                const token = jwt.sign(user, constValue.jwtSecretKey, { expiresIn: '10d' });
                res.send({
                    status: 0,
                    token: 'Bearer ' + token,
                    message: '登录成功！'
                });
            } else {
                res.cc('密码错误！');
            }
        } else {
            res.cc('登录失败！');
        }
    });
};

module.exports = {
    signin,
    login
};