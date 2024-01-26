$(function() {
    let form = layui.form;
    var layer = layui.layer;

    // 填充初始数据
    // 通过 window.parent 调用父框架 属性、方法 必须在http协议中打开
    form.val('userinfo', window.parent.userinfo);

    // 校验表单
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    // 重置对表单的修改
    $('#reset-btn').click(function(e) {
        // 阻止默认行为
        e.preventDefault();

        // 用原始数据重新填充表单
        form.val('userinfo', window.parent.userinfo);
    });

    // 提交数据
    $('.layui-form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();

        let params = $(this).serialize();
        $.post('my/userinfo', params, function(data) {
            if (data['status'] === 0) {
                // 调用父框架的方法重新获取数据（缺点就是需要重新请求网络）
                // window.parent.getUserinfo();

                // 通过修改父框架的数据重新渲染（不需要请求网络，但是需要拼接数据）
                let userinfo = window.parent.userinfo
                // 属性选择器
                userinfo.nickname = $('.layui-form [name=nickname]').val();
                userinfo.email = $('.layui-form [name=email]').val();
                console.log('userinfo: ', userinfo);
                window.parent.renderAvatar(userinfo);
            } else {
                layer.msg(data['message']);
            }
        });
    });
});