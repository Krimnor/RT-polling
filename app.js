var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.enable('view cache');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))

app.set("questions", require('./poll/questions'));

var config = {
  currentQuestion: 0,
};
app.set("config", config);

var voteArray = createVoteArray(app.get("questions"));
console.log(voteArray);
app.set("votes", voteArray);
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('next question', function(){
    config.currentQuestion++;
    io.emit('question update', config.currentQuestion);
  });

  socket.on('vote', function(ans){
    voteArray[config.currentQuestion].options[ans].votes++;
    console.log('Vote: ' + ans);
    socket.emit('vote received');
    io.emit('vote update', voteArray);
  });

  socket.on('block question', function(){
    io.emit('question blocked', winnerQuestion());
    console.log(winnerQuestion());
  });

  socket.on('reset', function(){
    config.currentQuestion = 0;
    voteArray = createVoteArray(app.get("questions"));
    io.emit('question update', config.currentQuestion);
    io.emit('vote update', voteArray);
  });
});

http.listen(app.get('port'), function() {
  console.log('Listening on port '+ app.get('port'));
})

function createVoteArray(questions) {
  return questions.map(function(opts){
      return {
        question: opts.question,
        options: opts.options.map(function(opt) {
        return {
          option: opt,
          votes: 0
        }})
      }
  });
}

function winnerQuestion() {
  var max = -1;
  var winner = -1;
  var opt = voteArray[config.currentQuestion].options;
  for(var i = 0; i< opt.length; i++) {
    if(opt[i].votes > max) {
      max = opt[i].votes;
      winner = i;
    }
  }
  return winner;
}
