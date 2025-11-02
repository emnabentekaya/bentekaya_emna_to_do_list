//supprimer une tache
let Nodelist = document.getElementsByTagName("LI");
for (let i = 0; i < Nodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  Nodelist[i].appendChild(span);
}
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}
//cocher une tache
let list = document.querySelector('ul');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
}, false);

//ajout d'une nouvelle tache
function addtask() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("new_task").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Vous n'avez rien écris");
  } else {
    document.getElementById("mylist").appendChild(li);
  }
  document.getElementById("new_task").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

