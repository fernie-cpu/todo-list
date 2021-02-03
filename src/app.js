const listsContainer = document.querySelector('[data-list]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_ID_KEY = 'task.selectedListId';
const deleteListBtn = document.querySelector('.delete-selected');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const taskContainer = document.querySelector('[data-tasks]');
const newTaskForm = document.querySelector('.modal-content');
const nameInput = document.querySelector('[data-task-input]');
const dateInput = document.querySelector('#date-input');
const priorityInput = document.querySelector('#priority');
const taskTemplate = document.querySelector('#task-template');
const deleteTaskBtn = document.querySelector('[data-delete-task]')

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_ID_KEY);

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

taskContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
    }
})

newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName == '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
})

deleteTaskBtn.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
})

deleteListBtn.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const task = createTask();
    nameInput.value = null;

    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    
    saveAndRender();
})

//local storage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_ID_KEY, selectedListId);
}

function saveAndRender() {
    save();
    render();
}

function createList(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    };
}

function createTask() {
    return {
        id: Date.now().toString(),
        name: nameInput.value,
        date: dateInput.value,
        priority: priorityInput.value,
        complete: false
    }
}

function render() {
    clearElement(listsContainer)
    renderLists()
  
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
      listDisplayContainer.style.display = 'none'
    } else {
      listDisplayContainer.style.display = ''
      listTitleElement.innerText = selectedList.name
      clearElement(tasksContainer)
      renderTasks(selectedList)
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = checkbox.complete;

        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name, ', ', task.date, ', ', task.priority);
        taskContainer.appendChild(taskElement);
    })
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();

export {render}