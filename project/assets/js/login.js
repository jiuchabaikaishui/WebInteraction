$(function(){
    // 表单验证
    layui.form.verify({
        username: [
            /^[\w]{2,20}$/,
            '用户名必须为2~20位字母和数字！'
        ],
        password: [
            /^[\S]{6,16}$/,
            '密码必须为6~16位非空格字符！'
        ],
        repassword: function(value) {
            if ($('.signin [name=password]').val() !== value) {
                return '两次输入的密码不一致！';
            }
        }
    });

    // 去注册、去登录
    $('.to-signin a').click(function(){
        $('.login').hide();
        $('.signin').show();
    });
    $('.to-login a').click(function(){
        $('.signin').hide();
        $('.login').show();
    });
    
    // 
    let layer = layui.layer;
    // 登录
    $('.login form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault();

        let params = {
            // 属性选择器
            username: $('.login [name=username]').val(),
            password: $('.login [name=password]').val()
        }
        $.post('api/login', params, function(data) {
            // 登录成功
            if (data.status === 0) {
                // 缓存token
                localStorage.setItem('token', data.token);
                // 跳首页
                location.href = 'index.html'
            }
            layer.msg(data.message);
        });
    });
    
    // 注册
    $('.signin form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();
        $('.to-login a').click();

        let params = {
            username: $('.signin [name=username]').val(),
            password: $('.signin [name=password]').val()
        }
        $.post('api/signin',params, function(data) {
            // 注册成功
            if (data.status === 0) {
                layer.msg('注册成功，请登录！');
                // 切换到登录
                $('.to-login a').click();
                // 填充用户名
                $('.login [name=username]').val(params.username);
                // 获得焦点
                $('.login [name=password]').focus();
            } else {
                layer.msg(data.message);
            }
        });
    });
});