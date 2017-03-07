var mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
var bcrypt = require('bcryptjs');
var userSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	imageStrings:{
		type:String,
		default:null
	},
	score:{
		type:Array,
		default:null
	}

	

},{collection:'users'});
var User = module.exports = mongoose.model('User', userSchema);
//get list data

module.exports.getUsers = function(callback, limit){

	User.find(callback).limit(limit);
}
module.exports.getUserById = function(id,callback){

	User.findById(id,callback);
}
module.exports.addUser = function(user,callback){
	User.create(user, callback);

	
}
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id :id};
	var update = {
		score:user.score

	};

	User.findOneAndUpdate(query, update, options, callback);

	
}
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.comparePassword = function(candidatePassword, originalpassword, callback){
	console.log(candidatePassword);
	console.log(originalpassword);
	callback(false, candidatePassword == originalpassword);
	
	
}