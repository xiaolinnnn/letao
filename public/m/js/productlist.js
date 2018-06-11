$(function () {
    var letao = new Letao();
   letao.initPullRefresh();
  })
  var Letao = function () {
   
  }
  Letao.prototype = {
    //初始化下拉刷新
    initPullRefresh:function(){
        mui.init({
            pullRefresh : {
              container:".mui-scroll-wrapper",
             down:{
                callback:function(){
                    setTimeout(function() {
                        // 延迟1.5秒结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }, 1500)
                }
             },
             up:{
                callback:function(){
                    setTimeout(function() {
                        // 延迟1.5秒结束上拉加载更多
                        // mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                        // 调用结束上拉加载更多并且传入了true既结束上拉加载更多并且提示没有更多数据
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                    }, 1500)
                }
             }
            }
          });
}
}