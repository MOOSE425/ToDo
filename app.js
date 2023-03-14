let lists = [];
let currentList = [];

function setStorage() {
    if(JSON.parse(localStorage.getItem('lists')) !== null) {
        lists = JSON.parse(localStorage.getItem('lists'));
    } else {
        lists = []
    }
    if(JSON.parse(localStorage.getItem('currentList')) !== null) {
     currentList = JSON.parse(localStorage.getItem('currentList'));
    } else {
        currentList = []
    }
}


setStorage()
render()

function render() {
    if (lists[0]) {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li class="list-group-item" onclick='changeList(this.id)' id=${list.id}>${list.name}</li>`;
    });
   
    listsHtml += '</ul>';
    // print out the lists
   
    document.getElementById('lists-list').innerHTML = listsHtml;
    // print out the name of the current list
   
    document.getElementById('current-list').innerText = currentList.name;
    if (currentList.tasks[0]) {

    
    // iterate over the todos in the current list
   
    let todosHtml = '<ul class="list-group">';
    currentList.tasks.forEach((task) => {
        if (task.completed === false) {
      todosHtml += `<li class="list-group-item" id=${task.id}">
      <div class="todo">
      <div><input id=${task.id} class="task-item-check" type="checkbox" onclick='markCompleted(this.id)'>${task.name}</div>
      <i class="bi bi-trash" id=${task.id} onclick="removeTask(this.id)"></i>
  </div>`;
        } else {
            todosHtml += `<li class="list-group-item" id=${task.id}">
      <div class="todo">
      <div><input id=${task.id} class="task-item-check" type="checkbox" onclick=markCompleted(this.id) checked>${task.name}</div>
      <i class="bi bi-trash" id=${task.id} onclick="removeTask(this.id)"></i>
  </div>`;
        };
    });
    // print out the todos
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
} else {
    document.getElementById('current-list-todos').innerHTML = ''
}} else { 
        
    document.getElementById('lists-list').innerHTML = 
        `<div class='lists-list'id='lists-list'>
        <ul class="list-group">
        <li class="list-group-item">
             Sample... 
        </li>
        </ul>
        </div>`;

    
    document.getElementById('current-list').innerHTML = `<div id="current-list" class="current-list">Sample...</div>`;
    document.getElementById('current-list-todos').innerHTML = `<div class="list-group-item" id="current-list-todos">
    <ul class="list-group">
    <li class="list-group-item">
        <div class="todo">
            <div><input id="task-item-check" class='task-item-check' type='checkbox'>List your tasks...</div>
            <i class='bi bi-trash'></i>
        </div>
        

    </li>
    </ul>

    </div>`;
};

   }

function addList() {
    let name = document.getElementById('new-list-name').value;
    if(name) {
    let id = randomID();
    lists.push({
        id: id,
        name: name,
        tasks: []
    });
    currentList = lists[lists.length - 1];
    document.getElementById('new-list-name').value = '';
    render();
   }}

function addTask() {
    let task = document.getElementById('new-task-name').value;
    if(task) {
        let id = randomID();
        currentList.tasks.push({
            id: id,
            name: task,
            completed: false,  
        });
        document.getElementById('new-task-name').value=''
        render();
        save();
    }

}

function markCompleted(clickID) {
    let index = currentList.tasks.findIndex((elem) => elem.id === clickID);
    if (currentList.tasks[index].completed === false)  {
        currentList.tasks[index].completed = true
    } else {
        currentList.tasks[index].completed = false
    };
    render();
    save();
}

function removeCompleted() {
    
    currentList.tasks = currentList.tasks.filter((checked) => checked.completed === false);
    render();
    save();
}

function removeList() {
    lists.splice(lists.findIndex((elem) => elem.id === currentList.id), 1);
    currentList = lists[0];

    render();
    save();
}

function removeAll() {
    localStorage.removeItem('currentList', JSON.stringify(currentList)); 
    localStorage.removeItem('lists', JSON.stringify(lists));
    setStorage();
    render();
}

function removeTask(taskID) {
    currentList.tasks.splice(currentList.tasks.findIndex((elem) => elem.id === taskID), 1)
    render();
    save();
}

function changeList(listID) {
    currentList = lists[lists.findIndex((elem) => elem.id === listID)];
    render();
    save();
}

function randomID() {
    return Math.random().toString(36).slice(2);
   }

function save() {
    localStorage.setItem('currentList', JSON.stringify(currentList)); 
    localStorage.setItem('lists', JSON.stringify(lists));
   }