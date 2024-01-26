const db = require('../db/index');
const constValue = require('../middleware/constValue');

const artcate = (req, res) => {
    db.query(constValue.selectArticle, (err, result) => {
        if (err) {
            res.cc(err);
        } else {
            res.send({
                status: 0,
                data: result,
                message: '文章分类列表获取成功！'
            });
        }
    });
};
const addcates = (req, res) => {
    db.query(constValue.selectNameOrAlias, [req.body.name, req.body.alias], (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.length === 2 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            res.cc('分类名称与别名被占用！');
        } else if (result.length === 1 && result[0].name === req.body.name) {
            res.cc('分类名称被占用！');
        } else if (result.length === 1 && result[0].alias === req.body.alias) {
            res.cc('分类别名被占用！');
        } else {
            db.query(constValue.insertCates, req.body, (err, result) => {
                if (err) {
                    res.cc(err);
                } else if (result.affectedRows === 1) {
                    res.cc('分类添加成功！', 0);
                } else {
                    res.cc('分类添加失败！');
                }
            });
        }
    })
}
const deletecate = (req, res) => {
    console.log(req.params);
    db.query(constValue.deletecate, req.params.id, (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.affectedRows === 1) {
            res.cc('分类删除成功！', 0);
        } else {
            res.cc('分类删除失败！');
        }
    })
}
const cates = (req, res) => {
    console.log(req.params);
    db.query(constValue.cates, req.params.id, (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.length === 1) {
            res.send({
                status: 0,
                data: result,
                message: '分类获取成功！'
            });
        } else {
            res.cc('分类获取失败！');
        }
    })
}
const updatecate = (req, res) => {
    db.query(constValue.selectIdNameOrAlias, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.length === 2 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            res.cc('分类名称与别名被占用！');
        } else if (result.length === 1 && result[0].name === req.body.name) {
            res.cc('分类名称被占用！');
        } else if (result.length === 1 && result[0].alias === req.body.alias) {
            res.cc('分类别名被占用！');
        } else {
            db.query(constValue.updateCates, [req.body, req.body.id], (err, result) => {
                if (err) {
                    res.cc(err);
                } else if (result.affectedRows === 1) {
                    res.cc('分类更新成功！', 0);
                } else {
                    res.cc('分类更新失败！');
                }
            });
        }
    })
}

module.exports = {
    artcate,
    addcates,
    deletecate,
    cates,
    updatecate
};