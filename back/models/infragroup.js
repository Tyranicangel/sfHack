var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var infragroupSchema=new Schema({
	infralist:[{type:Schema.ObjectId,ref:'Infra'}],
	infratype:{type:Schema.ObjectId,ref:'Infratype'},
	company:{type:Schema.ObjectId,ref:'Company'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

infragroupSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Infragroup',infragroupSchema);