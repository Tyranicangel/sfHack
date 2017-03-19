var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var multr=require('multer');
var fs=require('fs');
var User = require('../models/user');
var Invite = require('../models/invite');
var aws = require('aws-sdk');
var config = require('../config');
aws.config.loadFromPath('aws.json');
var ses=new aws.SES({apiVersion:'2010-12-01'});
var from_email='padusumi@stevens.edu';
var to_email=['prad.ads1990@gmail.com'];

router.post('/upload',multr({dest:'./uploads/'}).single('file'),function(req,res,next){
	fileextension=req.file.originalname.split('.').pop();
	fs.rename(req.file.path,req.file.path+'.'+fileextension,function(err,result){});
	return res.json({success:true,path:req.file.path+'.'+fileextension});
});

router.post('/verify',function(req,res,next){
	user=req.authdata;
	User.findById(user.id,function(err,data){
		if(data.code==req.body.code){
			data.active=true;
			data.save(function(err,result){
				var token=jwt.sign({id:result._id,username:result.email,active:true},config.secret,{
					expiresIn: '24h'
				});
				return res.json({success:true,token:token})
			});
		}
		else{
			return res.json({success:false,message:"Invalid verification code"})
		}
	})
});

router.get('/check',function(req,res,next){
	user=req.authdata;
	User.findById(user.id).populate('company').exec(function(err,result){
		if(result.active){
			return res.json({success:true,username:result.firstname+' '+result.lastname,company:result.company.name});
		}
		else{
			return res.json({success:false})
		}
	});
});

router.post('/resend',function(req,res,next){
	user=req.authdata;
	User.findById(user.id,function(err,data){
		var params = {
			Destination: {ToAddresses:[data.email]},
			Message: {
				Body: {
					Text: {
						Data: 'Your verification code is '+data.code
					}
				},
				Subject: {
					Data: 'Disaster Planning-Verification Code',
				}
			},
			Source: from_email,
		};
		ses.sendEmail(params,function(err,result){
			return res.json({success:true,message:data.email})
		})
	})
});

router.post('/invite',function(req,res,next){
	user=req.authdata;
	invitelist=req.body.invites;
	if(user.active){
		for(var i=0;i<invitelist.length;i++){
			User.findOne({email:invitelist[i].text},function(err,data){
				if(data){
					return res.json({success:false,message:data.email+" is already in use."});
				}
			})
		}
		User.findById(user.id,function(err,data){
			mainuser=data;
			for(var i=0;i<invitelist.length;i++){
				var invite=new Invite({
					email:invitelist[i].text,
					company:mainuser.company,
					sentBy:req.authdata.id,
					active:true,
				});
				invite.save(function(err,result){
					var token=jwt.sign({id:result._id},config.secret);
					var params = {
						Destination: {ToAddresses:[result.email]},
						Message: {
							Body: {
								Text: {
									Data: 'Please click on the following link to create your account. http://localhost:4200/#/signup/'+token
								}
							},
							Subject: {
								Data: 'Disaster Planning-Invitation to join',
							}
						},
						Source: from_email,
					};
					ses.sendEmail(params,function(err,response){
					});
				});
			}
			return res.json({success:true})
		});
	}
	else{
		return res.json({success:false,message:"redirect"});
	}
});


module.exports = router;
