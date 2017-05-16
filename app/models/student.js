var mongoose = require('mongoose');
var schema= mongoose.Schema;

var student= new schema({
	name:String,
	rollno: Number,
	password:String,
	stream: String,
	cpi:Number,
	contact_no:Number,
	emailid:String,
	event: [],
	placed:Boolean,
	current_offer:{
		company:String,
		package:Number,
		category:String
	},
	switch:Boolean
});

module.exports= mongoose.model('Student',student);
