$(function() {
    // 获取裁剪区域的 DOM 元素 
    var $image = $('#image');
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 创建裁剪区域 
    $image.attr('src', window.parent.userinfo.user_pic).cropper(options);

    // 选择图片
    $('#chooseImage').click(function(e) {
        $('#file').click();
    });

    // 读取图片
    $('#file').change(function(e) {
        console.log('xxxx');
        let filelist = e.target.files
        console.log('filelist: ', filelist);
        if (filelist.length === 0) {
            layui.layer.msg('请选择图片！');
        } else {
            let file = filelist[0];
            console.log('file: ', file);

            let url = URL.createObjectURL(file);
            console.log('url: ', url);

            $image.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', url) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域

            // 或者使用 FileReader 读取图片
            // let reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = function() {
            //     console.log('result: ', reader.result);

            //     $image.cropper('destroy') // 销毁旧的裁剪区域
            //     .attr('src', reader.result) // 重新设置图片路径
            //     .cropper(options); // 重新初始化裁剪区域
            // };
        }
    });

    // 上传图片
    $('#upload').click(function() {
        // 拿到用户裁剪之后的头像 
        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.post('my/updateAvatar', {
            user_pic: dataURL
        }, function(data) {
            if (data.status === 0) {
                let userinfo = window.parent.userinfo;
                userinfo.user_pic = dataURL;
                window.parent.renderAvatar(userinfo);
                layui.layer.msg('修改头像成功！');
            } else {
                layui.layer.msg(data.message);
            }
        });
    });
});