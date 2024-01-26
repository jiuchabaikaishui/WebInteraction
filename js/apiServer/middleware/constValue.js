// sql 语句
// 查找用户名
const selectUN = `select * from users where username = ?`;
// 插入用户
const insertUser = `insert into users set ?`;
// 查找用户信息
const selectInfo = `select id, username, nickname, email, user_pic from users where id = ?`;
// 更新用户信息
const updateInfo = `update users set ? where id = ?`;
// 修改密码
const updatePassword = `update users set password = ? where id = ?`;
// 修改头像
const updateAvatar = `update users set user_pic = ? where id = ?`;
// 获取文章分类
const selectArticle = `select * from article_cate where is_delete = 0 order by id asc`;
// 查询分类名称或别名
const selectNameOrAlias = `select * from article_cate where name = ? or alias = ?`;
// 插入分类
const insertCates = `insert into article_cate set ?`;
// 删除分类
const deletecate = `update article_cate set is_delete = 1 where id = ?`;
// 查找分类
const cates = `select * from article_cate where id = ?`;
// 查询分类id、名称或别名 <>不等于
const selectIdNameOrAlias = `select * from article_cate where id <> ? and (name = ? or alias = ?)`;
// 更新分类
const updateCates = `update article_cate set ? where id = ?`;
// 插入文章
const insertArticle = `insert into articles set ?`;
// 删除文章
const deleteArticle = `delete from articles where id = ?`;
// 更新文章
const updateArticle = `update articles set ? where id = ?`;

// JWT 秘钥
const jwtSecretKey = 'JWTSecretKeyabcABC123!@#JWTSecretKey';
// JWT 加密算法
const jwtAlgorithms = 'HS256';
// JWT 无需权限的接口 表达式
const jwtUnlessPath = /^\/api\//;

module.exports = {
    selectUN,
    insertUser,
    selectInfo,
    updateInfo,
    updatePassword,
    updateAvatar,
    selectArticle,
    selectNameOrAlias,
    insertCates,
    deletecate,
    cates,
    selectIdNameOrAlias,
    updateCates,
    insertArticle,
    jwtSecretKey,
    jwtAlgorithms,
    jwtUnlessPath,
    deleteArticle,
    updateArticle
}