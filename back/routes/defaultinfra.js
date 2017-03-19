var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Infra = require('../models/defaultinfra');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Infra.find({active:true}).sort('infratype').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.get('/default',function(req,res,next) {
	Infra.find({active:true}).populate('infratype').exec(function(err,data){
		return res.json(data);
	});
});

// router.post('/save',function(req,res,next) {
// 	var user=req.authdata;
// 	var itm=req.body;
// 	itm.dat=["PBX redundancy","Email Redundancy"];
// 	User.findById(user.id,function(err,data){
// 		var infra=new Infra({
// 			items:itm.dat,
// 			infratype:itm.type,
// 			active:true
// 		});
// 		infra.save(function(err,result){
// 			Infra.find({active:true}).sort('infratype').exec(function(err,dat){
// 				return res.json(dat);
// 			});
// 		});
// 	});
// });

module.exports = router;