var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var company=require('./company');
var user=require('./user');
var strategy=require('./drstrategy');

var strategyoldSchema=new Schema({
	description:{type:String,required:true},
	strategy:{type:Schema.ObjectId,ref:'Drstrategy'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

strategyoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('Drstrategyold',strategyoldSchema);