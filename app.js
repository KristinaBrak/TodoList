//Selectors
const todoInput = document.getElementById("text");
const addButton = document.getElementById("add");
const todoDate = document.getElementById("date");
let todoList = document.getElementById("todo-list");

//Event listeners
if (addButton) {
  addButton.addEventListener("click", addTodo);
}
window.addEventListener("storage", renderTodoList);

window.dispatchEvent(storageEvent);

//Functions
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.length < 1 || todoInput.value.length > SYMBOL_LIMIT) {
    return;
  }

  const id = getLastId();
  const description = todoInput.value;
  const todo = {
    id,
    description,
    deadline: todoDate.value,
    completed: null,
  };
  saveTodo(todo);
  todoInput.value = "";
}

function renderTodoList() {
  todoList.innerHTML = "";
  const list = getTodoList();
  if (list) {
    list.forEach(displayTodo);
  }
}

function displayTodo({ id, description, deadline, completed }) {
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("key", `todo-${id}`);
  newTodo.setAttribute("id", id);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = completed ? true : false;
  checkbox.addEventListener("click", checkTodo);
  newTodo.appendChild(checkbox);

  const descr = document.createElement("p");
  descr.classList.add("todo-description");
  descr.innerText = description;
  newTodo.appendChild(descr);

  const timeLeft = document.createElement("p");
  timeLeft.classList.add("todo-time-left");
  timeLeft.innerText = getTimeLeft(deadline);
  newTodo.appendChild(timeLeft);

  const removeButton = document.createElement("button");
  removeButton.classList.add("todo-remove");
  removeButton.innerText = "x";
  removeButton.addEventListener("click", remove);
  newTodo.appendChild(removeButton);

  todoList.appendChild(newTodo);
}

function remove(event) {
  if (window.confirm("Delete this item?")) {
    removeTodo(event);
  }
}

function removeTodo(event) {
  const removeButton = event.target;
  const todo = removeButton.parentElement;
  const id = Number(todo.getAttribute("id"));
  const list = getTodoList();
  const updatedList = list.filter((item) => item.id !== id);
  saveTodoList(updatedList);
}

function checkTodo(event) {
  const checkbox = event.target;
  const todo = checkbox.parentElement;
  const id = Number(todo.getAttribute("id"));
  const list = getTodoList();

  const date = new Date();
  const dateCompleted =
    String(date.getFullYear()) +
    "/" +
    String(date.getMonth() + 1) +
    "/" +
    String(date.getDate()) +
    "/" +
    String(date.getHours()) +
    ":" +
    String(date.getMinutes());

  const updatedList = list.map((item) => {
    function getCompletedValue() {}
    if (item.id === id) {
      return;
    }
  });
  saveTodoList(updatedList);
}
