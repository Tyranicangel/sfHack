var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var locationoldSchema=new Schema({
	name:String,
	city:String,
	state :String,
	address :String,
	phoneno :String,
	country:String,
	location:{type:Schema.ObjectId,ref:'Location'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

locationoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('LocationOld',locationoldSchema);