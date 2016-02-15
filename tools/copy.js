var fs = require('fs');
var colors = require('colors');

var files = ['server.js', 'package.json', 'favicon.ico'];

files.forEach(function(f){

  fs.readFile(f, function (err,data) {

    fs.writeFile('dist/'+f, data, function (err) {
      if (err) return console.log(err);
    });

    console.log(f + ' written to /dist'.green);
  });
});

