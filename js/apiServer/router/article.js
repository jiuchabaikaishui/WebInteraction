const express = require('express');
const routor = express.Router();

const handler = require('../routerHandler/article');
const { schema } = require('../schema/user');
const expressJoi = require('../middleware/expressJoi');
const multer = require('multer');
const path = require('path');
const uploads = multer({ dest: path.join(__dirname, '../uploads')});

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
routor.post('/addArticle', uploads.single('cover_img'), expressJoi(schema.addArticle), handler.addArticle);

module.exports = routor;