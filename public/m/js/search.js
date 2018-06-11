// 后面要用到一些函数,可以先声明
var letao;
$(function () {
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})
var Letao = function () {

}
Letao.prototype = {
 // 添加历史记录
 addHistory: function () {
    $('.btn-search').click(function () {
        // 获取输入的内容
        var search = $('.search').val();
        //如果没有值,提示用户
        if (search.trim() == '') {
            alert("请输入要搜索的商品");
            return;
        }


        //获取本地已存储的值
        var arr = window.localStorage.getItem('searchData');
        //console.log(arr);
        //判断是否有值
        var id = 0;
        if (arr && JSON.parse(arr).length > 0) {
            //如果有,就转成json数组
            arr = JSON.parse(arr);
            //console.log(arr);
            //id为arr数组最后一个值的id+1
            id = arr[arr.length - 1].id + 1;
        } else {
            // 没有就赋值空数组
            arr = [];
            id = 0;
        }
        //定义一个值,判断是否重复
        var flag = false;
        for(var i = 0; i < arr.length; i++){
            if(arr[i].search==search){
                flag = true;
            }
        }
        if (flag == false) {
            arr.push({
                'search': search,
                'id': id
            })
        }
        // 把数组转成字符串
        window.localStorage.setItem('searchData', JSON.stringify(arr));
        //再次查询
        letao.queryHistory();
    })
},
// 查询历史记录
queryHistory: function () {
    //获取本地存储
    var arr = window.localStorage.getItem('searchData');
    if (arr && JSON.parse(arr).length > 0) {
        arr = JSON.parse(arr);
    } else {
        arr = [];
    }
    var html = template('searchListTmp', {
        'rows': arr
    });
    $('.content ul').html(html);
},
//删除历史记录
deleteHistory: function () {
    $('.content ul').on('click', '.btn-delete', function () {
        //获取id
        var id = $(this).data('id');
        console.log(id);
        
        //获取本地存储
        var arr = window.localStorage.getItem('searchData');
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
            //判断要没id跟当前要删除的id一致的
            if (arr[i].id == id) {
                arr.splice(i, 1); //第一个i表示要删除的数据的下标,第二个表示要删除几个
            }
        }
        //删除后的数组重新存在本地
        window.localStorage.setItem('searchData', JSON.stringify(arr));

        //重新加载
        letao.queryHistory();
    })
},
//清空历史记录
clearHistory: function () {
    $('.btn-clear').click(function () {
        // 2. 把本地存储的值设置为空字符串
        window.localStorage.setItem('searchData', '');
        letao.queryHistory();


    })

}
}