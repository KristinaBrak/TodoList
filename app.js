//Selectors
const todoInput = document.querySelector(".text");
const addButton = document.querySelector(".add");
const todoDate = document.querySelector(".date");
let todoList = document.querySelector(".todo-list");

let lastId = 0;

//Event listeners
if (addButton) {
  addButton.addEventListener("click", addTodo);
}
if (todoList) {
  todoList.addEventListener("click", deleteTodo);
}

const list = getTodoList();
if (list) {
  list.forEach(displayTodo);
}

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
    checked: false,
    description,
    deadline: todoDate.value,
  };
  saveTodo(todo);

  displayTodo(todo);

  todoInput.value = "";
}

function displayTodo({ id, checked, description, deadline }) {
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("key", `todo-${id}`);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = checked;
  newTodo.appendChild(checkbox);

  const descr = document.createElement("p");
  descr.classList.add("todo-description");
  descr.innerText = description;
  newTodo.appendChild(descr);

  const timeLeft = document.createElement("p");
  timeLeft.classList.add("todo-time-left");
  timeLeft.innerText = getTimeLeft(deadline);
  newTodo.appendChild(timeLeft);

  const remove = document.createElement("button");
  remove.classList.add("todo-remove");
  remove.innerText = "x";
  newTodo.appendChild(remove);
  remove.addEventListener("click", removeItem);

  todoList.appendChild(newTodo);
}

function getLastId() {
  lastId = lastId + 1;
  return lastId;
}

function getTimeLeft(deadline) {
  if (deadline === "") {
    return null;
  }
  const time = calculateTimeLeft(deadline);
  if (!time) {
    return null;
  }
  const timeLeft =
    String(time.days) +
    " days " +
    String(time.hours) +
    "h " +
    String(time.minutes) +
    "min";
  return timeLeft;
}

function calculateTimeLeft(deadline) {
  const date = new Date(deadline);
  const currentDate = new Date();
  const timeInMin = (date.getTime() - currentDate.getTime()) / 1000 / 60;
  if (timeInMin < 0) {
    return null;
  }
  const days = Math.floor(timeInMin / 60 / 24);
  const hours = Math.floor(timeInMin / 60 - days * 24);
  const minutes = Math.floor(timeInMin - days * 60 * 24 - hours * 60);

  return { days, hours, minutes };
}

function saveTodo(todo) {
  const list = sessionStorage.getItem("todoList");
  let todoList = JSON.parse(list);
  console.log("todoList", todoList);
  if (!todoList) {
    todoList = [];
  }
  console.log("created todoList", todoList);
  todoList.push(todo);
  console.log("updated todoList", todoList);
  sessionStorage.setItem("todoList", JSON.stringify(todoList));
}

function getTodoList() {
  const list = sessionStorage.getItem("todoList");
  if (list === "") {
    return null;
  }
  return JSON.parse(list);
}

function deleteTodo(event) {
  const item = event.target;
  if (item.classList[0] === "todo-remove") {
    const todo = item.parentElement;
    console.log(item);
    todo.remove();
  }
  // const list = getTodoList();
  // const updatedList = list.filter((todo) =>
  //   todo.key === item.parentElement.key ? null : todo
  // );
  // sessionStorage.setItem("todoList", JSON.stringify(updatedList));
}
