var letao;
$(function () {
    letao = new Letao();
    letao.queryUser();
    letao.getPage();
    letao.userOption();
});

var Letao = function () {

}
var page = 1;
var pageSize = 3;
Letao.prototype = {
   queryUser:function(){
        //调用接口
        $.ajax({
            url:'/user/queryUser',
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
                var html = template('userTmp',data);
                $('tbody').html(html);
                var html1 = template('pagingTmp',data);
                 $('.paging').html(html1);
            }
        })
   },
   //实现分页功能
   getPage:function(){
    $('#main').on('click','.pagination a',function () {
        //获取当前要跳转到的页码数
       page = $(this).data('page');
       //调用查询方法
      letao.queryUser();
  })
   },
   //用户启用和禁用操作
   userOption:function(){
    $('#main').on('click', '.btn-option', function() {
        //2.获取当前要修改的用户的isDelete值 和id
        var id = $(this).parent().parent().data('id');
        var isDelete = $(this).data('isdelete');
        //3. 判断当前isDelete 如果为0禁用 改成1启用 如果为1启用 改成0禁用
        console.log(isDelete);
        
        if (isDelete == 0) {
            isDelete = 1;
        } else {
            isDelete = 0;
        }
        // 4. 调用更新用户的API更新用户的状态
        $.ajax({
            url: '/user/updateUser',
            data: { 'id': id, 'isDelete': isDelete },
            type: 'post',
            success: function(data) {
                if(data.success){
                    //更新生成就刷新列表
                     letao.queryUser();
                }else{
                    //如果失败表示未登录就去登录
                    window.location.href = 'login.html';
                }
            }
        });
    });
   },

}