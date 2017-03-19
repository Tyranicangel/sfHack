var express = require('express');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();
var Company = require('../models/company');
var User = require('../models/user');
var aws = require('aws-sdk');
aws.config.loadFromPath('aws.json');
var ses=new aws.SES({apiVersion:'2010-12-01'});
var from_email='padusumi@stevens.edu';
var to_email=['prad.ads1990@gmail.com'];
var Invite=require('../models/invite');
var Password=require('../models/password');

router.get('/hello', function(req, res, next) {
	return res.json({hello:'Helloooooo'});
});

router.post('/reset', function(req, res, next) {
	jwt.verify(req.body.verifyToken,config.secret,function(err,decoded){
		Password.findById(decoded.id,function(err,result){
			if(result){
				if(result.active){
					User.findById(result.user,function(err,data){
						data.password=crypto.createHash('sha256').update(req.body.pass).digest('hex')
						data.save(function(err,data){
							result.active=false;
							result.save(function(err,data){
								return res.json({success:true});
							});
						});
					});
				}
				else{
					return res.json({success:false,message:'Link already used'});
				}
			}
			else{
				return res.json({success:false,message:'Invalid link'});
			}
		});
	});
});

router.post('/forgot',function(req,res,next) {
	User.findOne({email:req.body.email},function(err,result){
		if(result){
			var password=new Password({
				user:result.id,
				active:true,
			});
			password.save(function(err,data){
				var token=jwt.sign({id:data._id},config.secret);
				var params = {
					Destination: {ToAddresses:[result.email]},
					Message: {
						Body: {
							Text: {
								Data: 'Click on the following link to reset your password. http://localhost:4200/#/reset/'+token
							}
						},
						Subject: {
							Data: 'Disaster Planning-Reset Link',
						}
					},
					Source: from_email,
				};
				ses.sendEmail(params,function(err,data){
					if (err) console.log(err, err.stack);
					else return res.json({success:true,message:result.email})
				})
			});
		}
		else{
			return res.json({success:false,message:"Email not found"});
		}
	});
});

router.post('/login',function(req,res,next) {
	User.findOne({email:req.body.userData.email,password:crypto.createHash('sha256').update(req.body.userData.password).digest('hex')},function(err,data){
		if(data){
			var token=jwt.sign({id:data._id,username:data.email,active:data.active},config.secret,{
				expiresIn: '24h'
			});
			return res.json({success:true,token:token,active:data.active});
		}
		else{
			User.findOne({email:req.body.userData.email},function(err,result){
				if(result){
					return res.json({success:false,message:"Wrong password"});
				}
				else{
					return res.json({success:false,message:"Invalid email"});
				}
			});
		}
	});
});

router.put('/register',function(req,res,next) {
	User.findOne({email:req.body.userData.email},function(err,data){
		if(data){
			return res.json({success:false,message:'Email already in use.'})
		}
		else{
			jwt.verify(req.body.verifyToken,config.secret,function(err,decoded){
				if(err){
					return res.json({success:false,message:'Invalid link'});
				}
				else{
					Invite.findById(decoded.id,function(err,result){
						if(result.active){
							var user=new User({
								firstname:req.body.userData.firstName,
								lastname:req.body.userData.lastName,
								password:crypto.createHash('sha256').update(req.body.userData.password).digest('hex'),
								email:result.email,
								phone:req.body.userData.phone,
								company:result.company,
								code:result.id,
								role:1,
								active:true
							});
							user.save(function(err,response){
								var token=jwt.sign({id:response._id,username:response.email,active:true},config.secret,{
									expiresIn: '24h'
								});
								result.active=false;
								result.save(function(err,data){
									return res.json({success:true,token:token});
								})
							});
						}
						else{
							return res.json({success:false,message:'This link has already been used'});
						}
					});
				}
			});
		}
	});
});

router.put('/create',function(req,res,next) {
	User.findOne({email:req.body.userData.email},function(err,data){
		if(data){
			return res.json({success:false,message:'Email already in use.'})
		}
		else{
			var company = new Company({
				name:req.body.companyData.name,
				size:req.body.companyData.size,
				domain:req.body.companyData.domain+req.body.companyData.extension,
				active:false
			});

			company.save(function(err,data){
				var verifyCode=Math.floor((Math.random()*899999) + 100001)
				var user = new User({
					firstname:req.body.userData.firstName,
					lastname:req.body.userData.lastName,
					password:crypto.createHash('sha256').update(req.body.userData.password).digest('hex'),
					email:req.body.userData.email,
					phone:req.body.userData.phone,
					company:data._id,
					code:verifyCode,
					role:1,
					active:false,
				});

				user.save(function(err,result){
					var token=jwt.sign({id:result._id,username:result.email,active:false},config.secret,{
						expiresIn: '24h'
					});
					var params = {
						Destination: {ToAddresses:[result.email]},
						Message: {
							Body: {
								Text: {
									Data: 'Your verification code is '+verifyCode
								}
							},
							Subject: {
								Data: 'Disaster Planning-Verification Code',
							}
						},
						Source: from_email,
					};
					ses.sendEmail(params,function(err,data){
						if (err) console.log(err, err.stack);
						else return res.json({success:true,token:token})
					})
				});
			});
		}
	});
});

module.exports = router;
