
const db = require('../db/index');
const constValue = require('../middleware/constValue');

const userinfo = function(req, res) {
    console.log(req.auth);
    db.query(constValue.selectInfo, req.auth.id, function(err, result) {
        if (err) {
            res.cc(err);
        } else if (result.length === 1) {
            res.send({
                status: 0,
                data: result[0],
                message: '用户信息获取成功！'
            });
        } else {
            res.cc('用户信息获取失败！');
        }
    });
};
const updateUserinfo = function(req, res) {
    db.query(constValue.updateInfo, [req.body, req.auth.id], function(err, result) {
        console.log(result);
        if (err) {
            res.cc(err);
        } else if (result.affectedRows === 1) {
            res.cc('用户信息更新成功！', 0);
        } else {
            res.cc('用户信息更新失败！');
        }
    });
};

const bcrypt = require('bcryptjs');
const updatePassword = function(req, res) {
    // 判断用户是否存在
    db.query(constValue.selectUN, req.auth.username, function(err, result) {
        if (err) {
            res.cc(err);
        } else if (result.length === 1) {
            console.log(req.body);
            console.log(result);
            // 判断原密码是否正确
            if (bcrypt.compareSync(req.body.oldPassword, result[0].password)) {
                // 更新密码
                db.query(constValue.updatePassword, [bcrypt.hashSync(req.body.newPassword, 10), req.auth.id], function(err, result) {
                    console.log(result);
                    if (err) {
                        res.cc(err);
                    } else if (result.affectedRows === 1) {
                        res.cc('密码修改成功！', 0);
                    } else {
                        res.cc('密码修改失败！');
                    }
                });
            } else {
                res.cc('原密码错误！');
            }
        } else {
            res.cc('用户不存在！');
        }
    });
};

// 更换头像
const updateAvatar = (req, res) => {
    console.log('------------');
    console.log(req.body);
    db.query(constValue.updateAvatar, [req.body.user_pic, req.auth.id], (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.affectedRows === 1) {
            res.cc('更换头像成功！', 0);
        } else {
            res.cc('更换头像失败！');
        }
    })
}

module.exports = {
    userinfo,
    updateUserinfo,
    updatePassword,
    updateAvatar
};