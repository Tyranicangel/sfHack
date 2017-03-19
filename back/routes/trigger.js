var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Trigger = require('../models/trigger');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Trigger.find({company:data.company,active:true}).sort('created_at').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/end',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.trigger;
	var currentDate=new Date();
	Trigger.findById(itm._id,function(err,data){
		data.ended=currentDate;
		data.save().then(function(result){
			Trigger.find({company:data.company,active:true}).sort('created_at').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.trigger;
	User.findById(user.id,function(err,data){
		var trigger=new Trigger({
			location:itm.location,
			application:itm.application,
			infra:itm.infra,
			businessowner:itm.businessowner,
			itsme:itm.itsme,
			vendorsme:itm.vendorsme,
			comments:String,
			company:data.company,
			createdBy:data._id,
			active:true
		});
		trigger.save(function(err,result){
			Trigger.find({company:data.company,active:true}).sort('created_at').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

module.exports = router;