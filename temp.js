var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    if(err) throw err;
    let temp = JSON.parse(data);
    res.send(temp);

  });
});







app.listen(port, function () {
  console.log("Server Working " + port);
});
