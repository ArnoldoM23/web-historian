var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('request');
var head = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

 // var readF = fs.writeFile(archive.paths.index)
 console.log('read************!',fs.readFile(archive.paths.index));
// console.log(path.extname('index.html'));
console.log('arc*********',archive.paths.index);
// console.log(path.archives);
exports.handleRequest = function (req, res) {
 var statusCode = 200;
 var sendUrl = '';


fs.readFile(archive.paths.index, function(err, data){
  if (err) {
    throw err;
  }
  var raw = data.toString();
  console.log('****************************raw',raw.indexOf('<input'));
});

// var input = raw.indexOf('<index');


 if (req.url === '/') {
  sendUrl = archives.paths.index;
 }else if(req.url === '/www.google.com'){
  sendUrl = '/google/';
 }

  // res.writeHead(statusCode, head.headers); 
  // res.end(archive.paths.list);
  res.end(sendUrl);
};
