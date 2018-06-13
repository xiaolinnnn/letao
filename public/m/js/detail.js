var letao;
$(function () {
    letao = new Letao();
    letao.selectSize();
    letao.addCart();
    //1. 获取url 传递的productid的值
    var productid = getQueryString('productid');
    //2. 调用获取数据函数传入当前的productid
    letao.getProductDetail(productid);
});

//Letao的构造函数
var Letao = function () {

}

Letao.prototype = {
    //初始化轮播图
    initSlide: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000
        });
    },
    //选择尺码切换选中状态
    selectSize: function () {
        // 1. 给所有的btn-size尺码按钮添加点击事件
        $('#product').on('tap', '.btn-size', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
    //根据url参数获取商品列表的数据并渲染
    getProductDetail: function (id) {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data);
                var start = data.size.split('-')[0] * 1;
                var end = data.size.split('-')[1] * 1;
                //会变成40 50
                //然后创建数组循环
                var arr = [];
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                //把数组重新赋值给数据的data.size数据
                data.size = arr;
                var html = template('productDetailTmp', data);
                $('#product').html(html);
                //重新初始化
                mui('.mui-numbox').numbox();
                //  渲染轮播图
                var slideHtml = template('productSlideTmp', data);
                // console.log(slideHtml);
                $('.mui-slider').html(slideHtml);
                letao.initSlide();
            }
        })
    },
    //添加到购物车
    addCart: function () {
        //给购物车添加点击事件
        $('.btn-add-cart').on('tap', function () {
            //里面的值
            var size = $('.btn-size.active').html();
            if (!size) {
                mui.toast('请输入尺码', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            if (!num) {
                mui.toast('请输入数量', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            mui.confirm('是否进入购物车', '添加成功', ['是', '否'], function (e) {
                if (e.index == 0) {
                    console.log('正在进入购物车');
                }


            })

        })
    }

}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}