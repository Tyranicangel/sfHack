var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var company=require('./company');
var user=require('./user');
var goals=require('./drgoals');

var drgoalsoldSchema=new Schema({
	description:{type:String,required:true},
	goal:{type:Schema.ObjectId,ref:'Drgoals'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

drgoalsoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Drgoalsold',drgoalsoldSchema);