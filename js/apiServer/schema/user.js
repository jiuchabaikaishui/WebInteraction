// @hapi/joi 包，为表单中携带的每个数据项，定义验证规则
const joi = require('joi');


// * string() 值必须是字符串
// * alphanum() 值只能是包含 a-zA-Z0-9 的字符串 * min(length) 最小长度
// * max(length) 最大长度
// * required() 值是必填项，不能为 undefined
// * pattern(正则表达式) 值必须符合正则表达式的规则
const username = joi.string().alphanum().min(2).max(20).required();
const password = joi.string().required().pattern(/^[\S]{6,16}$/);
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
// 1. joi.ref('oldPassword') 表示 newPassword 的值必须和 oldPassword 的值保持一致
// 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
// 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
const newPassword = joi.not(joi.ref('oldPassword')).concat(password);
// dataUri() 指的是如下格式的字符串数据:
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const user_pic = joi.string().dataUri().required();
const name = joi.string().required();
const alias = joi.string().alphanum().required();
const title = joi.string().required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();
const pagenum = joi.number().required();
const pagesize = joi.number().required();

exports.schema = {
    user: {
        body: {
            username,
            password
        }
    },
    userinfo: {
        body: {
            nickname,
            email
        }
    },
    updatePassword: {
        body: {
            oldPassword: password,
            newPassword
        }
    },
    updateAvatar: {
        body: {
            user_pic
        }
    },
    addcates: {
        body: {
            name,
            alias
        }
    },
    deletecate: {
        params: {
            id
        }
    },
    cates: {
        params: {
            id
        }
    },
    updatecate: {
        body: {
            id,
            name,
            alias
        }
    },
    addArticle: {
        body: {
            title,
            content,
            cate_id: id,
            state
        }
    },
    articles: {
        query: {
            pagenum,
            pagesize,
            cate_id: joi.number().integer().min(1).allow('').optional(),
            state: joi.string().valid('已发布', '草稿').allow('').optional()
        }
    },
    deleteArticle: {
        params: {
            id
        }
    },
    updateArticle: {
        body: {
            id,
            title,
            content,
            cate_id: id,
            state
        }
    }
}
