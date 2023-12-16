const db = require('../db/index');
const constValue = require('../middleware/constValue');
const addArticle = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (req.file && req.file.fieldname === 'cover_img') {
        const article = {
            ...req.body,
            cover_img: `/uploads/${req.file.filename}`,
            pub_date: new Date(),
            author_id: req.auth.id
        };
        db.query(constValue.insertArticle, article, (err, result) => {
            if (err) {
                res.cc(err);
            } else if (result.affectedRows === 1) {
                res.cc('文章添加成功！', 0);
            } else {
                res.cc('文章添加失败！');
            }
        });
    } else {
        res.cc('cover_img 是必选参数！');
    }
}

module.exports = {
    addArticle
}