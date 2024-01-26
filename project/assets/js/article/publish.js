$(function() {
    // 获取分类列表数据
    getCateListData();
    function getCateListData() {
        $.get('my/artcate', function(data) {
            if (data.status === 0) {
                let html = template('tmp-cate-list', data.data);
                $('[name=cate_id]').html(html);
                layui.form.render();

                // 填充初始数据
                // 通过 window.parent 调用父框架 属性、方法 必须在http协议中打开
                let article = window.parent.editArticle;
                if (article !== null) {
                    layui.form.val('publish', window.parent.editArticle);
                }
            } else {
                layui.layer.msg(data.message);
            }
        });
    }

    // 初始化富文本编辑器
    initEditor()
    
    // 获取裁剪区域的 DOM 元素 
    var $image = $('#image');
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 400/280,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 创建裁剪区域 
    let path = null;
    if (window.parent.editArticle === null) {
        path = '../assets/images/sample2.jpg';
    } else {
        path = 'http://localhost' + window.parent.editArticle.cover_img;
    }
    $image.attr('src', path).cropper(options);

    // 选择图片
    $('#chooseImage').click(function(e) {
        $('#coverFile').click();
    });

    // 读取图片
    $('#coverFile').change(function(e) {
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
        }
    });

    let state = '已发布';
    $('#btnSave2').on('click', function() {
        state = '草稿';
    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        let fm = new FormData(this);
        fm.append('state', state);
        if (window.parent.editArticle !== null) {
            fm.append('id', window.parent.editArticle.id);
        }
        // 遍历 FormData
        fm.forEach((v, k) => {
            console.log(k, '-', v);
        });

        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            fm.append('cover_img', blob);
            $.ajax({
                method: 'POST',
                url: window.parent.editArticle === null ? 'my/addArticle' : 'my/updateArticle',
                data: fm,
                // 注意：如果向服务器提交的是 FormData 格式的数据，必须添加以下两个配置项
                // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值 
                contentType: false,
                // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器 
                processData: false,
                success: function(data) {
                    if (data.status === 0) {
                        layui.layer.msg('文章发表成功！');
                        // 发布文章成功后，跳转到文章列表页面
                        location.href = '/project/article/list.html';
                    } else {
                        layui.layer.msg(data.message);
                    }
                }
            });
        });
    });
});