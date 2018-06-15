var letao;
$(function () {
    letao = new Letao();
    letao.getCategoryFirst();
    letao.addCategoryFirst();
    letao.getPage();
});

var Letao = function () {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    //查询一级分类并渲染
    getCategoryFirst:function(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                'page':page,
                'pageSize':pageSize
            },
            success:function(data){
               //所有数据总条数
               data.pageTotal = data.rows.length;
               var arr = [];
               for(var i=1;i<=Math.ceil(data.total / data.size);i++){
                   arr.push(i);
               }
               //pageCount是总页码数 = 总条数 /每页数据
               data.pageCount = arr;
               //console.log(data);
               var html1 = template('pagingTmp',data);
               $('.paging').html(html1);
                var html = template('categoryFirstTmp',data);
                $('tbody').html(html);
            }
        })
    },
    //添加分类的函数
    addCategoryFirst:function(){
        $('.btn-add').on('click',function(){
            
            var categoryName = $('.input-category').val();
            $.ajax({
                url:'/category/addTopCategory',
                type:'post',
                data:{
                    'categoryName':categoryName
                },
                success:function(data){
                    console.log(data);
                    if(data.success){
                        letao.getCategoryFirst();
                    }
                }
            })
            
        })
    },
    //实现分页功能
   getPage:function(){
    $('#main').on('click','.pagination a',function () {
        //获取当前要跳转到的页码数
       page = $(this).data('page');
       //调用查询方法
      letao.getCategoryFirst();
  })
   },
}