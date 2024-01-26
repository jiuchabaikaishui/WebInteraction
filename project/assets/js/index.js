let layer = layui.layer;

$(function(){
    // 用户信息
    getUserinfo();

    // 退出
    $('#logout').click(function() {
        console.log('logout');
        layer.confirm('是否退出？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            console.log(index);

            // 清除 token
            localStorage.removeItem('token');

            // 进入登录页
            location.href = 'login.html';

            // 关闭 询问框
            layer.close(index);
        });
    });
    
    $('#publish').click(function() {
        editArticle = null;
    });
});

// 请求用户信息数据
function getUserinfo() {
    $.get('my/userinfo', function(data) {
        if (data.status === 0) {
            renderAvatar(data.data);
        } else {
            layer.msg(data.message);
        }
    })
}

// 用户信息数据
var userinfo = null;

// 渲染头像
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染大写首字母
        $('.text-avatar').html(name[0].toUpperCase()).show();
        $('.layui-nav-img').hide();
    }

    // 渲染完成后，保存数据
    userinfo = user;
}

// 编辑的文章数据
var editArticle = null;