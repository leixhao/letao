// 该文件的功能是用来写首页的js交互的

// 1、点击data-menu那个a标签 实现侧边栏的显示与隐藏;
// data-menu、data-logout在ajax中会用到
$("[data-menu]").on("click",function(){
    $(".lt-aside").toggle();
    $(".lt-section").toggleClass("show");
});

// 2、进度条 全局监听、发起ajax请求进度条开始，当ajax请求结束进度条加载结束；
$(window).ajaxStart(function(){
    NProgress.start()
});
// 当ajax请求完成，进度条加载结束
$(window).ajaxComplete(function(){
    NProgress.done()
});

// 3、点击分类管理 滑出 菜单
$(".lt-aside .menu").on("click",'[href="javascript:;"]',function(){
    var _this = $(this);
    var child = _this.siblings(".child");
    child.slideToggle();
})
// 有一丢丢小bug;但是给siblings一个参数让它选中child就没有问题了；

// 这样可以实现：
    // $(".lt-aside .menu li:nth-child(2)>a").on('click',function(){
    //     $(".lt-aside .menu li:nth-child(2) > .child").slideToggle();
    // })

    // 4、功能：点击退出按钮 弹出遮罩层 发起请求 退出用户登录
    // 4.1点击确定按钮
 $(function(){
    $(".lt-section .modal-footer > .btn-primary").click(function(){
        //4.2发起ajax请求
        $.ajax({
            url:"/employee/employeeLogout",
            type: 'get', 
            data:{},
            dataType:"json",
            success:function(data){
                if(data.success == true){
                    // 如果data.success == true那么让模态框隐藏，然后过500毫秒跳转到登录页
                    $('#logout-modal').modal('hide');
                    setInterval(function(){
                        location.href = './login.html';
                    },500)
                }
            }
        })
        // 4.3成功、隐藏遮罩层  把地址定位到登录页；
    })
 })


