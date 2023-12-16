const express = require('express');
const router = express.Router();
const handler = require('../routerHandler/user');

// 导入验证表单数据的中间件
const expressJoi = require('../middleware/expressJoi');
// 导入需要的验证规则对象
const { schema } = require('../schema/user');

// 为 注册新用户 配置表单验证中间件
// 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
//      数据验证通过后，会把这次请求流转给后面的路由处理函数
//      数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行 处理
router.post('/signin', expressJoi(schema.user), handler.signin);

// 登录
router.post('/login', expressJoi(schema.user), handler.login);

module.exports = router;