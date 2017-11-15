$(function(){
//  1、当页面载入的时候要显示历史记录
    showHistoryData();
    // 2、点击搜索按钮，把关键词加入到历史记录中
    // 首先先从输入框中获取到关键词
    $("#search-btn").on('tap',function(){
        var keyword = $('#searchInput').val();
        setHistoryData(keyword);
        location.href = "./searchList.html?proName="+keyword;
        showHistoryData();
    })

    // 3、点击清空历史搜索记录
    $('.clear-history').on('tap',function(){
        removeHistoryData();
        showHistoryData();
    })

    // 4、点击删除按钮，删除一条数据
    $('.search-history-list').on('tap','i',function(){
        var Detele = $(this).siblings('span').html();
        removeHistoryData(Detele);
        showHistoryData();
    })

    // 5、点击历史列表中的字，把这个字放到地址栏中跳转进行搜索；
    $('.search-history-list').on('tap','span',function(){
        var keyword = $(this).html();
        location.href = "./searchList.html?proName="+keyword;
    })
    
})

// 利用localstorage存储搜索记录



// 1)、获取历史数据
var getHistoryData = function(){
   return JSON.parse( window.localStorage.getItem('lt-history')||'[]');
   
}

// 2)、设置
var setHistoryData = function(value){
    // 先获取到历史记录，进行判断是否重复，然后进行操作
    var list = getHistoryData();
    // 避免重复，进行判断如果重复，切掉数组里元素将value存进去
    
        $.each(list,function(i,item){
            if(value == item){
                list.splice(i,1);
            }
        })
   
    list.push(value);
    localStorage.setItem('lt-history',JSON.stringify(list));
 }


// 3)、展示历史搜索记录,先获取数据
var showHistoryData = function(){
    var list = getHistoryData();
    console.log(list);
    if(list.length == 0 ){
        // 没有历史搜索记录
        $('.history-none').show();
        $('.search-history').hide()
    }else{
        // 有历史搜索记录，并且展示出来
        $('.history-none').hide();
        var templateList = template("historytemplate",{list:list});
        $('.search-history-list').html(templateList);
        $('.search-history').show();
    }
}

// 4)、删除
// 当点击在历史记录中删除此条数据，重新加载
var removeHistoryData = function(){
    var list = getHistoryData();
    $.each(list,function(i,item){
        list.splice(i,1)
    });
    localStorage.setItem('lt-history', JSON.stringify(list));
}






// 1、页面加载进入后有两种情况
    // 1.1之前就没有数据，所以显示没有历史搜索记录
    // 1.2有历史搜索记录然后显示出来


// 思路：显示历史记录：localstorage.getItem
// 当用户搜索关键词
// 把搜索关键词添加到历史记录中？
// 1）历史记录中没有数据，在获取数据的时候返回空数组
// 2）历史记录中有数据，要查看历史记录中的数据是不是和我们搜索关键词重复，进行处理；
// 把新的数组转换成json添加到历史记录中
// 
// 点击删除  
// 首先获取到历史记录中的数组，判断删除的关键词是否和数组中的某一项一样，splice  重新添加到历史记录；