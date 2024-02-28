// Get references to HTML elements
const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

// Initialize tasks array; retrieve from localStorage if exists, otherwise initialize as an empty array
const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

// Display all tasks on page load
showAllTasks();

// Function to display all tasks
function showAllTasks() {
    tasks.forEach((value, index) => {
        // Create a task container div
        const div = document.createElement("div");
        div.setAttribute("class", "task");

        // Create an inner div for task details
        const innerDiv = document.createElement("div");
        div.append(innerDiv);

        // Create a paragraph element for task title
        const p = document.createElement("p");
        p.innerText = value.title;
        innerDiv.append(p);

        // Create a span element for task description
        const span = document.createElement("span");
        span.innerText = value.description;
        innerDiv.append(span);

        // Create a delete button for each task
        const btn = document.createElement("button");
        btn.setAttribute("class", "delete-btn");
        btn.innerText = "-";
        btn.addEventListener("click", () => {
            // Remove the task when the delete button is clicked
            removeTask();
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showAllTasks();
        });
        div.append(btn);

        // Append the task container to the main container
        container.append(div);
    });
}

// Function to remove tasks from the DOM
function removeTask() {
    tasks.forEach(() => {
        // Select the first task element and remove it
        const div = document.querySelector(".task");
        div.remove();
    });
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Remove existing tasks from the DOM
    removeTask();

    // Add a new task to the tasks array
    tasks.push({ title: title.value, description: description.value });

    // Store the updated tasks array in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display all tasks with the new task included
    showAllTasks();

    // Clear input fields after submitting the form
    title.value = "";
    description.value = "";
});
