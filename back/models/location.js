var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var LocationOld=require('./locationold');

var locationSchema=new Schema({
	name:String,
	city:String,
	state :String,
	address :String,
	phoneno :String,
	country:String,
	company:{type:Schema.ObjectId,ref:'Company'},
	createdBy:{type:Schema.ObjectId,ref:'User'},
	active:Boolean,
	created_at:Date,
	updated_at:Date
});

locationSchema.pre('save',function(next){
	var currentDate=new Date();
	this.updated_at=currentDate;
	if(!this.created_at){
		this.created_at=currentDate;
	}
	if(this.wasNew){		
	}
	else{
		var ol=new LocationOld({
			name:this.name,
			city:this.city,
			state :this.state,
			address :this.address,
			phoneno :this.phoneno,
			country:this.country,
			location:this._id,
			createdBy:this.createdBy,
			active:this.active
		});
		ol.save();
	}
	next();
});

module.exports=mongoose.model('Location',locationSchema);