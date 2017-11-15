$(function(){
    getSearchList();
})

var getSearchList = function(price,pageName,pageSize){

    var url = new URLSearchParams(location.search);

    var proName = url.get('proName');

    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            proName: proName || '',
            price: price || 2,
            num: num || 2,
            page: pageName || 1,
            pageSize: pageSize || 6
        },
        success:function(data){
            console.log(data);
        }
    })

}