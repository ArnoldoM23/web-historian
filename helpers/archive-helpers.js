var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),

};
// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // read file from paths list
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      throw err;
    }
    // sringify the data and split it into an array

    var data = data.toString().split('\n');
    
    // invoke the callback function passing in the data as an arg
    callback(data);
  })
};

exports.isUrlInList = function(url, callback){
  var file = exports.paths.list;
  fs.readFile(file, function(err, data){
    if(err){
      throw err;
    }
    var data = data.toString();
    callback('side');
  });
};

exports.addUrlToList = function(url, callback){
  var file = exports.paths.list;
  fs.appendFile(file, url, function(err){
    if(err){
      throw err;
    }
  });
  callback();
};

exports.isUrlArchived = function(url, callback){
  var file = exports.paths.archivedSites + '/' + url;
  fs.exists(file, function(exist){
    callback(exist);
  });
};

exports.downloadUrls = function(urlArray){
  var file = exports.paths.archivedSites;
  _.each(urlArray, function(url){

  request('http://'+ url).pipe(fs.createWriteStream(file + '/' + url));
  });
  
};



