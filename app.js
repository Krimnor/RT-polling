var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http);

app.enable('view cache');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))

app.set("questions", require('./poll/questions'));

app.set("config", {
  currentQuestion: 1,
})



io.on('connection', function(socket){
  console.log('a user connected');
});




http.listen(3000, function() {
  console.log('Listening on port 3000...')
})

