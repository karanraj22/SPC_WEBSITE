var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/spcwebsite');
var Student  = require('./models/student');
var Event = require('./models/event');
var app=require('./expressapp');
var jwt    = require('jsonwebtoken')
var morgan      = require('morgan');
//mongoose.connect('mongodb://localhost/spcwebsite');
var config=require('../config/token');
var bcrypt=require('bcrypt-nodejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports=function(req,res,next){

 
var token = req.body.token || req.query.token || req.headers['x-access-token'];
console.log(req.body.token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.',token: token });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}
