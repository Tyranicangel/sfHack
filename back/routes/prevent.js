var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Prevent = require('../models/prevent');
var Oldprevent = require('../models/preventold');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Prevent.find({company:data.company,active:true},function(err,result){
			return res.json(result);
		});
	});
});

router.post('/create',function(req,res,next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		var stratidlist=[];
		req.body.strats.forEach(function(strat){
			stratidlist.push(strat._id);
		});

		Prevent.find({company:data.company,active:true},function(err,result){
			for(var i=0;i<result.length;i++){
				if(stratidlist.indexOf(result[i]._id+'')<0){
					result[i].active=false;
					result[i].save();
				}
			}
		});
		req.body.strats.forEach(function(strat){
			if(strat._id){
				Prevent.findById(strat._id,function(err,result){
					if(result.description!=strat.description){
						var ostrat=new OldPrevent({
							description:result.description,
							prevent:result._id,
							createdBy:result.createdBy,
							active:result.active
						});
						ostrat.save(function(err,dat){
							result.description=strat.description;
							result.createdBy=data._id;
							result.active=true;
							result.save();
						});
					}
				});
			}
			else{
				var nstrat=new Prevent({
					description:strat.description,
					company:data.company,
					createdBy:data._id,
					active:true,
				});
				nstrat.save();
			}
		});
		return res.json({success:true});
	});
});

module.exports = router;