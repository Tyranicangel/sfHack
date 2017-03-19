var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var stakeholderoldSchema=new Schema({
	companyname:String,
	role:String,
	name:String,
	officeemail:String,
	personalemail:String,
	phone:String,
	stakeholder:{type:Schema.ObjectId,ref:'Stakeholder'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

stakeholderoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('StakeholderOld',stakeholderoldSchema);