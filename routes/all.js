var express = require('express');
var path = require("path");
var fs = require("fs");
var filePath = path.resolve(path.dirname(__dirname), "data/menu.json");
console.log(filePath);
var router = express.Router();


function getMenuItems() {
	return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

router.get('/', function(req, res, next) {
	res.redirect('/menu');
});

router.get('/menu', function(req, res, next) {
  res.render('index', { 
		menuData: getMenuItems() 
	});
});

module.exports = router;
