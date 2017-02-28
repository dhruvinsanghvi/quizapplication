var mongoose = require('mongoose');
var listSchema = mongoose.Schema({
	type:{
		type:String,
		required:true
	},
	image_url:{
		type:String,
		required:true
	},
	languageType:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	}



},{collection:'list'});
var List = module.exports = mongoose.model('List', listSchema);
//get list data

module.exports.getList = function(callback, limit){

	List.find(callback).limit(limit);
}