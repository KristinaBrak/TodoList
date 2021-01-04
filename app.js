//Selectors
const todoInput = document.querySelector(".text");
const addButton = document.querySelector(".add");
const todoDate = document.querySelector(".date");
const todoList = document.querySelector(".todo-list");

let lastId = 0;

//Event listeners
if (addButton) {
  addButton.addEventListener("click", addTodo);
}
//Functions

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value.length < 1 || todoInput.value.length > 160) {
    return;
  }

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  const id = getLastId();
  newTodo.setAttribute("id", String(id));

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  newTodo.appendChild(checkbox);

  const description = document.createElement("p");
  description.classList.add("todo-description");
  description.innerText = todoInput.value;
  newTodo.appendChild(description);

  const timeLeft = document.createElement("p");
  timeLeft.classList.add("todo-time-left");
  timeLeft.innerText = getTimeLeft();
  newTodo.appendChild(timeLeft);

  const remove = document.createElement("button");
  remove.classList.add("todo-remove");
  remove.innerText = "x";
  newTodo.appendChild(remove);

  todoList.appendChild(newTodo);
  //TODO save to sessionStorage
}

function getLastId() {
  lastId = lastId + 1;
  return lastId;
}

function getTimeLeft() {
  if (todoDate.value === "") {
    return null;
  }
  const time = calculateTimeLeft(todoDate.value);
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

function calculateTimeLeft(targetDate) {
  const date = new Date(targetDate);
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
