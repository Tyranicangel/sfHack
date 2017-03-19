var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var testlogoldSchema=new Schema({
	application:{type:Schema.ObjectId,ref:'Application'},
	details:String,
	date:Date,
	testedby:{type:Schema.ObjectId,ref:'Stakeholder'},
	approvedby:{type:Schema.ObjectId,ref:'Stakeholder'},
	result:String,
	comments:String,
	testlog:{type:Schema.ObjectId,ref:'Testlog'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

testlogoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('TestlogOld',testlogoldSchema);