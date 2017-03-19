var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Infra = require('../models/infra');
var IGroup = require('../models/infragroup');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
			return res.json(das);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.infra;
	User.findById(user.id,function(err,data){
		Infra.findById(itm._id,function(err,dat){
			dat.active=false;
			dat.save().then(function(result){
				IGroup.update({infralist:result._id},{$pullAll:{infralist:[result._id]}}).exec(function(err,da){
					IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
						return res.json(das);
					});
				});
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.infra;
	User.findById(user.id,function(err,data){
		if(itm._id){
			Infra.findById(itm._id,function(err,sd){
				sd.type=itm.type,
				sd.name=itm.name,
				sd.items=itm.items,
				sd.location=itm.location,
				sd.businessowner=itm.businessowner,
				sd.itsme=itm.itsme,
				sd.vendorsme=itm.vendorsme,
				sd.createdBy=data._id,
				sd.save().then(function(result){
					IGroup.update({infralist:result._id},{$pullAll:{infralist:[result._id]}}).exec(function(err,da){
						IGroup.findOne({infratype:itm.type},function(err,dat){
							if(dat){
								dat.infralist.push(result._id);
								dat.save(function(err,respo){
									IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
										return res.json(das);
									});
								});
							}
							else{
								ig=new IGroup({
									infralist:[result._id],
									infratype:itm.type,
									company:data.company,
									active:true,
								});
								ig.save(function(err,respo){
									IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
										return res.json(das);
									});
								});
							}
						});
					});
				});
			});
		}
		else{
			var infra=new Infra({
				name:itm.name,
				type:itm.type,
				location:itm.location,
				businessowner:itm.businessowner,
				itsme:itm.itsme,
				vendorsme:itm.vendorsme,
				items:itm.items,
				createdBy:data._id,
				active:true
			});
			infra.save(function(err,result){
				IGroup.findOne({infratype:itm.type},function(err,dat){
					if(dat){
						dat.infralist.push(result._id);
						dat.save(function(err,respo){
							IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
								return res.json(das);
							});
						});
					}
					else{
						ig=new IGroup({
							infralist:[result._id],
							infratype:itm.type,
							company:data.company,
							active:true,
						});
						ig.save(function(err,respo){
							IGroup.find({company:data.company,active:true}).populate('infratype infralist').exec(function(err,das){
								return res.json(das);
							});
						});
					}
				});
			});
		}
	});
});

module.exports = router;