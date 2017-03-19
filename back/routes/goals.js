var express = require('express');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var Goals = require('../models/drgoals');
var OldGoals = require('../models/drgoalsold');

router.get('/all', function(req, res, next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		Goals.find({company:data.company,active:true},function(err,result){
			return res.json(result);
		});
	});
});

router.post('/create',function(req,res,next) {
	var user=req.authdata;
	User.findById(user.id,function(err,data){
		var goalsidlist=[];
		req.body.goals.forEach(function(goal){
			goalsidlist.push(goal._id);
		});

		Goals.find({company:data.company,active:true},function(err,result){
			for(var i=0;i<result.length;i++){
				if(goalsidlist.indexOf(result[i]._id+'')<0){
					result[i].active=false;
					result[i].save();
				}
			}
		});
		req.body.goals.forEach(function(goal){
			if(goal._id){
				Goals.findById(goal._id,function(err,result){
					if(result.description!=goal.description){
						var ogoal=new OldGoals({
							description:result.description,
							goal:result._id,
							createdBy:result.createdBy,
							active:result.active
						});
						ogoal.save(function(err,dat){
							result.description=goal.description;
							result.createdBy=data._id;
							result.active=true;
							result.save();
						});
					}
				});
			}
			else{
				var ngoal=new Goals({
					description:goal.description,
					company:data.company,
					createdBy:data._id,
					active:true,
				});
				ngoal.save();
			}
		});
		return res.json({success:true});
	});
});

module.exports = router;