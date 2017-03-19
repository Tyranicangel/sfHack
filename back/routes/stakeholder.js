var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Stakeholder = require('../models/stakeholder');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Stakeholder.find({company:data.company,active:true}).sort('companyname').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var s=req.body.stakeholder;
	Stakeholder.findById(s._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Stakeholder.find({company:data.company,active:true}).sort('companyname').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var s=req.body.stakeholder;
	User.findById(user.id,function(err,data){
		if(s._id){
			Stakeholder.findById(s._id,function(err,data){
				data.companyname=s.companyname,
				data.role=s.role,
				data.name=s.name,
				data.officeemail=s.officeemail,
				data.personalemail=s.personalemail,
				data.phone=s.phone,
				data.createdBy=data._id,
				data.save().then(function(result){
					Stakeholder.find({company:data.company,active:true}).sort('companyname').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var stakeholder=new Stakeholder({
				companyname:s.companyname,
				role:s.role,
				name:s.name,
				officeemail:s.officeemail,
				personalemail:s.personalemail,
				phone:s.phone,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			stakeholder.save(function(err,result){
				Stakeholder.find({company:data.company,active:true}).sort('companyname').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;