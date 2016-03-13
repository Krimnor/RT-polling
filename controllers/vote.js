var express = require('express')
  , router = express.Router()

router.get('/:id/:opt', function(req, res) {
  console.log(req.params.id);
  console.log(req.params.opt);
})

module.exports = router
