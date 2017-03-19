var mongoose=require('mongoose');
var company=require('./company');
var Schema=mongoose.Schema;

var userSchema=new Schema({
	firstname:{type:String,required:true},
	lastname:{type:String,required:true},
	password:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	phone:{type:String,required:true},
	company:{type:Schema.ObjectId,ref:'Company'},
	role:Number,
	active:Boolean,
	code:String,
	created_at:Date,
	updated_at:Date
});

userSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	next();
});

module.exports=mongoose.model('User', userSchema);