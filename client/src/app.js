noName = window.noName || {};

noName.models = {};
noName.collections = {};
noName.views = {};

noName.collections.serverfolders = Backbone.Collection.extend({
  url : '/api/filesystem/lister/server',
  initialize : function () {
    var self = this;

    self.on('reset', self.sortFolders, self);
  },
  parse : function (response) {
    return response;
  },
  sortFolders : function () {
    var self = this
      , folders = []
      , foldersObjArr = []
      , allFolders = []
      , baseDef = Q.defer()
      , folderDef = Q.defer()
      , fileDef = Q.defer()
      , base
      ;

    // Listener for when the folders are appened so it can process the next batch
    self.on('appendFolders' , processOthers);

    // Get the base folder
    base = self.models.filter(function (base) {
      return base.get('base');
    });

    // When the base folder is found trigger the render event in the view
    self.trigger('baseModel', base);

    // Set the base name
    baseName = base[0].attributes.base;

    // Map the models to figure out the folders directly under the base.
    self.models.map(function (folder) {
      if ( baseName === folder.get('parent') ) {
        if ( folder.attributes.type === 'folder' ) {
          folders.push(folder.attributes.name);
          foldersObjArr.push(folder);
        } else {
          self.trigger('sortFile', folder );
        }
      }
    });

    // Triger sort folder event after under base folders are found.
    self.trigger('sortFolder', [foldersObjArr, folders]);

    function processOthers () {
      foldersObjArr.length = 0;
      var alreadyAppened = [];
      // console.log('start', $('#server').find('li') )
      _.each($('#server').find('li'), function (elem) {
        // console.log( $(elem).data('foldername') )
        var folderName = $(elem).data('foldername');
        if( folderName ) {
          alreadyAppened.push( $(elem).data('foldername') );
        }
        // var indexOfFolder = _.indexOf( folders, $(elem).data('foldername') );
        // folders.splice( indexOfFolder, indexOfFolder + 1 );
      });
      console.log( alreadyAppened )
      _.each( self.models, function (models) {
        if( models.attributes.type === 'folder' ) {
          console.log(models.attributes.name, models.attributes.parent)
          // console.log(folders)
          // for (var i = alreadyAppened.length - 1; i >= 0; i--) {
          //   // console.log( models.attributes.parent )
          //   if ( folders[i] != models.attributes.name ) {
          //     console.log(models.attributes)
          //     // foldersObjArr.push(models)
          //     // self.trigger('sortFolder', [foldersObjArr, folders]);
          //   }
          // };
        }
      });
      console.log('trigger')
      // console.log(foldersObjArr)
      console.log(folders)
      // self.trigger('sortFolder', [foldersObjArr, folders]);

    }
  }
});

var baseServerFolders = new noName.collections.serverfolders();

noName.collections.publicfolders = Backbone.Collection.extend({
  url : '/api/filesystem/lister/public',
  parse : function (response) {
    return response;
  }
});

var basePublicFolders = new noName.collections.publicfolders();


noName.views.folders = Backbone.View.extend({
  el : '#server',
  initialize : function () {
    var that = this;

    this.templateSrcFolder = $('#folderViewTemp').html();
    this.templateCompiledFolder = Handlebars.compile( this.templateSrcFolder );

    that.templateSrcBase = $('#baseFolderTemplate').html();
    that.templateCompiledBase = Handlebars.compile( that.templateSrcBase );

    that.templateSrcFile = $('#fileTemplate').html();
    that.templateCompiledFile = Handlebars.compile( that.templateSrcFile )

    that.collection.on('baseModel', that.render, that);
    that.collection.on('sortFolder', that.appendFolders, that);
    that.collection.on('sortFile', that.appendFiles, that );
  },
  render : function (base) {
    var that = this;

    that.$el.empty().append( that.templateCompiledBase(base[0].attributes) );
  },
  appendFolders : function (folder) {
    var self = this
      , parentFolder
      , parentName = folder[0][0].attributes.parent
      ;

    _.each( self.$el.find('li'), function (parentElem) {
      if ( $(parentElem).data("foldername") === parentName ) {
        parentFolder = $(parentElem).children('ul');
      }
    });

    _.each(folder[0], function (folder) {
      parentFolder.append( self.templateCompiledFolder( folder.attributes ) );
    })

    self.collection.trigger('appendFolders');
  },
  appendFiles : function (file) {
    var that = this
      , parentFolder
      ;

    _.each( that.$el.find('li'), function (parent) {
      if ( $(parent).data("foldername") === file.attributes.parent ) {
        parentFolder = $(parent).children('ul');
      }
    });
    parentFolder.append( that.templateCompiledFile( file.attributes ) );
  }
});

noName.views.individualFolder = Backbone.View.extend({
  initialize : function () {

  },
  render : function () {

  }

});


$(function(){

  var serverfolderView = new noName.views.folders({ collection : baseServerFolders });
  // var serverfolderView = new noName.views.folders();

  baseServerFolders.fetch();
  //basePublicFolders.fetch();
});