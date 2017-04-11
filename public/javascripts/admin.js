//打开页面时发送请求
$(document).ready(function() {
    var $newsTable = $('#newstable')

    console.log($newsTable);
    refreshNews();
    // 添加新闻
    $('#btnsubmit').click(function(e) {

        // e.preveentDefault();

        // 输入判断
        if ($('#newstitle').val() === "" || $('#newsimg').val() === "" || $('#newstime').val() === "" || $('#newsrc').val() === "") {
            if ($('#newstitle').val() === "") {

                $('#newstitle').parent().addClass('has-error');
            } else {
                $('#newstitle').parent().removeClass('has-error');
            };
            if ($('#newsimage').val() === "") {

                $('#newsimage').parent().addClass('has-error');
            } else {
                $('#newsimage').parent().removeClass('has-error');
            };
            if ($('#newstime').val() === "") {

                $('#newstime').parent().addClass('has-error');
            } else {
                $('#newstime').parent().removeClass('has-error');
            };
            if ($('#newssrc').val() === "") {

                $('#newssrc').parent().addClass('has-error');
            } else {
                $('#newssrc').parent().removeClass('has-error');
            }


        } else {
            //    var title= $('#newstitle').val();
            // var   img=$('#newimage').val();
            //  var  time=$('#newstime').val();
            // var   src=$('#newssrc').val();
            //提交添加
            var news = {
                title: $('#newstitle').val(),
                img: $('#newimage').val(),
                time: $('#newstime').val(),
                src: $('#newssrc').val()
            }
            $.ajax({
                url: 'admin/addnews',
                type: 'post',
                // dataType: 'json',
                data: news,
                success: function(data) {
                    console.log(data);
                }
            })


        }
    })
    // 删除新闻功能
    var deleteId= null;
    $newsTable.on('click','.btn-warning',function(e){

        $('#leleteModal').modal('show');
       deleteId = $(this).parent().prevAll().eq(4).html();

    });
    $('#leleteModal #confirmDelete').click(function(){  
            console.log(111)
        
            $.ajax({
                url: 'admin/deletenews',
                type: 'post',
                // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {newsid:deleteId},
                 success: function(data) {  
                    console.log('success delete');  
                    refreshNews();
            }
            })
            
        

    });








    function refreshNews() {

        $newsTable.empty();

        $.ajax({
            url: 'admin/getallnews',
            type: 'get',
            dataType: ' json',
            success: function(data) {
                console.log(data);

                data.forEach(function(item, index, array) {

                    var $tdid = $('<td>').html(item.id);
                    var $tdtitle = $('<td>').html(item.title);
                    var $tdtime = $('<td>').html(item.time);
                    var $tdimg = $('<td>').html('<img width="100" src="' + item.img + '">');
                    var $tdsrc = $('<td>').html(item.src);
                    var $btnupdate = $('<button>').addClass('btn btn-info btn-xs').html('编辑');
                    var $btndelete = $('<button>').addClass('btn btn-warning btn-xs').html('删除');
                    var $tdctrl = $('<td>');
                    $tdctrl.append($btnupdate, $btndelete);
                    var $tRow = $('<tr>');
                    $tRow.append($tdid, $tdtitle, $tdimg, $tdtime, $tdsrc, $tdctrl);
                    $newsTable.append($tRow);
                    // 
                })

            }
        });


    }

})
