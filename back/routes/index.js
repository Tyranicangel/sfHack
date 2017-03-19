var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/uploads/:fname',function(req,res,next){
	res.download('C:/project/dr/back/uploads/'+req.params.fname);
});

module.exports = router;
