var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var jwt    = require('jsonwebtoken')
var morgan      = require('morgan');
//mongoose.connect('mongodb://localhost/spcwebsite');
var config=require('../config/token');
var Student  = require('./models/student');
var Event = require('./models/event');
var app=require('./expressapp');
app.use(morgan('dev'));
var bcrypt=require('bcrypt-nodejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret);
router.route('/login').post(function(req,res){
      Student.findOne({
    rollno: req.body.rollno
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
    	var checkhash=user.password;
    	bcrypt.compare(req.body.password, checkhash, function(err, ans) {
    // res == true
    if(ans==true){
    	 var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*2// expires in 24 hours
        });
    	 res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });


    }
    else{

    	 res.json({ success: false, message: 'Authentication failed. Wrong password.' });

    }
});
    }

  });
});
var auth=require('./auth');
app.use('/signup',auth);


router.route('/signup')
.post(function(req,res){
	var student=new Student();
	student.name=req.body.name;
	bcrypt.hash(req.body.password, null, null, function(err, hash) {
    // Store hash in your password DB.

    if(err){
    	res.send(err);

    }
    console.log(hash);
    student.password=hash;
});
	student.rollno=req.body.rollno;

	student.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Student Created'});
    });
	console.log(student);
	
});

module.exports = router
// User.findOne({
//    name: req.body.name
//  }, function(err, user) {
