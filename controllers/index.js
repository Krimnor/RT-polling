var express = require('express')
  , uuid = require('node-uuid')
  , router = express.Router()
  //, Vote = require('../models/vote')

router.use('/vote', require('./vote'));
router.use('/panel', require('./panel'));
//router.use('/display', require('./display'));

router.get('/', function(req, res) {
  res.render('voter', {id: uuid.v4()});
});

module.exports = router;
