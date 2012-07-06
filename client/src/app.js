noName = window.noName || {};

noName.models = {};
noName.collections = {};
noName.views = {};

noName.collections.folders = Backbone.Collection.extend({
  url : '/api/filesystem/lister/baseDir',
  parse : function (response) {
    console.log(response)
    return response;
  }
});

noName.views.folders = Backbone.View.extend({
  el : '#fileList',
  initalize : function () {
    this.templateSrc = $('#folderViewTemp').html();
    this.templateCompiled = Handlebars.compile( this.templateSrc );
  },
  render : function () {

  }
});

var baseFolders = new noName.collections.folders();
baseFolders.fetch();
