$(function() {
    // 表单验证
    layui.form.verify({
        password: [
            /^[\S]{6,16}$/,
            '密码必须为6~16位非空格字符！'
        ],
        newPassword: function(value) {
            if ($('[name=oldPassword]').val() === value) {
                return '新旧密码不能相同！'
            }
        },
        repassword: function(value) {
            if ($('[name=password]').val() !== value) {
                return '两次输入的密码不一致！';
            }
        }
    });

    $('.layui-form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();

        $.post('my/updatePassword', {
            oldPassword: $('[name=oldPassword]').val(),
            newPassword: $('[name=password]').val()
        }, function(data) {
            if (data.status === 0) {
                $(this)[0].reset();
                layui.layer.msg('修改密码成功！');
            } else {
                console.log('data: ', data);
                layui.layer.msg(data.message);
            }
        });
    });

    $('#reset-btn').on('click', function() {
        $('.layui-form')[0].reset();
    });
});