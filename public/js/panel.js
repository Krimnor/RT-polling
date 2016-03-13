var socket = io();

var next = document.getElementById("next-btn");
next.addEventListener("click", function(e) {
  e.preventDefault();

  xhr.open("GET", "panel/next");
  xhr.addEventListener("load", reqListener);
  xhr.send();

  function reqListener () {
    console.log(this.responseText);
  }
});

