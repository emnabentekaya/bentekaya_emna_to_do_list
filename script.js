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
    //pour que le filtre soit appliqué immediatement 
    filterTasks(); 
  }
}, false);

//ajout d'une nouvelle tache
function addTask() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("new_task").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Vous n'avez rien écris");
  } else {
    document.getElementById("mylist").appendChild(li);
    li.classList.add("unchecked");
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
  //pour que le filtre soit appliqué immediatement
  filterTasks();
}

//filtrer les taches
function filterTasks(){
  let select = document.querySelector('select');
  let value = select.value;
  let items = document.querySelectorAll('li');
  
  for (let li of items) {
    if (value === "all") {
      li.style.display = "list-item";
      //afficher les taches accomplies
    } else if (value === "checked") {
      if (li.classList.contains("checked")) {
        li.style.display = "list-item";
      } else {
        li.style.display = "none";
      }
      //afficher les taches non accomplies
    } else if (value === "unchecked") {
      if (!li.classList.contains("checked")) {
        li.style.display = "list-item";
      } else {
        li.style.display = "none";
      }
    }
  }
}
//trier les taches 
function sortTasks(){

}
