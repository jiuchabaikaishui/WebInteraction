$(function() {
    // 时间格式化
    template.defaults.imports.dateformatter = function(date) {
        let dt = new Date(date);
        let year = dt.getFullYear();
        let month = zeroTwo(dt.getMonth());
        let day = zeroTwo(dt.getDay());
        let hour = zeroTwo(dt.getHours());
        let minutes = zeroTwo(dt.getMinutes());
        let seconds = zeroTwo(dt.getSeconds());

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
    // 补零函数
    function zeroTwo(value) {
        return value > 9 ? value : '0' + value
    }

    // 获取列表数据参数
    let params = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };

    // 获取列表数据
    getListData();
    let dataList = null;
    function getListData() {
        $.ajax({
            method: 'GET',
            url: 'my/articles',
            data: params,
            success: function(data) {
                if (data.status === 0) {
                    dataList = data.data.data;
                    let html = template('tmp-table', dataList);
                    $('tbody').html(html);
                    renderPage(data.data.total);
                } else {
                    layui.layer.msg(data.message);
                }
            }
        });
    }

    // 获取分类列表数据
    getCateListData();
    function getCateListData() {
        $.get('my/artcate', function(data) {
            if (data.status === 0) {
                let html = template('tmp-cate-list', data.data);
                $('[name=cate_id]').html(html);
                // 通过 layui 重新渲染表单区域的UI结构
                layui.form.render();
            } else {
                layui.layer.msg(data.message);
            }
        });
    }

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        params.cate_id = $('[name=cate_id]').val();
        params.state = $('[name=state]').val();
        params.pagenum = 1;
        getListData();
    });

    function renderPage(total) {
        //执行一个laypage实例
        layui.laypage.render({
            elem: 'articlePage' //注意，这是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,curr: params.pagenum // 起始页
            ,limit: params.pagesize // 每页显示的条数
            ,limits: [2, 3, 4, 5] // 每页条数的选择项
            ,layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , jump: function(obj, first) { // 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                if (!first) {
                    params.pagenum = obj.curr;
                    params.pagesize = obj.limit;
                    getListData();
                }
            }
        });
    }

    // 事件委托绑定删除按钮事件
    $('tbody').on('click', '.btn-delete', function(e) {
        layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){
            let articleid = $(e.target).attr('data-id');
            $.ajax({
                method: 'GET',
                url: 'my/deletearticle/' + articleid,
                success: function(data) {
                    if (data.status === 0) {
                        layui.layer.msg('文章删除成功！');
                        let i = $(e.target).attr('data-index');
                        console.log('index: ', i);
                        if (i === '0' && params.pagenum > 1) {
                            params.pagenum = params.pagenum - 1;
                        }
                        console.log('params: ', params);
                        getListData();
                        layer.close(index);
                    } else {
                        layui.layer.msg(data.message);
                    }
                }
            });
        });
    });

    $('tbody').on('click', '.btn-edit', function(e) {
        let index = $(this).attr('data-index');
        let data = dataList[index];
        window.parent.editArticle = data;
        location.href = '/project/article/publish.html';
    });
});