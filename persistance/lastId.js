function getLastId() {
  let id = localStorage.getItem("id");
  if (!id) {
    id = 0;
  } else {
    id = Number(id) + 1;
  }
  localStorage.setItem("id", id);
  return id;
}
