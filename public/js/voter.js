/*
  JS for voting module
*/

var xhr = new XMLHttpRequest();

document.body.addEventListener("click", function(e) {
  if(e.target.nodeName == "DIV") {
    var id = document.getElementById("id").value;
    sendVote(id, e.target.className);
  }
});

function sendVote(id, choice) {
  xhr.open("GET", "vote/" + id + "/" + choice);
  xhr.addEventListener("load", reqListener);
  xhr.send();

  function reqListener () {
    console.log(this.responseText);
  }
}
