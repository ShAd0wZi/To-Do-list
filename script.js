// Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Task List Initialization
let tasks = [];

document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskInput = document.getElementById("task-input").value;
    const dueDate = document.getElementById("due-date").value;
    if (taskInput) {
        const newTask = {
            id: Date.now(),
            name: taskInput,
            dueDate: dueDate,
            completed: false,
            subTasks: [],
            priority: 'normal',
        };
        tasks.push(newTask);
        renderTasks();
        document.getElementById("task-input").value = "";
        document.getElementById("due-date").value = "";
    }
});

function renderTasks() {
    const taskListElement = document.getElementById("tasks");
    const filter = document.getElementById("task-filter").value;
    taskListElement.innerHTML = "";

    tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
    }).forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <div>
                <input type="checkbox" id="task-${task.id}" ${task.completed ? "checked" : ""} onclick="toggleTaskCompletion(${task.id})">
                <span>${task.name} - Due: ${task.dueDate} - Priority: ${task.priority}</span>
            </div>
            <button onclick="addSubTask(${task.id})">Add Subtask</button>
            <ul id="subtask-${task.id}"></ul>
        `;
        taskListElement.appendChild(taskElement);

        // Render subtasks
        task.subTasks.forEach(subTask => {
            const subTaskElement = document.createElement("li");
            subTaskElement.innerHTML = `
                <input type="checkbox" ${subTask.completed ? "checked" : ""} onclick="toggleSubTaskCompletion(${task.id}, ${subTask.id})">
                ${subTask.name}
            `;
            document.getElementById(`subtask-${task.id}`).appendChild(subTaskElement);
        });
    });
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

function addSubTask(taskId) {
    const subTaskName = prompt("Enter subtask name:");
    if (subTaskName) {
        const task = tasks.find(t => t.id === taskId);
        const newSubTask = {
            id: Date.now(),
            name: subTaskName,
            completed: false
        };
        task.subTasks.push(newSubTask);
        renderTasks();
    }
}

function toggleSubTaskCompletion(taskId, subTaskId) {
    const task = tasks.find(t => t.id === taskId);
    const subTask = task.subTasks.find(st => st.id === subTaskId);
    subTask.completed = !subTask.completed;
    renderTasks();
}

// Filter Task List
document.getElementById("task-filter").addEventListener("change", renderTasks);

// Pomodoro Timer
let timer;
let isTimerRunning = false;
let timeLeft = 25 * 60; // 25 minutes

document.getElementById("start-timer").addEventListener("click", () => {
    if (isTimerRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(updateTimer, 1000);
    }
    isTimerRunning = !isTimerRunning;
});

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Pomodoro finished!");
        isTimerRunning = false;
    } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}

// Save Code Snippets
document.getElementById("save-snippet").addEventListener("click", () => {
    const code = document.getElementById("code-input").value;
    if (code) {
        alert("Code snippet saved!");
        document.getElementById("code-input").value = "";
    }
});

// GitHub Integration (Mock Implementation)
document.getElementById("fetch-github-issues").addEventListener("click", () => {
    const issues = [
        { title: "Fix login bug", description: "The login button does not work." },
        { title: "Add new feature", description: "Add dark mode option." },
    ];
    const githubIssuesList = document.getElementById("github-issues");
    githubIssuesList.innerHTML = "";
    issues.forEach(issue => {
        const issueItem = document.createElement("li");
        issueItem