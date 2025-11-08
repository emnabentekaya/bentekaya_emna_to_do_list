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
    this.parentElement.remove();
    
    //sauvegarder la suppression
    //saveTasks(); 
  }
}
//cocher une tache
let list = document.querySelector('ul');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
    //pour que le filtre et le tri soient appliqués immediatement 
    filterTasks(); 
    sortTasks();
    //sauvegarder le changement
    //saveTasks(); 
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
  //pour que le filtre et le tri soient appliqués immediatement
  filterTasks();
  sortTasks();
  //sauvegarder l'ajout
  //saveTasks(); 
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
  let sortSelect = document.getElementById('sort');
  let sortValue = sortSelect.value;
  let list = document.getElementById('mylist');
  let items = Array.from(list.getElementsByTagName('li'));
  
  if (sortValue === "none") {
    return;
  }
  else if (sortValue === "checked-first") {
    //si a est coché et b ne l'est pas, a vient avant b
    items.sort((a, b) => {
      if (a.classList.contains('checked') && !b.classList.contains('checked')) return -1;
      if (!a.classList.contains('checked') && b.classList.contains('checked')) return 1;
      return 0;
    });
  } else if (sortValue === "unchecked-first") {
    //si a n'est pas coché et b l'est, a vient avant b
    items.sort((a, b) => {
      if (!a.classList.contains('checked') && b.classList.contains('checked')) return -1;
      if (a.classList.contains('checked') && !b.classList.contains('checked')) return 1;
      return 0;
    });
  }
  list.innerHTML = "";
  items.forEach(li => list.appendChild(li));
}
