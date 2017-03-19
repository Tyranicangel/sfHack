var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var infraoldSchema=new Schema({
	name:{type:String,required:true},
	items:Schema.Types.Mixed,
	infra:{type:Schema.ObjectId,ref:'Infra'},
	type:String,
	location:{type:Schema.ObjectId,ref:'Location'},
	businessowner:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	itsme:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	vendorsme:[{type:Schema.ObjectId,ref:'Stakeholder'}],
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

infraoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Infraold',infraoldSchema);