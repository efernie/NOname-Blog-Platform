var ENV = process.env['NODE_ENV'] || 'development'
  , config = require('../config')[ENV]
  , _ = require('underscore')
  , siteeditor = require('./siteeditor')
  ;

module.exports = function (app,opts) {

  siteeditor.init(app, opts);

  // Index Page
  app.get('/', function (req, res) {
    res.render('index');
  });

  // All other pages
  app.get('/:page', function (req, res) {
    res.render(req.params.page);
  });

};