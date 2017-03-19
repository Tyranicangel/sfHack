var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Location = require('../models/location');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Location.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
			return res.json(dat);
		});
	});
});

router.post('/remove',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.location;
	Location.findById(itm._id,function(err,data){
		data.active=false;
		data.save().then(function(result){
			Location.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
				return res.json(dat);
			});
		});
	});
});

router.post('/save',function(req,res,next) {
	var user=req.authdata;
	var itm=req.body.location;
	User.findById(user.id,function(err,data){
		if(itm._id){
			Location.findById(itm._id,function(err,data){
				name=itm.name,
				city=itm.city,
				state =itm.state,
				address =itm.address,
				phoneno =itm.phoneno,
				country=itm.country,
				data.createdBy=data._id,
				data.save().then(function(result){
					Location.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
						return res.json(dat);
					});
				});
			});
		}
		else{
			var location=new Location({
				name:itm.name,
				city:itm.city,
				state:itm.state,
				address:itm.address,
				phoneno:itm.phoneno,
				country:itm.country,
				company:data.company,
				createdBy:data._id,
				active:true
			});
			location.save(function(err,result){
				Location.find({company:data.company,active:true}).sort('name').exec(function(err,dat){
					return res.json(dat);
				});
			});
		}
	});
});

module.exports = router;