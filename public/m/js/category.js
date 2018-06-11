$(function () {
	var letao = new Letao();
	// 通过乐淘对象初始化区域滚动
	letao.initScroll();
	letao.getCategoryLeft();
	letao.getCategoryRight();
});

//Letao的构造函数
var Letao = function () {

}

Letao.prototype = {
	//初始化区域滚动
	initScroll: function () {
		//初始化区域滚动
		var options = {
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			startX: 0, //初始化时滚动至x
			startY: 0, //初始化时滚动至y
			indicators: false, //是否显示滚动条
			deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
			bounce: true //是否启用回弹
		};
		// 初始化区域滚动
		mui('.mui-scroll-wrapper').scroll(options);
	},
	getCategoryLeft: function () {
		$.ajax({
			url: '/category/queryTopCategory',
			success: function (backData) {
				// console.log(backData);
				var result = template('leftTem', backData);
				$('.left ul').html(result);
			}
		})
	},
	getCategoryRight: function () {
		$('.left ul').on('click', 'a', function (e) {
			
			//console.log(e.target);

			$(e.target.parentNode).addClass('active').siblings().removeClass('active');
			// var current = $(e.target);
			// var id = current.data('id');

			var id = $(this).attr('data-id');
			getData();
			// 封装函数

			function getData() {
				$.ajax({
					url: '/category/querySecondCategory',
					data: {
						id: id
					},
					success: function (backData) {
						// console.log(backData);
						var result = template('rightTem', backData);
						if (result) {
							$('.right .mui-row').html(result);
						} else {
							$('.right .mui-row').html('<h6>再下实在给不更多了</h6>');
						}

					}
				});
			}
		})
	}
}