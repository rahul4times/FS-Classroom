var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Index page
//CHANGE: this later to display just index page.
app.get('/', function(req, res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    var temp = JSON.parse(data)
    res.render('index', {myObject: temp});

  });
});


// Classrooms/Subject page
app.get('/classrooms', function(req, res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    var temp = JSON.parse(data);
  res.render('classrooms', {myObject: temp});
  });
});

// Classroom page
app.get('/classroom/:id', function(req,res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    var id = parseInt(req.params.id);
    var temp = JSON.parse(data);
    for(let i=0; i<temp.length; i++){
      if(temp[i].id === id){
        res.render('classroom', {myObject: temp[i]});
        // res.render('pageName', {nameYouGive: dataComesFromVar})
      } // if statement ends here
    } // for loop ends here
  })
});

// Profile page
app.get('/profile/:subid/:stuid', function(req,res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    var subjectId = parseInt(req.params.subid);
    var studentId = parseInt(req.params.stuid);
    var temp = JSON.parse(data);

    for(let i=0; i<temp.length; i++){
      if(temp[i].id === subjectId){
        for(let j=0; j<temp[i].students.length; j++){
          if(temp[i].students[j].id === studentId){
            // i am rendering two objects (student object, class object)
            res.render('profile', {myObject: temp[i].students[j],
            subjects: temp[i]});
          } // second if statement ends here
        } // second for loop ends here
      } // first if statement ends here
    } // first for loop ends here
  })
});

// Update student's scores/grades
app.get('/edit/:sbid/:stid', function(req, res) {
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    if(err) throw err;
    var temp = JSON.parse(data);

    var subid = parseInt(req.params.sbid);
    var stid = parseInt(req.params.stid);

    for(let i=0; i<temp.length; i++){
      if(temp[i].id === subid){
        for(let j=0; j<temp[i].students.length; j++){
          if(temp[i].students[j].id === stid){
            res.render('edit', {sObject: temp[i].students[j],
            mainObject: temp[i]});
          } // second if statement ends here
        } // second for loop ends here
      } // first if statement ends here
    } // first for loop ends here
    //res.sendStatus(400);
  });
});

// Update student's scores/grades post request
app.post('/edit/:sbid/', function(req, res) {
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    if(err) throw err;
    var temp = JSON.parse(data);

    var subjectId = parseInt(req.params.sbid);
    var studentId = parseInt(req.body.id);

    for(let i=0; i<temp.length; i++){
      if(temp[i].id === subjectId){
        for(let j=0; j<temp[i].students.length; j++){
          if(temp[i].students[j].id === studentId){
            temp[i].students[j].scores = req.body.scores;
            fs.writeFile("./classrooms.json", JSON.stringify(temp), function(err){
              if(err) throw err;
                console.log('Updated!');
              res.redirect('/profile/' + subjectId + '/' + studentId);
            });
          } // second if statement ends here
        } // second for loop ends here
      } // first if statement ends here
    } // first for loop ends here
  });
});

app.listen(port, function () {
  console.log("Server Running " + port);
});
