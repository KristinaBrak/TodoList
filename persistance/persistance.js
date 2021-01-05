const storageEvent = new Event("storage");

function setStorageItem(key, value) {
  sessionStorage.setItem(key, value);
  window.dispatchEvent(storageEvent);
}

function saveTodo(todo) {
  const list = sessionStorage.getItem(TODO_LIST);
  let todoList = JSON.parse(list);
  // console.log("todoList", todoList);
  if (!todoList) {
    todoList = [];
  }
  // console.log("created todoList", todoList);
  todoList.push(todo);
  // console.log("updated todoList", todoList);
  setStorageItem(TODO_LIST, JSON.stringify(todoList));
}

function getTodoList() {
  const list = sessionStorage.getItem(TODO_LIST);
  if (list === "") {
    return [];
  }
  return JSON.parse(list);
}

function removeTodoFromSessionStorage(id) {
  const list = getTodoList();
  const updatedList = list.filter((item) => (item.id === id ? null : item));
  setStorageItem(TODO_LIST, JSON.stringify(updatedList));
}

function saveTodoList(newList) {
  const list = JSON.stringify(newList);
  setStorageItem(TODO_LIST, list);
}
