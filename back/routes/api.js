var express = require('express');
var config = require('../config');
var jwt = require('jsonwebtoken');

var router = express.Router();
var main = require('./main');
var user = require('./user');
var goals = require('./goals');
var strategy = require('./strategy');
var prevent = require('./prevent');
var vendor = require('./vendor');
var stakeholder=require('./stakeholder');
var infra=require('./infra');
var application=require('./application');
var backup=require('./backup');
var testlog=require('./testlog');
var defaultinfra=require('./defaultinfra');
var infratype=require('./infratype');
var report=require('./report');
var location = require("./location");
var trigger = require("./trigger");

var auth=function(req,res,next){
	var token=req.body.token || req.query.token || req.headers['jwt-authtoken'];
	if(token){
		jwt.verify(token,config.secret,function(err,decoded){
			if(err){
				return res.status(401).send({
					success:false,
					message:'Unauthorized token'
				});
			}
			else{
				req.authdata=decoded;
				next();
			}
		});
	}
	else{
		return res.status(403).send({
			success:false,
			message:'No token provided'
		});
	}
}

router.use('/main',main);
router.use('/user',auth,user);
router.use('/goals',auth,goals);
router.use('/strategy',auth,strategy);
router.use('/prevent',auth,prevent);
router.use('/vendor',auth,vendor);
router.use('/stakeholder',auth,stakeholder);
router.use('/infra',auth,infra);
router.use('/application',auth,application);
router.use('/backup',auth,backup);
router.use('/testlog',auth,testlog);
router.use('/location',auth,location);
router.use('/defaultinfra',auth,defaultinfra);
router.use('/infratype',auth,infratype);
router.use('/report',auth,report);
router.use('/trigger',auth,trigger);

module.exports = router;
