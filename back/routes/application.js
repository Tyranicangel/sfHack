var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Application = require('../models/application');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Application.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.app;
	Application.findById(itm._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Application.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.app;
	User.findById(user.id,function(err,data){
		if(itm._id){
			Application.findById(itm._id,function(err,data){
				data.name=itm.name,
				data.type=itm.type,
				data.location=itm.location,
				data.description=itm.description,
				data.criticality=itm.criticality,
				data.businessowner=itm.businessowner,
				data.itsme=itm.itsme,
				data.vendorsme=itm.vendorsme,
				data.supporthours=itm.supporthours,
				data.supportcover=itm.supportcover,
				data.rto=itm.rto,
				data.rpo=itm.rpo,
				data.security=itm.security,
				data.workaround=itm.workaround,
				data.createdBy=data._id,
				data.save().then(function(result){
					Application.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var application=new Application({
				name:itm.name,
				type:itm.type,
				location:itm.location,
				description:itm.description,
				criticality:itm.criticality,
				businessowner:itm.businessowner,
				itsme:itm.itsme,
				vendorsme:itm.vendorsme,
				supporthours:itm.supporthours,
				supportcover:itm.supportcover,
				rto:itm.rto,
				rpo:itm.rpo,
				security:itm.security,
				workaround:itm.workaround,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			application.save(function(err,result){
				Application.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;