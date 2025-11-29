//LocalStorage
//pour executer loadTasks() après le chargement de la page
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
    if (!tasks) return;
    //parcourir le tableau tasks créé dans saveTasks()
    tasks.forEach(task => {
      let li = document.createElement('li');
      let taskText = document.createElement('span');
      taskText.className = 'task-text';
      taskText.textContent = task.text;
      li.appendChild(taskText);
      if (task.checked) {
        li.classList.add('checked');
      } else {
        li.classList.add('unchecked');
      }
      // ajout du bouton modifier
      let editButton = document.createElement("button");
      editButton.className = "edit";
      editButton.textContent = "Modifier ✎";
      li.appendChild(editButton);
      list.appendChild(li);

      // mettre une croix a la fin de la tache
      let span = document.createElement("span");
      span.className = "close";
      span.appendChild(document.createTextNode("\u00D7"));
      li.appendChild(span);

      
    });
    //ajouter des evenements aux boutons modifier et croix
    editTask_event();
    close_event();
}

// fonction pour supprimer une tache
function close_event(){
  let close = document.getElementsByClassName("close");
  // supprimer le parent de la croix (la tache)
  //ajouter cet evenement a chaque croix
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      this.parentElement.remove();
      // sauvegarder la suppression
      saveTasks();
    }
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
  //pour ne pas recharger la page
   event.preventDefault();
  let inputValue = document.getElementById("new_task").value;
  if (inputValue.trim() === '') {
    alert("Vous n'avez rien écris");
    return;}
  else {
  //création d'un nouvel élément de la liste
  let li = document.createElement("li");
  let taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = inputValue.trim();
  li.appendChild(taskText);
  document.getElementById("mylist").appendChild(li);
  li.classList.add("unchecked");

  //vider la barre de input
  document.getElementById("new_task").value = "";

  //ajout du bouton modifier
  let editButton=document.createElement("button");
  editButton.className="edit";
  editButton.textContent = "Modifier ✎";
  li.appendChild(editButton);
  editTask_event();

  //ajout une croix à la fin de la tache
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  close_event();

  //sauvegarder l'ajout
  saveTasks(); 
  //pour que le filtre et le tri soient appliqués immediatement
  filterTasks();
  sortTasks();
  }
}
  

function editTask(li) {
    let oldText=li.firstChild.textContent;
    let newText=prompt("Modifier la tache:",oldText);
    //verifier si ce n'est pas vide
    if(newText.trim()!==""){
      li.firstChild.textContent=newText.trim();
      saveTasks();
    }
}
//ajout des evenements a chaque bouton modifier de la liste
function editTask_event() {
let editButtons=document.getElementsByClassName("edit");
for(let i=0;i<editButtons.length;i++){
  editButtons[i].onclick=function(){
    //appliquer editTask au parent du bouton (la tache)
    editTask(this.parentElement);
  }
}}

//filtrer les taches
function filterTasks(){
  let select = document.getElementById('filter');
  if (!select) return;
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
