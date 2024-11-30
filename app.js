let toDoList = document.getElementById("to-do-list");
let addTask = document.getElementById("add-task");
let submitButton = document.getElementById("submit-button");
let taskContainer = document.getElementById("tasks-container");

// Load tasks from local storage on page load
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ taskText, dayCounter }) => {
    createTask(taskText, dayCounter);
  });
};

// Function to create a new task
function createTask(taskText, dayCounterValue = "") {
  let newTask = document.createElement("article");
  let deleteButton = document.createElement("article");
  let taskdayCounter = document.createElement("form");

  newTask.innerHTML = taskText;
  newTask.classList.add("new-task-class");
  taskContainer.append(newTask);

  taskdayCounter.classList.add("day-counter-class");

  // Create a label
  let label = document.createElement("label");
  label.innerText = "Day:";
  label.setAttribute("for", "day-counter");

  // Create an input field
  let input = document.createElement("input");
  input.type = "number";
  input.id = "day-counter";
  input.name = "day-counter";
  input.min = "0";
  input.max = "365";
  input.value = dayCounterValue; // Set initial value from storage or default

  // Append the label and input to the form
  taskdayCounter.appendChild(label);
  taskdayCounter.appendChild(input);

  // Append the form to the new task
  newTask.append(taskdayCounter);

  deleteButton.classList.add("delete-button-class");
  deleteButton.innerText = "x";
  newTask.append(deleteButton);

  // Event listener to update day-counter in local storage when input changes
  input.addEventListener("change", function () {
    updateDayCounterInLocalStorage(taskText, input.value);
  });

  
  

  let mouseIsDown = false;
  let idTimeout;
  
  newTask.addEventListener('touchstart', function() {
    mouseIsDown = true;
    idTimeout = setTimeout(function() {
      if(mouseIsDown) {
        if (confirm("Do you want to delete the task?") == true) {
          newTask.remove();
          deleteButton.remove();
          removeFromLocalStorage(taskText);
        } else {
          return
        }
  
      }
    }, 700);
  });
  
  window.addEventListener('mouseup', function() {
    clearTimeout(idTimeout);
    mouseIsDown = false;
  });





  
  // Delete button functionality
  deleteButton.addEventListener("click", function () {
    let text;
        if (confirm("Are you sure you want to delete the task?") == true) {
          newTask.remove();
          deleteButton.remove();
          removeFromLocalStorage(taskText);
        } else {
          text = "You canceled!";
        }
  });
}

// Add a new task on submit button click
submitButton.addEventListener("click", function () {
  if (addTask.value) {
    createTask(addTask.value);
    saveToLocalStorage(addTask.value);
    addTask.value = ""; // Clear the input field
  }
});

// Add a new task when Enter is pressed
addTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});

// Save task to local storage
function saveToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ taskText, dayCounter: "" }); // Initialize dayCounter as empty
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update day-counter in local storage
function updateDayCounterInLocalStorage(taskText, dayCounter) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.taskText === taskText ? { ...task, dayCounter } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from local storage
function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.taskText !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

