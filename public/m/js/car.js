var letao;
$(function () {
    letao = new Letao();
    letao.queryCart();
    letao.deleteCart();
})
var Letao = function () {

}
Letao.prototype = {
    //查询购物车
    queryCart: function () {
        $.ajax({
            url: '/cart/queryCart',
            success: function (data) {
                console.log(data);
                if (data.error) {
                    window.location.href = 'login.html';
                } else {
                    var html = template('cartTmp', {
                        'rows': data
                    });
                    $('#main .mui-table-view').html(html);
                }
            }
        })
    },
    //删除购物车商品的函数
    deleteCart: function () {
        $('.mui-table-view').on('tap', '.btn-delete', function () {
            var id = $(this).parent().data('id');
            //console.log(id);
            mui.confirm('是否确定要删除?', '商品编辑', ['确定', '取消'], function (e) {
                if (e.index == 0) {
                    $.ajax({
                        url: '/cart/deleteCart',
                        data: {
                            'id': id
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                letao.queryCart();
                            }
                        }
                    })
                } else if (e.index == 1) {
                    letao.queryCart();
                }
            })

        })
    }
}