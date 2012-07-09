noName = window.noName || {};

noName.models = {};
noName.collections = {};
noName.views = {};

noName.collections.serverfolders = Backbone.Collection.extend({
  url : '/api/filesystem/lister/server',
  parse : function (response) {
    return response;
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

    this.templateSrc = $('#folderViewTemp').html();
    this.templateCompiled = Handlebars.compile( this.templateSrc );

    this.subTemplateSrc = $('#subFolder').html();
    this.subTemplateCompiled = Handlebars.compile( this.subTemplateSrc );

    that.collection.on('reset', that.render, that);
  },
  render : function () {
    var that = this
      , parent = that.collection.models[0].attributes
      ;

    that.sortFoldersCB = function (indiv) {
      //console.log( typeof indiv === 'string' );
      that.$el.append( that.templateCompiled( indiv ) );
    };

    console.log('ALL',parent)
    that.$el.empty();

    //that.$el.append( '<li class="folder">Server</li>' );

    //that.sortFolders(parent.sub);

    // _.each( parent.sub, function (files) {
    //   //console.log( files )

    //   // that.sortFolders(files, function (indiv) {
    //   //   console.log(indiv)
    //   // });
    //   //that.$el.append( that.templateCompiled( files ) );
    // });

  },
  sortFolders : function (folder) {
    var that = this;

    //console.log('folder',folder)
    _.each(folder, function (indiv) {
      //console.log('indiv',indiv)
      //console.log('isarray', _.isArray(indiv.sub) );
      if( _.isArray(indiv.sub) ){
        console.log('arr',indiv.sub)
      }
      if( indiv.sub ) {
        console.log('arr?',indiv.sub)
        _.each(indiv.sub, function (subArr) {
          //console.log('sub',subArr.sub)
          if( subArr.sub ) {
            that.sortFolders(subArr);
          } else {
            //console.log('pre',subArr);
            //return that.sortFoldersCB(subArr);
          }
        });
        //that.sortFolders(indiv);
      }
      //console.log( indiv );
      return that.sortFoldersCB(indiv);
    });
    // if ( folder.sub ) {
    //   _.each(folder, function (sub) {
    //     console.log('indiv: ',sub)
    //     if( typeof sub === 'object' ){
    //       //console.log('sub', sub.length)
    //       that.sortFolders(sub);
    //     } else {
    //       //console.log('file',sub)
    //     }
    //   });
    // } else {
    //   console.log(folder)
    //   //return that.sortFoldersCB(folder);
    // }

  }
});




$(function(){

  var serverfolderView = new noName.views.folders({ collection : baseServerFolders });

  baseServerFolders.fetch();
  //basePublicFolders.fetch();
});