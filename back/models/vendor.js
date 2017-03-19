var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var oldVendor=require('./oldvendor');

var vendorSchema=new Schema({
	vendorcompany:{type:String,required:true},
	supportterms:{type:String,required:true},
	contract:String,
	contractdocument:String,
	contractexpiry:Date,
	managername:{type:String,required:true},
	managerphone:{type:String,required:true},
	manageremail:{type:String,required:true},
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

vendorSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){

	}
	else{
		var ov=new oldVendor({
			vendorcompany:this.vendorcompany,
			supportterms:this.supportterms,
			contract:this.contract,
			contractdocument:this.contractdocument,
			contractexpiry:this.contractexpiry,
			managername:this.managername,
			managerphone:this.managerphone,
			manageremail:this.manageremail,
			vendor:this._id,
			createdBy:this.createdBy,
			active:this.active
		});
		ov.save();
	}
	next();
});

module.exports=mongoose.model('Vendor',vendorSchema);