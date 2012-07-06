noName = window.noName || {};

noName.models = {};
noName.collections = {};
noName.views = {};

$(function(){

  noName.collections.githubSearch = Backbone.Collection.extend({
    url : '/api/github/search/node',
    parse : function (response) {
      return response;
    }
  });

  var githubSearchF = new noName.collections.githubSearch();

  noName.views.searchResults = Backbone.View.extend({
    el : '#githubRepos',
    initialize : function () {
      var that = this;

      that.templateSrc = $('#githubView').html();
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

  var githubFinal = new noName.views.searchResults({ collection : githubSearchF  });


  $('#githubForm').submit(function(e){
    e.preventDefault();

    var value = $(this).serializeArray()[0];

    githubSearchF.url = '/api/github/search/' + value.value;
    githubSearchF.fetch();
  })
});