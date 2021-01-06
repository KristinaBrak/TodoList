const todoInput = document.getElementById("text");
const addButton = document.getElementById("add");
const todoDate = document.getElementById("date");
let todoList = document.getElementById("todo-list");

if (addButton) {
  addButton.addEventListener("click", addTodo);
}
window.addEventListener("storage", renderTodoList);

window.dispatchEvent(storageEvent);

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
    sortedList.forEach(addTodoToDOM);
  }
}

function addTodoToDOM({ id, description, deadline, dateCompleted }) {
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
  checkbox.addEventListener("change", (event) =>
    toggleTodo(event.target.checked, Number(newTodo.id))
  );
  newTodo.appendChild(checkbox);

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("todo-description");
  descriptionElement.innerText = description;
  newTodo.appendChild(descriptionElement);

  const deadlineElement = document.createElement("p");
  deadlineElement.classList.add("todo-deadline");
  deadlineElement.innerText = dateCompleted
    ? "Completed"
    : getDeadline(deadline);
  newTodo.appendChild(deadlineElement);

  const removeButton = document.createElement("button");
  removeButton.classList.add("todo-remove");
  removeButton.innerText = "x";
  removeButton.addEventListener("click", () => remove(Number(newTodo.id)));
  newTodo.appendChild(removeButton);

  todoList.appendChild(newTodo);
}

function remove(id) {
  if (window.confirm("Delete this item?")) {
    removeTodo(id);
  }
}

function removeTodo(id) {
  const list = getTodoList();
  const updatedList = list.filter((item) => item.id !== id);
  saveTodoList(updatedList);
}

function toggleTodo(checked, id) {
  const dateCompleted = new Date().toISOString();

  const list = getTodoList();
  const updatedList = list.map((item) =>
    item.id === id
      ? { ...item, dateCompleted: checked ? dateCompleted : null }
      : item
  );

  saveTodoList(updatedList);
}

function sortList(list) {
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
