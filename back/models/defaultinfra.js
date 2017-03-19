var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var defaultinfraSchema=new Schema({
	items:[String],
	infratype:{type:Schema.ObjectId,ref:'Infratype'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

defaultinfraSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Defaultinfra',defaultinfraSchema);