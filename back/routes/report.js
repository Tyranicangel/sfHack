var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Testlog = require('../models/testlog');
var Backup = require('../models/backup');
var Vendor = require('../models/vendor');
var Bia = require('../models/application');
var Trigger = require('../models/trigger');

router.get('/dashboard', function(req, res, next) {
	var user=req.authdata;
	plist=[];
	tlist=[];
	User.findById(user.id,function(err,data){
		cdate=new Date();
		month3=new Date();
		month3.setMonth(month3.getMonth()+3);
		month6=new Date();
		month6.setMonth(month3.getMonth()+6);
		year2016=new Date('2016-01-01');
		year2017=new Date('2017-01-01');
		plist[0]=Vendor.count({company:data.company,active:true,contractexpiry:{$gt:cdate,$lt:month3}});
		plist[1]=Vendor.count({company:data.company,active:true,contractexpiry:{$gt:month3,$lt:month6}});
		plist[2]=Vendor.count({company:data.company,active:true,contractexpiry:{$lt:cdate}});
		plist[3]=Bia.find({company:data.company,active:true});
		plist[4]=Trigger.count({company:data.company,created_at:{$gte:year2016,$lt:year2017}});
		plist[5]=Trigger.count({company:data.company,created_at:{$gte:year2017}});
		plist[6]=Trigger.count({company:data.company,ended:{ "$exists" : false }});
		var output=[];
		Promise.all(plist).then(function(dat){
			output[0]=dat[2];
			output[1]=dat[0];
			output[2]=dat[1];
			output[7]=dat[4];
			output[8]=dat[5];
			output[9]=dat[6];
			for (var i = 0; i < dat[3].length; i++) {
				tlist.push(Testlog.count({application:dat[3][i]._id,active:true,date:{$gte:year2016,$lt:year2017}}));
				tlist.push(Testlog.count({application:dat[3][i]._id,active:true,date:{$gte:year2017}}));
				tlist.push(Backup.count({application:dat[3][i]._id,active:true}));
			}
			Promise.all(tlist).then(function(result){
				output[3]=dat[3].length;
				output[4]=0;
				output[5]=0;
				output[6]=0;
				for (var i = 0; i < dat[3].length; i++) {
					if(result[i*3]>0){
						output[4]++;
					}
					if(result[(i*3)+1]>0){
						output[5]++;
					}
					if(result[(i*3)+2]>0){
						output[6]++;
					}
				}
				return res.json(output);
			});
		});
	});
});

module.exports = router;