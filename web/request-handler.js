var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('request');
var head = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
 var statusCode = 200;

 // ?if request is coming ot index and is a POST
 if (req.url === '/') {
   if(req.method === 'POST'){

    var body = [];
    var file = archive.paths.list;
    // retrieve data here
    req.on('data', function(data){
      body.push(data);
    });
    // once data has been retrieved
    req.on('end', function(){
      // parse and stringify data
      body = JSON.parse(body.toString());
      // write data to the file
      fs.writeFile(file, body.url + '\n', function(err){
        if(err){throw err;}
      });
      // write the hear with a 302 confirmation code
      res.writeHead(302, head.headers);
      // end request
      res.end();
    });
   }
   // if request is not a POST it will default to a GET
   // use read file to grab data st index.html
  fs.readFile(archive.paths.index, function(err, data){
    if (err) {throw err;}
    //  stringify respond and end request
    var raw = data.toString();
    res.end(raw);
  });
  // request is gor googla rather  than /
 }else if(req.url === '/www.google.com'){
  fs.readFile(archive.paths.archivedSites + "/www.google.com", function(err, data){
    if (err) {throw err;}
    var raw = data.toString();
    res.end(raw);
  });
 }else{
    res.writeHead(404, head.headers)
    res.end();
 }




  // res.writeHead(statusCode, head.headers); 
  // res.end(archive.paths.list);
  // res.end(sendUrl);
};
