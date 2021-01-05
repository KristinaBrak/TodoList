function saveTodo(todo) {
  const list = sessionStorage.getItem("todoList");
  let todoList = JSON.parse(list);
  // console.log("todoList", todoList);
  if (!todoList) {
    todoList = [];
  }
  // console.log("created todoList", todoList);
  todoList.push(todo);
  // console.log("updated todoList", todoList);
  sessionStorage.setItem("todoList", JSON.stringify(todoList));
  window.dispatchEvent(eventStorage);
}

function getTodoList() {
  const list = sessionStorage.getItem("todoList");
  if (list === "") {
    return [];
  }
  return JSON.parse(list);
}

function removeTodoFromSessionStorage(id) {
  const list = getTodoList();
  const updatedList = list.filter((item) => (item.id === id ? null : item));
  sessionStorage.setItem("todoList", JSON.stringify(updatedList));
}

function saveTodoList(newList) {
  const list = JSON.stringify(newList);
  sessionStorage.setItem("todoList", list);
}
