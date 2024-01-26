const { number } = require('joi');
const db = require('../db/index');
const constValue = require('../middleware/constValue');
// 查询文章
const articles = (req, res) => {
    console.log('query: ', req.query);
    // 跳过的条数
    let num = (req.query.pagenum - 1)*req.query.pagesize;
    
    // 查询文章的sql
    let sql;
    // 查询文章数量的sql
    let numSql;

    // 文章查询是根据参数按条件查询
    if (typeof req.query.cate_id === 'number' && typeof req.query.state === 'string' && req.query.state.length > 0) {
        sql = `select  articles.*, article_cate.name cate_name, article_cate.alias cate_alias, article_cate.is_delete cate_is_delete from articles, article_cate where cate_id = ? and state = ? and articles.cate_id = article_cate.id order by pub_date desc limit ${num}, ${req.query.pagesize}`;
        numSql = `select count (*) total from articles, article_cate where cate_id = ? and state = ? and articles.cate_id = article_cate.id`
    } else if (typeof req.query.cate_id === 'number') {
        sql = `select  articles.*, article_cate.name cate_name, article_cate.alias cate_alias, article_cate.is_delete cate_is_delete from articles, article_cate where cate_id = ? and articles.cate_id = article_cate.id order by pub_date desc limit ${num}, ${req.query.pagesize}`;
        numSql = `select count (*) total from articles, article_cate where cate_id = ? and articles.cate_id = article_cate.id`
    } else if (typeof req.query.state === 'string' && req.query.state.length > 0) {
        sql = `select articles.*, article_cate.name cate_name, article_cate.alias cate_alias, article_cate.is_delete cate_is_delete from articles, article_cate where state = ? and articles.cate_id = article_cate.id order by pub_date desc limit ${num}, ${req.query.pagesize}`;
        numSql = `select count (*) total from articles, article_cate where state = ? and articles.cate_id = article_cate.id`
    } else {
        sql = `select articles.*, article_cate.name cate_name, article_cate.alias cate_alias, article_cate.is_delete cate_is_delete from articles, article_cate where articles.cate_id = article_cate.id order by pub_date desc limit ${num}, ${req.query.pagesize}`;
        numSql = `select count (*) total from articles, article_cate where articles.cate_id = article_cate.id`
    }
    console.log('sql: ', sql);
    console.log('numSql: ', numSql);

    let params = new Array();
    console.log('init params: ', params);
    if (typeof req.query.cate_id === 'number') {
        params.push(req.query.cate_id);
    }
    if (typeof req.query.state === 'string' && req.query.state.length > 0) {
        params.push(req.query.state);
    }
    console.log('param: ', params);

    // 查询文章
    db.query(sql, params, (err, result) => {
        if (err) {
            res.cc(err);
        } else {
            console.log('result: ', result);
            // 查询文章数量
            db.query(numSql, params, (e, r) => {
                if (err) {
                    res.cc(err);
                } else {
                    console.log('total result: ', r[0].total);
                    let data = {
                        data: result,
                        total: r[0].total
                    }
                    res.send({
                        status: 0,
                        data: data,
                        message: '文章列表获取成功！'
                    });
                }
            });
        }
    });
}

// 发布文章
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

// 删除文章
const deleteArticle = (req, res) => {
    db.query(constValue.deleteArticle, req.params.id, (err, result) => {
        if (err) {
            res.cc(err);
        } else if (result.affectedRows === 1) {
            res.cc('文章删除成功！', 0);
        } else {
            res.cc('文章删除失败！');
        }
    })
}

// 更新文章
const updateArticle = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (req.file && req.file.fieldname === 'cover_img') {
        const article = {
            ...req.body,
            cover_img: `/uploads/${req.file.filename}`,
            pub_date: new Date(),
            author_id: req.auth.id
        };
        console.log('article: ', article);
        db.query(constValue.updateArticle, [article, article.id], (err, result) => {
            if (err) {
                res.cc(err);
            } else if (result.affectedRows === 1) {
                res.cc('文章更新成功！', 0);
            } else {
                res.cc('文章更新失败！');
            }
        });
    } else {
        res.cc('cover_img 是必选参数！');
    }
}

module.exports = {
    articles,
    addArticle,
    deleteArticle,
    updateArticle
}