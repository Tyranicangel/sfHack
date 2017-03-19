var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var triggerSchema=new Schema({
	location:{type:Schema.ObjectId,ref:'Location'},
	application:[{type:Schema.ObjectId,ref:'Application'}],
	infra:[{type:Schema.ObjectId,ref:'Infra'}],
	businessowner:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	itsme:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	vendorsme:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	ended:Date,
	comments:String,
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

triggerSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Trigger',triggerSchema);