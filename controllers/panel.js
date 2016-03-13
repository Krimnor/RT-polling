var express = require('express')
  , router = express.Router()

router.get('/', function(req, res) {
  res.render('panel', {config: req.app.get("config"),
                       questions: req.app.get("questions")
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
