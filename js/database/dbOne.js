// 配置 mysql 模块
const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
});

// 插入数据
db.query('insert into users (username, password) values (?, ?)', ['王五', 'ww'], function(error, result) {
    if (error) return console.log(error.message);

    if (result.affectedRows == 1) console.log('插入数据成功');
});

// 便捷方式插入数据
db.query('insert into users set ?', {username: '赵六', password: 'zl'}, function(error, result) {
    if (error) return console.log(error.message);

    if (result.affectedRows == 1) console.log('便捷方式插入数据成功');
});

// 更新数据
db.query('update users set username=?, password=? where id=?', ['李白', 'lb', 1], function(error, result) {
    if (error) return console.log(error.message);

    if (result.affectedRows == 1) console.log('更新数据成功');
});

// 更新数据的便捷方式
const user = { id: 4, username: '王唯', password: 'ww' };
db.query('update users set ? where id=?', [user, user.id], function(error, result) {
    if (error) return console.log(error.message);

    if (result.affectedRows == 1) console.log('便捷方式更新数据成功');
})

// 删除数据
db.query('delete from users where id=?', 3, function(error, result) {
    if (error) return console.log(error.message);

    if (result.affectedRows == 1) console.log('删除数据成功');
});

// 标记删除
db.query('update users set status=? where id=?', [1, 5], function(error, result) {
    if (error) console.log(error.message);

    if (result) console.log('标记删除数据成功');
});

// 查询所有数据
db.query('select * from users', (error, result)=> {
    if (error) return console.log(error.message);

    console.log(result);
});