// Select elements
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("tasks");
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTasks();

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Prevent duplicate tasks
    const duplicate = tasks.some(task => task.title.toLowerCase() === title.toLowerCase());
    if (duplicate) {
        alert("Task with this title already exists!");
        return;
    }

    const newTask = { title, description, completed: false }; // Add completed property
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskTitle.value = "";
    taskDescription.value = "";
});

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed); // Apply 'completed' class if the task is marked done

        li.innerHTML = `
            <span class="task-text">
                <strong>${task.title}</strong><br>${task.description}
            </span>
            <div class="task-content">
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
                <button class="edit" onclick="editTask(${index})">&#9998;</button>
                <button class="delete" onclick="deleteTask(${index})">&times;</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle completed status
    saveTasks();
    displayTasks();
}

// Edit a task
function editTask(index) {
    const updatedTitle = prompt("Edit Task Title:", tasks[index].title);
    const updatedDescription = prompt("Edit Task Description:", tasks[index].description);

    if (updatedTitle && updatedDescription) {
        tasks[index].title = updatedTitle.trim();
        tasks[index].description = updatedDescription.trim();
        saveTasks();
        displayTasks();
    } else {
        alert("Both fields are required.");
    }
}

// Delete a task with confirmation
function deleteTask(index) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

// Theme toggle logic
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = 'Switch to Light Mode';
} else {
    body.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = 'Switch to Dark Mode';
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
});
