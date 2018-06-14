$(function () {
    var letao = new Letao();
    letao.login();
})
var Letao = function () {

}
Letao.prototype = {
    login: function () {
        $('.btn-login').on('tap', function () {
            //获取用户名和密码
            var username = $('.username').val();
            var password = $('.password').val();
            if (!username) {
                mui.toast('请输入用户名', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            if (!password) {
                mui.toast('请输入密码', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            //调用登录API
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function (data) {
                    if (data.success) {
                        window.location.href = 'user.html';

                    } else {

                        mui.toast(data.message, {
                            duration: 'short',
                            type: 'div'
                        });
                    }

                }
            })
        })
    }
}