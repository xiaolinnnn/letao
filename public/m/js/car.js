var letao;
$(function () {
    letao = new Letao();
    letao.queryCart();
    letao.deleteCart();
    letao.editCart();
    letao.selectSize();
    letao.getSum();
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
    },
    editCart: function () {
        $('#main').on('tap', '.btn-edit', function () {
            // 2. 编辑之前准备好尺码和数量的模板结构 获取当前编辑的商品的信息
            var product = {
                id: $(this).parent().data('id'),
                size: $(this).parent().data('size'),
                productSize: $(this).parent().data('product-size'),
                num: $(this).parent().data('num'),
                productNum: $(this).parent().data('product-num')
            }
            var start = product.productSize.split('-')[0] * 1;
            var end = product.productSize.split('-')[1] * 1;
            var arr = [];
            for (var i = start; i <= end; i++) {
                arr.push(i);
            }
            product.productSize = arr;
            //console.log(arr);
            //调模板
            var html = template('editTmp', product);
            html = html.replace(/(\r)?\n/g, "");
            //console.log(html);
            //调用确认框
            mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
                if (e.index == 0) {
                    var nowSize = $('.btn-size.active').data('size');
                    var nowNum = mui('.mui-numbox').numbox().getValue();
                    $.ajax({
                        url: '/cart/updateCart',
                        type: 'POST',
                        data: {
                            'id': product.id,
                            'size': nowSize,
                            'num': nowNum
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                letao.queryCart();
                            }
                        }
                    })
                }
            })
            //6. 渲染完毕后去初始化数字框
            mui('.mui-numbox').numbox();

        })
    },
    selectSize: function () {
        // 1. 给所有的btn-size尺码按钮添加点击事件  
        //因为btn-size这些生成的模板不在main里面在body里面要使用body委托
        $('body').on('tap', '.btn-size', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
    getSum: function () {
        getAllSum();
        $('#main').on('change', 'input[type=checkbox]', function () {
            getAllSum();

        })

        function getAllSum() {
            var checked = $('input[type=checkbox]:checked');
            //console.log(checked);
            var sum = 0;
            checked.each(function (i, value) {
                var price = $(value).data('price');
                var num = $(value).data('num');
                //计算当前商品的价格
                var productSum = price * num;
                //把价格累加到总价格
                sum += productSum;
            })
            sum = sum.toFixed(2);
            $('.sum').html(sum);
        }

    }

}