var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TestlogOld=require('./testlogold');

var testlogSchema=new Schema({
	application:{type:Schema.ObjectId,ref:'Application'},
	details:String,
	date:Date,
	testedby:{type:Schema.ObjectId,ref:'Stakeholder'},
	approvedby:{type:Schema.ObjectId,ref:'Stakeholder'},
	result:String,
	comments:String,
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

testlogSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){
		
	}
	else{
		var ot=new TestlogOld({
			application:this.application,
			details:this.details,
			date:this.date,
			testedby:this.testedby,
			approvedby:this.approvedby,
			result:this.result,
			comments:this.comments,
			testlog:this._id,
			createdBy:this.createdBy,
			active:this.active
		});
		ot.save();
	}
	next();
});

module.exports=mongoose.model('Testlog',testlogSchema);