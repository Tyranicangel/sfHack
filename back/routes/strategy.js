var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Strategy = require('../models/drstrategy');
var Oldstrategy = require('../models/drstrategyold');

router.get('/all', function(req, res, next) {
	user=req.authdata;
	User.findById(user.id,function(err,data){
		Strategy.find({company:data.company,active:true},function(err,result){
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

		Strategy.find({company:data.company,active:true},function(err,result){
			for(var i=0;i<result.length;i++){
				if(stratidlist.indexOf(result[i]._id+'')<0){
					result[i].active=false;
					result[i].save();
				}
			}
		});
		req.body.strats.forEach(function(strat){
			if(strat._id){
				Strategy.findById(strat._id,function(err,result){
					if(result.description!=strat.description){
						var ostrat=new Oldstrategy({
							description:result.description,
							strategy:result._id,
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
				var nstrat=new Strategy({
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