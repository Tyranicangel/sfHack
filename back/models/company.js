var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var companySchema=new Schema({
	name:{type:String,required:true},
	size:{type:Number,required:true},
	domain:{type:String,required:true},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

companySchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Company',companySchema);