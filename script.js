const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount"); const searchInput = document.getElementById("searchInput"); const taskPriority = document.getElementById("taskPriority"); const sortPriority = document.getElementById("sortPriority");                                                    

// Load saved tasks from the browser
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = ""; let sortedTasks = [...tasks];

const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
};

const sortPriority = document.getElementById("sortPriority");



if (sortPriority && sortPriority.value !== "default") {
    const selectedPriority = sortPriority.value;

    sortedTasks.sort(function(a, b) {
        const aPriority = a.priority || "Medium";
        const bPriority = b.priority || "Medium";

        if (aPriority === selectedPriority && bPriority !== selectedPriority) {
            return -1;
        }

        if (bPriority === selectedPriority && aPriority !== selectedPriority) {
            return 1;
        }

        return priorityOrder[aPriority] - priorityOrder[bPriority];
    });
}

    sortedTasks.forEach(function(task) {
    const index = tasks.indexOf(task); if (!task.text.toLowerCase().includes(searchInput.value.toLowerCase())) {
    return;
}
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text; const priorityLabel = document.createElement("small");
priorityLabel.textContent = "Priority: " + (task.priority || "Medium");
priorityLabel.className = "priority-" + (task.priority || "Medium").toLowerCase();

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span); li.appendChild(priorityLabel);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Update remaining task count
    const remaining = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remaining + " tasks remaining"; const total = tasks.length;

const completed = tasks.filter(function(task) {
    return task.completed;
}).length;

const pending = total - completed;

document.getElementById("totalTasks").textContent = total;
document.getElementById("completedTasks").textContent = completed;
document.getElementById("pendingTasks").textContent = pending;
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
    text: text,
    completed: false,
    priority: taskPriority.value
});

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Show saved tasks when the app opens
displayTasks(); searchInput.addEventListener("input", displayTasks); sortPriority.addEventListener("change", displayTasks);