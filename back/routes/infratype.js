var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Infra = require('../models/infratype');

router.get('/all', function(req, res, next) {
	Infra.find({active:true}).sort('name').exec(function(err,dat){
		return res.json(dat);
	});
});

// router.post('/save',function(req,res,next) {
// 	var user=req.authdata;
// 	var itm=req.body;
// 	User.findById(user.id,function(err,data){
// 		var infra=new Infra({
// 			name:req.body.name,
// 			active:true
// 		});
// 		console.log(req.body);
// 		infra.save(function(err,result){
// 			Infra.find({active:true}).sort('name').exec(function(err,dat){
// 				return res.json(dat);
// 			});
// 		});
// 	});
// });

module.exports = router;