var mongoose = require('mongoose');
var schema= mongoose.Schema;

var event= new schema({
	name: String,
	student:[],
	duedate: Date,
	package: Number,
	details:{
		profile:String,
		description: String
	},
	offer_type:String

});

module.exports= mongoose.model('Event',event);
