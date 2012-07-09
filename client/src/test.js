$(function(){

  $.ajax({
    url : '/api/filesystem/lister/baseDir',
    type : 'get',
    success : function(data){
      _.each(data, function (file){
        console.log(file)
        $('#fileList').append('<h3>' + file.name + '</h3>');
      });
    }
  });

});