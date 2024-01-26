// 在每个请求之前被发送和$.ajax()处理它们前处理，设置自定义Ajax选项或修改现有选项。
let host = 'http://127.0.0.1/';
$.ajaxPrefilter(function(options) {
    console.log('---ajaxPrefilter----');
    
    // 统一设置请求头
    if (options.url.indexOf('my/') === 0) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = host + options.url;
    console.log('url: ', options.url);
    console.log('type: ', options.type);
    console.log('headers: ', options.headers);
    console.log('params: ', options.data);

    // 统一挂载 complete 回调 
    options.complete = function(res) {
        console.log('complete: ', res.responseJSON);
        // 处理身份验证失败
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！') {
            // 清除 token 跳到登录页面
            localStorage.removeItem('token');
            location.href = 'project/login.html';
        }
    }
});