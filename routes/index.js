 var express = require('express');
var router = express.Router();
var mysql = require('mysql');





var connection = mysql.createConnection({
	host:'localhost',
	port:8889,
	user:'root',
	password:'root',
	database:'mydb'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM `contenter-news`',function(err,rows,fd){
  	res.render("index",{data:rows});
  })
});

module.exports = router;
