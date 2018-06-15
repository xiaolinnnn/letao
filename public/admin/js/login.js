var letao;
$(function () {
    letao = new Letao();
    letao.login();

});

var Letao = function () {

}

Letao.prototype = {
    login: function () {
        $('.btn-login').on('click', function () {
            //console.log(this);
            var username = $('.username').val();
            if (!username) {
                alert("请输入用户名");
            }
            var password = $('.password').val();
            if (!password) {
                alert("请输入密码");
            }
            //调用后台接口
            $.ajax({
                url:'/employee/employeeLogin',
                type:'post',
                data:{
                    'username':username,
                    'password':password
                },
                success:function(data){
                    console.log(data);
                    if(data.error==1000){
                        alert('用户名不存在');
                    }else if(data.error==1001){
                        alert('密码错误');
                    }else{
                        window.location.href = 'index.html';
                    }
                }   
            })

        })
    }

}