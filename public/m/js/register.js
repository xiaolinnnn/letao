$(function () {
    var letao = new Letao();
    letao.getVcode();
    letao.register();
})
var Letao = function () {

}
var vCode = '';
Letao.prototype = {
    //获取验证码
    getVcode: function () {
        $('.get-verify').on('tap', function () {
            $.ajax({
                url: '/user/vCode',
                success: function (data) {
                    console.log(data);
                    vCode = data.vCode;
                }
            })

        })
    },
    //注册函数
    register: function () {
        $('.btn-register').on('tap', function () {
            //console.log(this);
            var mobile = $('.mobile').val();
            if (!mobile) {
                mui.toast('请输入手机号', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var username = $('.username').val();
            if (!username) {
                mui.toast('请输入用户名', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();
            if (!password1 || !password2) {
                mui.toast('请输入密码和确认密码', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            if (password1 != password2) {
                mui.toast('两次密码不一致', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            nowVcode = $('.verify').val();
            if (!nowVcode) {
                mui.toast('请输入验证码', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            if (nowVcode != vCode) {
                mui.toast('验证码错误', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            //调用接口
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: vCode
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        mui.toast('注册成功', {
                            duration: 'short',
                            type: 'div'
                        });
                        window.location.href = 'login.html'
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