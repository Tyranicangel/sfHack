var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var company=require('./company');
var user=require('./user');

var preventSchema=new Schema({
	description:{type:String,required:true},
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

preventSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Prevent',preventSchema);