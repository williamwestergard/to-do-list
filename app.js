let toDoList = document.getElementById("to-do-list");
let addTask = document.getElementById("add-task");
let submitButton = document.getElementById("submit-button");
let taskContainer = document.getElementById("tasks-container");


// Enter Click //
addTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});

// Submit button click //
submitButton.addEventListener("click", function () {
  let newTask = document.createElement("article");
  let deleteButton = document.createElement("article");

  if (addTask.value) {
    newTask.innerHTML = addTask.value;
    newTask.classList.add("new-task-class");
    taskContainer.append(newTask);
    newTask.append(deleteButton);
    deleteButton.classList.add("delete-button-class");
    deleteButton.innerText = "x";
  }

  // Prevents submit button to work if input value is empty //
  addTask.value = "";

  // Delete button //
  deleteButton.addEventListener("click", function () {
    newTask.remove();
    deleteButton.remove();
  });
});


