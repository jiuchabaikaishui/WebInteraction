console.log('加载了custom模块');

var name = 'zs';

module.exports.name = name;
console.log(exports);
exports.age = 10;
console.log(module.exports);
console.log(exports === module.exports);

const toolOne = require('./toolOne.js')
module.exports = {
    nm: name,
    sayHello() {
        console.log('hello every one!');
    },
    ...toolOne
}
console.log(exports);
console.log(module.exports);