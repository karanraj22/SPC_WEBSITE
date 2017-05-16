// BASE SETUP
// =============================================================================
var express    = require('express');  
// cvar express    = require('express');  all the packages we need
               // define our app using express
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/spcwebsite');
var Student  = require('./app/models/student');
var Event = require('./app/models/event');
var app=require('./app/expressapp');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
 var router = express.Router(); 
var basic= require('./app/studentandevent');

    app.use('/',basic);

    var login= require('./app/loginandsignuproutes');
    app.use('/',login);
             // get an instance of the express Router

// middleware to use for all requests
/*router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
    .get(function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
app.use('/api', router);
*/


/*

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

        
    });

   router.route('/bears').get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });

    });

   router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });

    });

    router.route('/bears/:bearid')
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bearid, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    });

    router.route('/bears/:bear_id').delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });       */
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// more routes for our API will happen  here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens on port ' + port);
