setHtmlSize();

function setHtmlSize() {
    fun();
    window.addEventListener('resize', function() {
        fun();
    })

    function fun() {
        // 1. 获取屏幕的宽度 window窗口的宽度
        var windowWidth = window.innerWidth;
        if(windowWidth<=750){
            //console.log(windowWidth);
            var fontSize = windowWidth / 10;
            //console.log(fontSize);
            // 把fontSize设置给html
            document.querySelector('html').style.fontSize = fontSize + 'px';
        }else{
             document.querySelector('html').style.fontSize =  '75px';
        }
        
    }
}
