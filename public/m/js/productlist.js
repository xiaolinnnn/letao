var letao;
$(function () {
    letao = new Letao();
    // 初始化下拉刷新和上拉加载
    letao.initPullRefresh();
    // 搜索商品
    letao.searchProductList();
    // 商品的排序
    letao.productSort();
    search = getQueryString('search');
    //进入商品列表页面马上执行搜索
    letao.getProdcutList({
        proName: search
    }, function (data) {
        // 4. 把数据调用模板引擎生成html
        var html = template('productListTmp', data);
        // 5. 把生成的模板绑定到商品列表的内容
        $('.content .mui-row').html(html);
    });
});

//Letao的构造函数
var Letao = function () {

}
var search;
var page = 1;
Letao.prototype = {
    //初始化下拉刷新和上拉加载
    initPullRefresh: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    callback: function () {
                        setTimeout(function () {
                            //在下拉刷新里面根据当前搜索的内容再次刷新一下再次根据搜索内容重新请求数据渲染一遍
                            letao.getProdcutList({
                                proName: search
                            }, function (data) { //我把这个渲染完毕后要执行的代码通过回调函数传递
                                //console.log('下拉刷新完毕');
                                // 4. 把数据调用模板引擎生成html
                                var html = template('productListTmp', data);
                                // 5. 把生成的模板绑定到商品列表的内容
                                $('.content .mui-row').html(html);
                                // 当前数据请求渲染完毕后结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                //每次下拉刷新的时候要重置上拉加载更多
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                // page当前页码也要重置为1
                                page = 1;
                            });
                        }, 1500);
                    }
                },
                up: {
                    contentnomore: '再下实在给不了更多...',
                    callback: function () {
                        setTimeout(function () {
                            // 在上拉加载更多的时候调用获取商品列表的方法
                            letao.getProdcutList({
                                proName: search,
                                page: ++page //page是我当前上拉要请求的页码数 每次++注意先++
                            }, function (data) { //我把这个渲染完毕后要执行的代码通过回调函数传递
                                //console.log('上拉加载完毕');
                                // 4. 把数据调用模板引擎生成html
                                var html = template('productListTmp', data);
                                // 5. 把生成的模板绑定到商品列表的内容
                                $('.content .mui-row').append(html);
                                if (data.data.length > 0) {
                                    // 当前数据请求渲染完毕后结束上拉加载
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                } else {
                                    
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            });
                        }, 1500);
                    }
                }
            }
        });
    },
    // 搜索商品列表
    searchProductList: function () {
       
        $('.btn-search').on('tap', function () {
            // 2. 获取当前输入的搜索的内容
            search = $('.input-search').val()
            //console.log(search);
            // 3. 调用获取商品列表的API搜索商品
            letao.getProdcutList({
                proName: search
            }, function (data) {
                // 4. 把数据调用模板引擎生成html
                var html = template('productListTmp', data);
                // 5. 把生成的模板绑定到商品列表的内容
                $('.content .mui-row').html(html);
            });
        })
    },
    //获取商品数据的公共函数
    getProdcutList: function (obj, callback) {
        $.ajax({
            url: '/product/queryProduct',
            //使用当前对象上的参数属性 例如obj.page是当前要请求的页码数
            // obj.pageSize当前请求每页数据量大小
            // obj.proName 当前搜索的商品的关键字
            data: {
                page: obj.page || 1,
                pageSize: obj.pageSize || 2,
                proName: obj.proName,
                price: obj.price,
                num: obj.num
            },
            success: function (data) {
                //console.log(data);
                // 判断回调函数传递了就调用
                if (callback) {
                    //数据确定渲染完毕后我就可以结束下拉刷新    
                    callback(data);
                }
            }
        });
    },
    //商品价格排序
    productSort: function () {
        $('.productlist .title').on('tap', 'a', function () {
            var sortType = $(this).data('sort-type');
            var sort = $(this).data('sort');
           
            
            if (sort == 1) {
                //如果是1 就表示当前是升序 点击了之后变成降序 sort = 2
                sort = 2;
            } else {
                //如果是1 就表示当前是降序 点击了之后变成升序 sort = 1
                sort = 1;
            }
            //重新赋值
            $(this).attr('data-sort', sort);
            if (sortType == 'price') {
                letao.getProdcutList({
                    proName: search,
                    price: sort
                }, function (data) {
                    var html = template('productListTmp', data);
                    // 5. 把生成的模板绑定到商品列表的内容
                    $('.content .mui-row').html(html);
                })
            }else if(sortType == 'num'){
                letao.getProdcutList({
                    proName: search,
                    num: sort
                }, function (data) {
                    var html = template('productListTmp', data);
                    // 5. 把生成的模板绑定到商品列表的内容
                    $('.content .mui-row').html(html);
                })
            }
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