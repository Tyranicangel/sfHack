var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var user=require('./user');
var passwordSchema=new Schema({
	user:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

passwordSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Password',passwordSchema);