$(function () {
    var letao = new Letao();
    letao.userCenter();
    letao.logout();
})
var Letao = function () {

}
Letao.prototype = {
    //渲染个人中心页面
    userCenter: function () {
        $.ajax({
            url: '/user/queryUserMessage',
            success: function (data) {
                console.log(data);
                if (data.error) {
                    window.location.href = 'login.html';
                } else {
                    $('.username').html(data.username);
                    $('.mobile').html(data.mobile);;
                }

            }
        })
    },
    logout: function () {
        $('.mui-btn').on('tap', function () {

            $.ajax({
                url: '/user/logout',
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        window.location.href = 'login.html';
                    }
                }
            })
        })
    }
}