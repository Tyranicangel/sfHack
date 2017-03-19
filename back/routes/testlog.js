var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Testlog = require('../models/testlog');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Testlog.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.testlog;
	Testlog.findById(itm._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Testlog.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.testlog;
	User.findById(user.id,function(err,data){
		if(itm._id){
			Testlog.findById(itm._id,function(err,data){
				data.application=itm.application,
				data.details=itm.details,
				data.date=itm.date,
				data.testedby=itm.testedby,
				data.approvedby=itm.approvedby,
				data.result=itm.result,
				data.comments=itm.comments,
				data.createdBy=data._id,
				data.save().then(function(result){
					Testlog.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var testlog=new Testlog({
				application:itm.application,
				details:itm.details,
				date:itm.date,
				testedby:itm.testedby,
				approvedby:itm.approvedby,
				result:itm.result,
				comments:itm.comments,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			testlog.save(function(err,result){
				Testlog.find({company:data.company,active:true}).sort('application').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;