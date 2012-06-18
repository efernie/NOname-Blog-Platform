var config = require('../config')[process.env['NODE_ENV'] || 'development']
;

exports.init = function (app, opts) {
  exports.app = app;

  exports.filelister = require('filesystem/filelister/filelist')({
      'baseDir': opts.baseDirectory,
      'publicDir': opts.publicDirectory,
      'libs': exports
  });

  exports.filemanager = require('filesystem/filemanager/filemanager')({
    'baseDir': opts.baseDirectory,
    'publicDir': opts.publicDirectory,
    'libs' : exports
  });

  exports.jadedebugger = require('codedebugger/jade/jadedebugger')({
    'baseDir': opts.baseDirectory,
    'publicDir': opts.publicDirectory,
    'libs' : exports
  });
};
