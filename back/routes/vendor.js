var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Vendor = require('../models/vendor');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Vendor.find({company:data.company,active:true}).sort('vendorcompany').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var v=req.body.vendor;
	Vendor.findById(v._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Vendor.find({company:data.company,active:true}).sort('vendorcompany').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var v=req.body.vendor;
	User.findById(user.id,function(err,data){
		if(v._id){
			Vendor.findById(v._id,function(err,data){
				data.vendorcompany=v.vendorcompany,
				data.supportterms=v.supportterms,
				data.contract=v.contract,
				data.contractdocument=v.contractdocument,
				data.contractexpiry=v.contractexpiry,
				data.managername=v.managername,
				data.managerphone=v.managerphone,
				data.manageremail=v.manageremail,
				data.createdBy=data._id,
				data.save().then(function(result){
					Vendor.find({company:data.company,active:true}).sort('vendorcompany').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var vendor=new Vendor({
				vendorcompany:v.vendorcompany,
				supportterms:v.supportterms,
				contract:v.contract,
				contractdocument:v.contractdocument,
				contractexpiry:v.contractexpiry,
				managername:v.managername,
				managerphone:v.managerphone,
				manageremail:v.manageremail,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			vendor.save(function(err,result){
				Vendor.find({company:data.company,active:true}).sort('vendorcompany').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;