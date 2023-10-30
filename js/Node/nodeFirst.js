console.log('hello world!');


// fs 模块
(function() {
    const fs = require('fs');
    fs.writeFile('text.txt', 'hello world', 'utf-8', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('文件写入成功');
        }
    });
    fs.readFile('text.txt', 'utf-8', function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
})();

// 成绩整理案例
(function() {
    const fs = require('fs');
    // 读取文件
    var score = fs.readFile('./files/score.txt', 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // 处理成绩
            let v = data.split(' ');
            let sv = v.map(function(e) {
                return e.replace('=', ': ');
            });
            let result = sv.join('\n');
            // 写入新文件
            fs.writeFile('./files/score_ok.txt', result, 'utf-8', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('成绩处理完成');
                }
            })
        }
    });

    // 路径动态拼接的问题
    console.log(__dirname);
    let path = __dirname + '/files/score.txt';
    console.log(path);
})();


// path 路径模块
(function() {
    const path = require('path');
    let p = path.join(__dirname, './files/score.txt');
    console.log(p);
    let name = path.basename(p);
    console.log(name); // score.txt
    name = path.basename(p, 'txt');
    console.log(name); // score.
    console.log(path.extname(p)); // .txt
})();


// 拆分 html、CSS、js案例
// 导入 文件、路径 模块
const fs = require('fs');
const path = require('path');

const filePath = '/Users/suzheng/Desktop/index.html';

// 正则匹配 <script></script>
const jsRg = /<script>([\s\S]*)<\/script>/;
const cssRg = /<style>([\s\S]*)<\/style>/;

// 读取文件
fs.readFile(filePath, 'utf-8', function(e, value) {
    if (e) {
        console.log('文件读取失败：' + e.message);
    } else {
        console.log(value);
        resolveJS(value);
        resolveCSS(value);
        resolveHTML(value);
    }
});

// 处理 js 文本
function resolveJS(text) {
    let jsValue = jsRg.exec(text);
    console.log(jsValue);
    if (jsValue) {
        const result = jsValue[1];
        fs.writeFile(path.join(__dirname, './files', path.basename(filePath, 'html')) + 'js', result, function(error) {
            if (error) {
                console.log('js 存储失败：', error.message);
            } else {
                console.log('js 存储成功');
            }
        });
    }
}

// 处理 css 文本
function resolveCSS(text) {
    let cssValue = cssRg.exec(text);
    console.log(cssValue);
    if (cssValue) {
        const result = cssValue[1];
        fs.writeFile(path.join(__dirname, './files', path.basename(filePath, 'html')) + 'css', result, function(error) {
            if (error) {
                console.log('css 存储失败：', error.message);
            } else {
                console.log('css 存储成功');
            }
        });
    }
}

// 处理 html 文本
function resolveHTML(text) {
    const jsPath = path.join(__dirname, './files', path.basename(filePath, 'html')) + 'js';
    const jsSource = '<script src="' + jsPath + '"></script>'
    console.log(jsSource);

    const cssPath = path.join(__dirname, './files', path.basename(filePath, 'html')) + 'css';
    const cssSource = '<link rel="stylesheet" href="' + cssPath + '">'
    console.log(cssSource);

    const result = text.replace(jsRg, jsSource).replace(cssRg, cssSource);
    console.log(result);
    fs.writeFile(path.join(__dirname, './files', path.basename(filePath)), result, 'utf-8', function(error) {
        if (error) {
            console.log('html 存储失败：', error.message);
        } else {
            console.log('html 存储成功');
        }
    })
}


// http 模块
// 创建最基本的 web 服务器
function simpleServerOne() {
    const http = require('http');
    const server = http.createServer();
    server.on('request', function(req, res) {
        const result = `url 地址：${req.url}, 请求类型：${req.method}`;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(result)
    })
    server.listen(80, function() {
        console.log('server running at http://127.0.0.1:80');
    });
}
// simpleServerOne();

// 根据不同的 url 动态响应不同的 html 内容
function simpleServerTwo() {
    const http = require('http');
    const server = http.createServer();
    server.on('request', function(req, res) {
        console.log(req.url);
        let result = '<h1>404 Not found!</h1>'
        if (req.url === '/' || req.url === '/index.html') {
            result = '<h1>首页</h1>'
        } else if (req.url === '/about.html') {
            result = '<h1>关于</h1>'
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    });
    server.listen(80, function() {
        console.log('server running at http://127.0.0.1:80');
    });
}
// simpleServerTwo();

// 简单文件服务器案例
function simpleServerThree() {
    const fs = require('fs');
    const path = require('path');
    const http = require('http');
    const server = http.createServer();
    server.on('request', function(req, res) {
        let result = '<h1>404 您请求的内容不在了!</h1>'
        // 把请求的 URL 地址映射为具体文件的存放路径
        let p = '';
        if (req.url === '/') {
            p = path.join(__dirname, '/files/index.html');
        } else {
            p = path.join(__dirname, '/files', req.url);
        }
        console.log(p);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        // 根据“映射”过来的文件路径读取文件的内容
        fs.readFile(p, 'utf-8', function(error, value) {
            console.log('error: ', error);
            if (error === null) {
                result = value;
            }
            res.end(result);
        });
    });
    server.listen(80, function() {
        console.log('server running at http://127.0.0.1:80');
    });
}
simpleServerThree();