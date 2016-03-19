/*
  JS for voting module
*/
var socket = io();

document.body.addEventListener("click", function(e) {
  if(e.target.nodeName == "DIV") {
    var id = document.getElementById("id").value;
    socket.emit('vote', e.target.id);
    //sendVote(id, e.target.className);
  }
});

function sendVote(id, choice) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "vote/" + id + "/" + choice);
  xhr.addEventListener("load", reqListener);
  xhr.send();

  function reqListener () {
    console.log(this.responseText);
  }
}

socket.on('vote received', function(questions){
  document.getElementById("blocker").className = "";
});

socket.on('question update', function(questions){
  document.getElementById("blocker").className = "hidden";
});
