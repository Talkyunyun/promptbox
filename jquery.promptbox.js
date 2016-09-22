(function($) {
    //名字定义
    $.fn.promptBox = function(options) {
        // debug(this);
        //判断用户是否有传入自定义参数
        var opts = $.extend({}, $.fn.promptBox.defaults, options);
        //获取弹窗盒子长度
        var status = $('section.popShowBoxMain').length;
        if(status==0){//没有弹窗盒子
            $('body').append("<section class='popShowBoxMain'><div class='popShowBoxCenter inPopBox'>");
            //创建状态图标
            $('div.popShowBoxCenter').append("<div class='lineJoin topJoinLeft'></div><div class='lineJoin topJoinRight'></div><div class='imgStatus "+opts.type+"'><span class='oneLine'></span><span class='twoLine'></span></div>");
            //创建提示语
            $('div.imgStatus').after("<div class='contentPopBox'><h6>"+opts.context+"</h6></div>");

            //隐藏提示盒子
            $('section.popShowBoxMain').show();
            var t1 = setTimeout(function(){
                $('div.popShowBoxCenter').removeClass('inPopBox').addClass('outPopBox');
                var t2 = setTimeout(function(){
                    $('section.popShowBoxMain').hide();
                    clearTimeout(t1);
                    clearTimeout(t2);
                },300)
            },opts.time)
        }else{//已经有弹窗盒子了
            promptBoxExist(opts);
        }
    };
    function promptBoxExist(opts){
        var isShow = $('section.popShowBoxMain').css('display');
        $('div.contentPopBox>h6').html(opts.context);
        if(isShow=='none'){
            $('div.popShowBoxCenter').removeClass('outPopBox').addClass('inPopBox');
            $('section.popShowBoxMain').show();
            var t1 = setTimeout(function(){
                $('div.popShowBoxCenter').removeClass('inPopBox').addClass('outPopBox');
                var t2 = setTimeout(function(){
                    $('section.popShowBoxMain').hide();
                    clearTimeout(t1);
                    clearTimeout(t2);
                },300)
            },opts.time)
        }else{
            $('section.popShowBoxMain').hide();
        }
    }
    //私有方法，开发阶段使用
    function debug(obj) {
        if (window.console && window.console.log)
        window.console.log('选中对象个数:' + obj.size());
    };
    //定义一个暴露的函数
    $.fn.promptBox.format = function(txt) {
        return '<strong>' + txt + '</strong>';
    };
    //默认选项值
    $.fn.promptBox.defaults = {
        type   : 'success',
        context: '操作成功',
        time: 1000
    };
})(jQuery);