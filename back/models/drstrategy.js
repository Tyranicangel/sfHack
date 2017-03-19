var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var company=require('./company');
var user=require('./user');

var drstrategySchema=new Schema({
	description:{type:String,required:true},
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

drstrategySchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Drstrategy',drstrategySchema);