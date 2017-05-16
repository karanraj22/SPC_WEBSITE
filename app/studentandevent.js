var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/spcwebsite');
var Student  = require('./models/student');
var Event = require('./models/event');
var app=require('./expressapp');
var bcrypt=require('bcrypt-nodejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var auth=require('./auth');

// configure app to use bodyParser()
// this will let us get the data from a POST

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', function (req,res) {
  res.send('Will render the homepage');
});
  app.use('/event/show',auth);
router.route('/student').post(function(req,res){
    var student=new Student();
    student.name=req.body.name;
    student.rollno=req.body.rollno;
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
    // Store hash in your password DB.
    student.password=hash;
});
    student.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Student Created'});
    });

});

router.route('/student').get(function(req,res){
   /* var student=new Student();
    student.name=req.body.name;
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
    // Store hash in your password DB.
    student.password=hash;
});
    student.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Student Created'});
    });
    */
    Student.find(function(err,studs){
        if(err){
            res.send(err);
        }
        res.json(studs);
    });

});


router.route('/event').post(function(req,res){
    var event=new Event();
    event.name=req.body.name;
    event.duedate=req.body.duedate;
    event.package=req.body.package;
    event.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Event Created'});
    });

});
router.route('/event/show')
.get(function(req,res){
  Event.find(function(err,events){
    if(err){
      res.send(err);
    }
    res.json(events);

  });

});
router.route('/event').get(function(req,res){

    res.send({message: 'Will send the HTML form or PAGE'});
});
// define the about route


module.exports = router