$(function() {
    // 获取分类列表数据
    getListData();
    function getListData() {
        $.get('my/artcate', function(data) {
            if (data.status === 0) {
                let html = template('tmp-table', data.data);
                $('tbody').html(html);
            } else {
                layui.layer.msg(data.message);
            }
        });
    }

    // 添加按钮事件
    let layerIndex = null;
    $('#addCateBtn').click(function(e) {
        layerIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addCateDialog').html()
        }); 
    });

    // 事件委托绑定确认添加表单提交事件
    $('body').on('submit', '#addForm', function(e) {
        e.preventDefault();
        $.post('my/addcates', $(e.target).serialize(), function(data) {
            if (data.status === 0) {
                getListData();
                layui.layer.msg('文章分类添加成功！');
                layui.layer.close(layerIndex);
            } else {
                layui.layer.msg(data.message);
            }
        });
    });
    $('body').on('click', '#reset-btn', function(e) {
        $('#addForm')[0].reset();
    });

    // 事件委托绑定编辑按钮事件
    $('tbody').on('click', '.btn-edit', function(e) {
        let cateid = $(e.target).attr('data-id');
        $.ajax({
            method: 'GET',
            url: 'my/cates/' + cateid,
            success: function(data) {
                if (data.status === 0) {
                    layerIndex = layui.layer.open({
                        type: 1,
                        area: ['500px', '250px'],
                        title: '修改文章分类',
                        content: $('#editCateDialog').html()
                    });
                    layui.form.val('editForm', data.data[0]);
                } else {
                    layui.layer.msg(data.message);
                }
            }
        })
    });
    // 事件委托绑定删除按钮事件
    $('tbody').on('click', '.btn-delete', function(e) {
        layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){
            let cateid = $(e.target).attr('data-id');
            $.ajax({
                method: 'GET',
                url: 'my/deletecate/' + cateid,
                success: function(data) {
                    if (data.status === 0) {
                        layui.layer.msg('文章分类删除成功！');
                        getListData();
                        layer.close(index);
                    } else {
                        layui.layer.msg(data.message);
                    }
                }
            });
        });
    });

    // 事件委托绑定编辑表单提交事件
    $('body').on('submit', '#editForm', function(e) {
        e.preventDefault();
        $.post('my/updatecate', $(e.target).serialize(), function(data) {
            if (data.status === 0) {
                getListData();
                layui.layer.msg('文章分类添加成功！');
                layui.layer.close(layerIndex);
            } else {
                layui.layer.msg(data.message);
            }
        });
    });
});