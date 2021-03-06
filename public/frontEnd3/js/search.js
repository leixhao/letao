
$(function(){
    showHistoryData();
    // console.log(1);
    // 2.点击搜索按钮 把关键词加入历史记录
  var searchInput = $('.search-box input');
  $('.search-box .btn').on('tap',function(){
      if(searchInput.val() == ''){
        return;
      }
    var keyWord  = searchInput.val();
    console.log(keyWord);
    setHistoryData(keyWord);
    // console.log(3);
    location.href='./searchList.html?proName='+keyWord;
    showHistoryData();
    // console.log(2);

  })

  // 3.点击清空历史按钮 清空历史记录 
  $('#clear-history').on('tap',function(){
    // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
    localStorage.removeItem('key');
  })

  // 4.点击删除按钮  删除一条数据
  $(".search-history-list").on('tap','i',function(){
    var deleteData = $(this).siblings('span').html();
      // console.log(deleteData);
    
    removeHistoryData(deleteData);
    showHistoryData();
  })

  //5.点击搜索历史的某一个可以跳转
  $('.search-history-list').on('tap','span.mui-pull-left',function(){
    //   console.log($(this).html());
    location.href = './searchList.html?proName='+$(this).html();
  })
})

//获取到本地存储的搜索记录
var getHistoryData = function(){
    return JSON.parse(window.localStorage.getItem('key') || '[]');
}


//将搜索的词放到历史记录中
var setHistoryData = function(value){
    
    var list = getHistoryData();

    //遍历历史记录
    $.each(list,function(i,item){
        if(value == item){
            list.splice(i,1);
        }
    });
    //将用户查询的
    list.push(value);

    localStorage.setItem('key',JSON.stringify(list));

}

//删除
var removeHistoryData = function(value){

    var list = getHistoryData();
    
        //遍历历史记录
        $.each(list,function(i,item){
            if(value == item){
                list.splice(i,1);
            }
        });

    window.localStorage.setItem('key',JSON.stringify(list));
}



//显示历史数据
var showHistoryData = function(){
    var list = getHistoryData();

    // console.log(list);
    
    if(list.length == 0){

        //如果历史记录没有数据
        $('.empty-history').show();
        $('.search-history').hide();
    } else {

        //将查找记录放入模板中
        var showData = template('showData',{
            list: list
        })

        $('.search-history-list').html(showData);
        $('.empty-history').hide();
        $('.search-history').show();
        
    }
}

