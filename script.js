//LocalStorage
window.onload = function() {
    loadTasks();
};

//sauvegarder les taches dans le local storage
function saveTasks() {
    let items = document.querySelectorAll('#mylist li');
    let tasks = [];
    //création d'un tableau d'objets (texte,classe de la tache)
    items.forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//charger les taches de local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let list = document.getElementById('mylist');
    list.innerHTML = "" 
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.text;
        if(task.checked) {
        li.classList.add('checked');
}
         else
         {
           li.classList.add('unchecked');
}
        //mettre une croix a la fin de la tache
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        list.appendChild(li);
    });

    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    this.parentElement.remove();
}}}



//supprimer une tache
let Nodelist = document.getElementsByTagName("LI");
//mettre une croix a la fin de chaque tache
for (let i = 0; i < Nodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  Nodelist[i].appendChild(span);
}
let close = document.getElementsByClassName("close");
//supprimer le parent de la croix (la tache)
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    this.parentElement.remove();
    
    //sauvegarder la suppression
    saveTasks(); 
  }
}

//cocher une tache
let list = document.querySelector('ul');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    //pour verifier que chaque tache a une seule classe
    if(event.target.classList.contains('checked')) {
        event.target.classList.remove('checked');
        event.target.classList.add('unchecked');
    } else {
        event.target.classList.remove('unchecked');
        event.target.classList.add('checked');
    }
    //pour que le filtre et le tri soient appliqués immediatement 
    filterTasks(); 
    sortTasks();
    //sauvegarder le changement 
    saveTasks(); 
  }}, false);

//ajout d'une nouvelle tache
function addTask(event) {
   event.preventDefault();
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
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    this.parentElement.remove();
    
    }
  }
  //pour que le filtre et le tri soient appliqués immediatement
  filterTasks();
  sortTasks();
  //sauvegarder l'ajout
  saveTasks(); 
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
