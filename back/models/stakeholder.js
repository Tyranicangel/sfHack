var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var StakeholderOld=require('./stakeholderold');

var stakeholderSchema=new Schema({
	companyname:String,
	role:String,
	name:String,
	officeemail:String,
	personalemail:String,
	phone:String,
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

stakeholderSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){

	}
	else{
		var os=new StakeholderOld({
			companyname:this.companyname,
			role:this.role,
			name:this.name,
			officeemail:this.officeemail,
			personalemail:this.personalemail,
			phone:this.phone,
			stakeholder:this._id,
			createdBy:this.createdBy,
			active:this.active
		});
		os.save();
	}
	next();
});

module.exports=mongoose.model('Stakeholder',stakeholderSchema);