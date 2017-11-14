// 该文件的功能是用来写首页的js交互的


//1.进度条
//不要让进度条显示圆圈
NProgress.configure({ showSpinner: false});


//ajax全局事件
// $().ajaxStart()  代表ajax调用开始
// $().ajaxComplete()  代表ajax调用完成

//全局监听  当页面中某一个ajax请求发起的时候   让进度条开始
$(window).ajaxStart(function(){
  NProgress.start();
})

//全局解析 当ajax请求完成的时候，让进度条完成
$(window).ajaxComplete(function(){
  NProgress.done();
})

// var cc = $('[data-menu]');
// console.log(cc);

//功能2   点击左侧点菜单按钮，让左侧的侧边栏消失  让右侧的内容占满全屏
$('[data-menu]').on('click',function(){
  $('.lt-laside').toggle();
  $('.rt-laside').toggleClass('menu');
})

$('.lt-laside .menu').on('click','[href="javascript:;"]',function(){
  var the = $(this);

  var child = the.siblings();

  child.stop().slideToggle();
})