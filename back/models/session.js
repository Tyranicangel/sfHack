var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var user=require('./user');

var sessionSchema=new Schema({
	token:{type:String,required:true},
	expiry:{type:String},
	user:{type:Schema.ObjectId,ref:'User'},
	created_at:Date,
	updated_at:Date
});

sessionSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Session',sessionSchema);