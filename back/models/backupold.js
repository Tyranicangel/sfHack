var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var backupoldSchema=new Schema({
	application:{type:Schema.ObjectId,ref:'Application'},
	frequency:String,
	backuptype:String,
	details:String,
	backup:{type:Schema.ObjectId,ref:'Backup'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

backupoldSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){

	}
	else{
		
	}
	next();
});

module.exports=mongoose.model('BackupOld',backupoldSchema);