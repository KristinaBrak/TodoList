const storageEvent = new Event("storage");

function setStorageItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(storageEvent);
}

function saveTodoList(newList) {
  setStorageItem(TODO_LIST, newList);
}

function saveTodo(todo) {
  const list = sessionStorage.getItem(TODO_LIST);
  let todoList = JSON.parse(list);
  if (!todoList) {
    todoList = [];
  }
  todoList.push(todo);

  saveTodoList(todoList);
}

function getTodoList() {
  const list = sessionStorage.getItem(TODO_LIST);
  return list ? JSON.parse(list) : [];
}

function removeTodoFromSessionStorage(id) {
  const list = getTodoList();
  const updatedList = list.filter((item) => (item.id === id ? null : item));
  saveTodoList(updatedList);
}

function getLastId() {
  let id = sessionStorage.getItem("id");
  if (!id) {
    id = 0;
  } else {
    id = Number(id) + 1;
  }
  sessionStorage.setItem("id", id);
  return id;
}
