//Selectors
const todoInput = document.querySelector(".text");
const addButton = document.querySelector(".add");
const todoDate = document.querySelector(".date");
const todoList = document.querySelector(".todo-list");

//Event listeners
if (addButton) {
  addButton.addEventListener("click", addTodo);
}
//Functions

function addTodo(event) {
  event.preventDefault();

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  newTodo.appendChild(checkbox);

  const description = document.createElement("p");
  description.classList.add("todo-description");
  description.innerText = todoInput.value; //TODO check 160symbols
  newTodo.appendChild(description);

  const timeLeft = document.createElement("p");
  timeLeft.classList.add("todo-time-left");
  timeLeft.innerText = todoDate.value; //TODO calculate how much time left
  newTodo.appendChild(timeLeft);

  const remove = document.createElement("button");
  remove.classList.add("todo-remove");
  remove.innerText = "x";
  newTodo.appendChild(remove);

  todoList.appendChild(newTodo);
  //TODO save to sessionStorage
}
