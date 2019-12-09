var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});
router.get('/#camera', function(req, res, next) {
  res.render('index', {page:'Camera', menuId:'camera'});
});

module.exports = router;
