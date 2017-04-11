var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
	host:'localhost',
	port:8889,
	user:'root',
	password:'root',
	database:'mydb'
});

/* GET home page. */
router.get('/getallnews', function(req, res, next) {
  connection.query('SELECT * FROM `contenter-news`',function(err,rows,fd){
   res.json(rows);
   
});
});

router.post('/addnews', function(req,res,next){
	// var title = req.body.newstitle;
	// var img = v.newsimage;
	// var src =req.body.newssrc;
	connection.query('insert into `contenter-news`SET ?' ,req.body,function(err,rows){
           res.send(rows);
	})
});


router.post('/deletenews', function(req, res, next) {
	/*optional stuff to do after success */
	var newsid =req.body.newsid;
	connection.query('DELETE FROM `contenter-news` WHERE id=?',[newsid],function(err,rows){
			// console.log(result.affectedRows);
			console.log(newsid);
			 res.end();
	})
});
 



module.exports = router;
