var express = require('express')
  , router = express.Router()

router.get('/', function(req, res) {
  res.render('slides', {config: req.app.get("config"),
                        votes: JSON.stringify(req.app.get("votes"))
                       });
})

module.exports = router
