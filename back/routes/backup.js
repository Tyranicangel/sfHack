var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Backup = require('../models/backup');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Backup.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.backup;
	Backup.findById(itm._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Backup.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.backup;
	User.findById(user.id,function(err,data){
		if(itm._id){
			Backup.findById(itm._id,function(err,data){
				application=itm.application,
				frequency=itm.frequency,
				backuptype=itm.backuptype,
				details=itm.details,
				data.createdBy=data._id,
				data.save().then(function(result){
					Backup.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var backup=new Backup({
				application:itm.application,
				frequency:itm.frequency,
				backuptype:itm.backuptype,
				details:itm.details,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			backup.save(function(err,result){
				Backup.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;