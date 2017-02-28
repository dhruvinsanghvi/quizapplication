var mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
var quizSchema = mongoose.Schema({
	type:{
		type:String,
		required:true
	},
	topic:{
		type:String,
		required:true
	},
	text:{
		type:String,
		required:true
	},
	selected:{
		type:Int32,
		default:null
	},
	correct:{
		type:Int32,
		default:null
	},
	correctanswer:{
		type:Int32,
		required:true
	}

},{collection:'quiz'});
var Quiz = module.exports = mongoose.model('Quiz', quizSchema);
//get list data

module.exports.getQuiz = function(callback, limit){

	Quiz.find(callback).limit(limit);
}
module.exports.getQuizById = function(id,callback){

	Quiz.findById(id,callback);
}