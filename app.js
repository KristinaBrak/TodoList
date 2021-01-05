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
    dateCompleted: null,
  };
  saveTodo(todo);
  todoInput.value = "";
}

function renderTodoList() {
  todoList.innerHTML = "";
  const list = getTodoList();

  if (list) {
    const sortedList = sortList(list);
    sortedList.forEach(displayTodo);
  }
}

function displayTodo({ id, description, deadline, dateCompleted }) {
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  if (dateCompleted) {
    newTodo.classList.add("completed");
  }
  newTodo.setAttribute("id", id);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = dateCompleted ? true : false;
  checkbox.addEventListener("change", toggleTodo);
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

function toggleTodo(event) {
  console.log("Im in toggleTodo");
  const checkbox = event.target;
  const todo = checkbox.parentElement;
  const id = Number(todo.getAttribute("id"));
  const list = getTodoList();

  const date = new Date();
  const dateCompleted = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  const updatedList = list.map((item) => {
    return item.id === id
      ? { ...item, dateCompleted: checkbox.checked ? dateCompleted : null }
      : item;
  });
  console.log("updatedList", updatedList);

  saveTodoList(updatedList);
}

function sortList(list) {
  console.log(list);
  const uncompleted = list.filter((item) => item.dateCompleted === null);
  const list1 = uncompleted.sort((a, b) => {
    const first = a.deadline
      ? new Date(a.deadline).getTime()
      : Number.MAX_SAFE_INTEGER;
    const second = b.deadline
      ? new Date(b.deadline).getTime()
      : Number.MAX_SAFE_INTEGER;
    return first - second;
  });

  const completed = list.filter((item) => item.dateCompleted !== null);
  const list2 = completed.sort(
    (a, b) =>
      new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
  );
  return [...list1, ...list2];
}
