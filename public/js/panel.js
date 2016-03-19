var socket = io();

var next = document.getElementById("next-btn");
var block = document.getElementById("block-btn");
var reset = document.getElementById("reset-btn");

next.addEventListener("click", function(e) {
  e.preventDefault();
  socket.emit('next question');
});

block.addEventListener("click", function(e) {
  e.preventDefault();
  socket.emit('block question');
});

reset.addEventListener("click", function(e) {
  e.preventDefault();
  socket.emit('reset');
});

socket.on('vote update', function(questions){
  console.log("questions updated");
  populateQuestions(questions);
});

socket.on('question update', function(question){
  document.getElementById('curr-question').innerHTML = question;
});

function populateQuestions(questions) {
  var q = document.getElementById("questions");
  q.innerHTML = "";
  q.appendChild(questions.reduce(function(frag, opts) {
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode(opts.question));
    frag.appendChild(title);
    frag.appendChild(opts.options.reduce(function(ul, opt) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(opt.option + " : " + opt.votes));
      ul.appendChild(li);
      return ul;
    }, document.createElement("ul")));
    return frag;
  }, document.createDocumentFragment()));
}

populateQuestions(questions);
