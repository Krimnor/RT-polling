var express = require('express')
  , router = express.Router()

router.get('/', function(req, res) {
  res.render('panel', {config: req.app.get("config"),
                       votes: JSON.stringify(req.app.get("votes"))
                      }
  );
})

router.get('/next', function(req, res) {
  var config = req.app.get("config");
  config.currentQuestion++;
  req.app.set("config", config);
  res.send("OK");
})

module.exports = router
