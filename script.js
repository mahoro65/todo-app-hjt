// script.js
document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
});

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var ul = document.getElementById("taskList");
  ul.innerHTML = "";
  tasks.forEach(function(task, index) {
    var li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    li.onclick = function() {
      toggleTaskCompletion(this, index);
    };
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function(event) {
      event.stopPropagation();
      editTask(index);
    };
    li.appendChild(editButton);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function(event) {
      event.stopPropagation();
      deleteTask(index);
    };
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function addTask() {
  var input = document.getElementById("taskInput");
  var taskText = input.value.trim();
  if (taskText !== "") {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }
}

function toggleTaskCompletion(li, index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
