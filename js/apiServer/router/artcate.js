const express = require('express');
const router = express.Router();

const handler = require('../routerHandler/artcate');
router.get('/artcate', handler.artcate);

const expressJoi = require('../middleware/expressJoi');
const { schema } = require('../schema/user');
router.post('/addcates', expressJoi(schema.addcates), handler.addcates);
router.get('/deletecate/:id', expressJoi(schema.deletecate), handler.deletecate);
router.get('/cates/:id', expressJoi(schema.cates), handler.cates);
router.post('/updatecate', expressJoi(schema.updatecate), handler.updatecate);

module.exports = router;