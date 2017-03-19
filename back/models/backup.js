var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BackupOld=require('./backupold');

var backupSchema=new Schema({
	application:{type:Schema.ObjectId,ref:'Application'},
	backuptype:String,
	frequency:String,
	details:String,
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

backupSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){
		
	}
	else{
		var ob=new BackupOld({
			application:this.application,
			backuptype:this.backuptype,
			frequency:this.frequency,
			details:this.details,
			backup:this._id,
			createdBy:this.createdBy,
			active:this.active
		});
		ob.save();
	}
	next();
});

module.exports=mongoose.model('Backup',backupSchema);