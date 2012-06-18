$(function(){
  $.ajax({
    url: '/api/filesystem/lister/jade/views/test',
    type : 'get',
    success : function (data) {
      console.log(data.length)
      $('#fileContent').text(data)
    }
  });
  $.ajax({
    url : '/api/filesystem/lister/baseDir',
    type : 'get',
    success : function(data){
      console.log(data)
      $('#fileList').text(data)
    }
  });
  $('#fileSaver').on('submit',function(e){
    e.preventDefault();
    console.log(e)
    console.log($(this).serializeArray());
    var fileData = $(this).serializeArray();
    $.ajax({
      url : '/api/filesystem/filemanager/save/jade/views/test',
      data : fileData,
      type : 'post',
      success : function(data) {
        console.log(data)
        updateFileView();
      }
    });
  });

  $('#checkValidity').on('click',function(e){
    e.preventDefault();
    var fileData = $('#fileContent').serializeArray();
    console.log(fileData)
    $.ajax({
      url : '/api/codedebugger/jade/test',
      type: 'post',
      data: fileData,
      success : function(data){

      }
    })
  });

  function updateFileView () {
    $.ajax({
      url: '/api/filesystem/filemanager/jade/views/test',
      type : 'get',
      success : function (data) {
        console.log(data.length)
        $('#fileContent').text(data)
      }
    });
  }
});