const storageEvent = new Event("storage");

function setStorageItem(key, value) {
  const result = sortList(value);
  sessionStorage.setItem(key, JSON.stringify(result));
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

  setStorageItem(TODO_LIST, todoList);
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
  setStorageItem(TODO_LIST, updatedList);
}

function saveTodoList(newList) {
  setStorageItem(TODO_LIST, newList);
}

function sortList(list) {
  if (!list) {
    list = [];
  }
  console.log(list);
  const uncompleted = list.filter((item) => item.dateCompleted === null);
  const list1 = uncompleted.sort((a, b) => {
    console.log(a.deadline);
    console.log(b.deadline);
    return Number(b.deadline) - Number(a.deadline);
  });

  const completed = list.filter((item) => item.dateCompleted !== null);
  return [...list1, ...completed];
}
