var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var appOldSchema=new Schema({
	name:String,
	type:String,
	description:String,
	criticality:String,
	location:{type:Schema.ObjectId,ref:'Location'},
	businessowner:[{type:Schema.ObjectId,ref:'Stakeholer'}],
	itsme:[{type:Schema.ObjectId,ref:'Stakeholer'}],
	vendorsme:[{type:Schema.ObjectId,ref:'Stakeholer'}],
	supporthours:String,
	supportcover:String,
	rto:String,
	rpo:String,
	security:String,
	workaround:String,
	application:{type:Schema.ObjectId,ref:'Application'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

appOldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('ApplicationOld',appOldSchema);