var letao;
$(function () {
    letao = new Letao();
    letao.getCategorySecond();
    letao.getCategoryFirst();
    letao.addBrand();
    letao.getPage();
    letao.image();
});

var Letao = function () {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    getCategorySecond: function () {
        //查询二级分类数据
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                'page': page,
                'pageSize': pageSize
            },
            success: function (data) {
                //所有数据总条数
                data.pageTotal = data.rows.length;
                var arr = [];
                for (var i = 1; i <= Math.ceil(data.total / data.size); i++) {
                    arr.push(i);
                }
                //pageCount是总页码数 = 总条数 /每页数据
                data.pageCount = arr;
                //console.log(data);
                var html1 = template('pagingTmp', data);
                $('.paging').html(html1);
                //console.log(data);
                var html = template('categorySecondTmp', data);
                $('tbody').html(html);
            }
        })
    },
    // 获取一级分类的分类数据 绑定到模态框的选择分类里面
    getCategoryFirst: function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: 100
            },
            success: function (data) {
                console.log(data);
                var html = template('selectCategoryTmp', data);
                $('.select-category-box').html(html);


            }
        })
    },
    //添加品牌
    addBrand: function () {
        $('.btn-add').on('click', function () {
            //获取品牌名称
            var brandName = $('.input-brandName').val();
            //获取分类id
            var categoryId = $('.select-category').val();
            //获取图片地址
            var arr = $('.brand-logo').val().split('\\');
            //获取品牌logo
            var brandLogo = '/mobile/images/' + arr[arr.length - 1];
            $.ajax({
                url: '/category/addSecondCategory',
                type: 'post',
                data: {
                    'brandName': brandName,
                    'categoryId': categoryId,
                    'brandLogo': brandLogo,
                    'hot': 1
                },
                success: function (data) {
                    if (data.success) {
                        letao.getCategorySecond();
                    }
                }
            })






        })
    },
    //分页跳转的函数
    getPage: function () {
        //给所有上一页 第几页 下一页按钮添加点击事件
        $('#main').on('click', '.pagination a', function () {
            //获取当前要跳转到的页码数
            page = $(this).data('page');
            //调用查询方法
            letao.getCategorySecond();
        })
    },
    //图片预览
    image: function () {
        $('.brand-logo').change(function () {
            var url = URL.createObjectURL(this.files[0]);
            $('.brand-logo-img').attr('src', url).show();

        })
    }
}