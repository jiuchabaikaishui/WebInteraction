const express = require('express');
const router = express.Router();
const handler = require('../routerHandler/userinfo');

// 获取用户信息
router.get('/userinfo', handler.userinfo);

const expressJoi = require('../middleware/expressJoi');
const { schema } = require('../schema/user');
// 更新用户信息
router.post('/userinfo', expressJoi(schema.userinfo), handler.updateUserinfo);

// 修改密码
router.post('/updatePassword', expressJoi(schema.updatePassword), handler.updatePassword);

// 更换头像
router.post('/updateAvatar', expressJoi(schema.updateAvatar), handler.updateAvatar);

module.exports = router;