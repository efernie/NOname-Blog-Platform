noName = window.noName || {};

noName.models = {};
noName.collections = {};
noName.views = {};

$(function(){

  noName.collections.MongoSearch = Backbone.Collection.extend({
    url : '/api/mongo/collections/all',
    parse : function (response) {
      return response;
    }
  });

  var mongoSearch = new noName.collections.MongoSearch();

  noName.views.searchResults = Backbone.View.extend({
    el : '#mongodbs',
    initialize : function () {
      var that = this;

      that.templateSrc = $('#mongoView').html();
      that.templateCompiled = Handlebars.compile( that.templateSrc );

      that.collection.on('reset', that.render, that);

      that.collection.on('add', that.render, that);
    },
    render : function () {
      var that = this;

      that.$el.empty();

      _.each(that.collection.models, function (repo) {
        that.$el.append( that.templateCompiled( repo.attributes ) );
      });
    }
  });

  var mongoFinal = new noName.views.searchResults({ collection : mongoSearch  });

  mongoSearch.fetch();

});