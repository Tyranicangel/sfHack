var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var user=require('./user');
var vendor=require('./vendor');

var vendoroldSchema=new Schema({
	vendorcompany:{type:String,required:true},
	supportterms:{type:String,required:true},
	contract:String,
	contractdocument:String,
	contractexpiry:Date,
	managername:{type:String,required:true},
	managerphone:{type:String,required:true},
	manageremail:{type:String,required:true},
	vendor:{type:Schema.ObjectId,ref:'Vendor'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

vendoroldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Oldvendor',vendoroldSchema);