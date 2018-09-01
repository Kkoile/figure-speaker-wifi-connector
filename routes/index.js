var express = require('express');
var router = express.Router();

var WifiController = require('../lib/WifiController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/availableNetworks', function(req, res, next) {
  WifiController.getAvailableNetworks().then(function(oData) {
    res.send(oData);
  }, function(err) {
    res.status(500).send(err);
  });
});

router.post('/connectToNetwork', function(req, res, next) {
  var oNetwork = req.body;
  WifiController.connectToNetwork(oNetwork).then(function(oData) {
    res.send(oData);
  }, function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;
