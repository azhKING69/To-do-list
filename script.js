// Function to add a new task
function addTask() {
  // 1. Retrieve the input element and get the user-entered value.
  let taskInput = document.getElementById("task");
  let newTask = taskInput.value.trim(); // Remove extra spaces

  // 2. Only proceed if the input is not empty.
  if (newTask !== "") {
    // 3. Capitalize the first letter of the task.
    newTask = newTask.charAt(0).toUpperCase() + newTask.slice(1);

    // 4. Create a new task element (a div) and add appropriate classes.
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task", "new"); // "new" class triggers slide-in animation

    // 5. Set the inner HTML for the new task.
    taskDiv.innerHTML = `
      <div class="task-text">
        <i class="fa-solid fa-feather-pointed"></i>
        <p>${newTask}</p>
      </div>
      <div class="task-btn">
        <button class="done"><i class="fa-solid fa-square-check"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // 6. Append the new task element to the container.
    document.querySelector(".alltasks").appendChild(taskDiv);

    // 7. Clear the input field after adding the task.
    taskInput.value = "";
  }
}

// --- Event Listeners for Adding Tasks ---

// Add event listener for the "Add Task" button (click)
let btn = document.getElementById("btn");
btn.addEventListener("click", addTask);

// Add event listener for pressing the Enter key in the input field
let taskInput = document.getElementById("task");
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// --- Event Delegation for Task Actions (Done and Delete) ---

document.querySelector(".alltasks").addEventListener("click", function (e) {
  // Check if the Done button (or its icon) was clicked
  if (e.target.closest(".done")) {
    let taskElement = e.target.closest(".task");
    if (taskElement) {
      // Toggle the "completed" class to mark/unmark the task as done.
      taskElement.classList.toggle("completed");
    }
  }
  // Check if the Delete button (or its icon) was clicked
  else if (e.target.closest(".delete")) {
    let taskElement = e.target.closest(".task");
    if (taskElement) {
      // Add the "deleting" class to trigger the slide-out animation.
      taskElement.classList.add("deleting");

      // When the animation ends, remove the task element from the DOM.
      taskElement.addEventListener("animationend", function () {
        taskElement.remove();
      });
    }
  }
});
