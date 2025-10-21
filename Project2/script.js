let tasks = [];
const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
taskForm.onsubmit = function (event) {
    event.preventDefault();

    const title = document.querySelector("#taskTitle").value.trim();
    const priority = document.querySelector("#taskPriority").value;
    const status = document.querySelector('input[name="taskStatus"]:checked').value;

    if (title === "") return;

    const task = {
        id: Date.now(),
        title: title,
        priority: priority,
        status: status
    };

    tasks.push(task);
    addTaskToDOM(task);

    taskForm.reset();
    document.querySelector("#pending").checked = true;
};

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    if (task.priority === "Low") {
        li.classList.add("low-priority");
    } else if (task.priority === "Medium") {
        li.classList.add("medium-priority");
    } else if (task.priority === "High") {
        li.classList.add("high-priority");
    }
    
    const text = document.createElement("span");
    text.textContent = `${task.title} - [${task.priority}] - (${task.status})`;
    if (task.status === "Completed") {
        text.classList.add("completed");
    }

    const buttons = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Complete";
    completeButton.className = "btn btn-sm btn-success me-2";
    completeButton.onclick = function () {
        markAsComplete(task.id);
    };

    if (task.status === "Completed") {
        completeButton.disabled = true;
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-sm btn-danger";
    removeButton.onclick = function () {
        removeTask(task.id);
    };
    buttons.appendChild(completeButton);
    buttons.appendChild(removeButton);

    li.appendChild(text);
    li.appendChild(buttons);

    taskList.appendChild(li);
}

function markAsComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (task.status === "Completed") return;
    task.status = "Completed";

    const li = document.querySelector(`li[data-id='${id}']`);
    if (!li) return;

    const textSpan = li.querySelector("span");
    if (!textSpan) return;

    textSpan.classList.add("completed");
    textSpan.textContent = `${task.title} - [${task.priority}] - (Completed)`;

    const completeBtn = li.querySelector("button.btn-success");
    if (completeBtn) completeBtn.disabled = true;
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    const li = document.querySelector(`li[data-id='${id}']`);
    if (li) li.remove();
}
