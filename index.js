var taskList = document.querySelector(".taskList");
var taskFeild = document.querySelector(".task-feild");
var addTaskButton = document.querySelector(".add-task");
var errorMessage = document.querySelector(".error-message");

var tasks = JSON.parse(localStorage.getItem("tasks")) ;

renderTasks();

function addTask() {
    var taskValue = taskFeild.value;
    if (taskValue === "") {
        errorMessage.innerText = "Please enter a task before adding";
    } else {
        tasks.push({ text: taskValue});
        saveTasks();
        taskFeild.value = "";
        errorMessage.innerText = "";
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        taskList.innerHTML += `
            <div class="list">
                <input type="checkbox" class="taskComplete ">
                <label class="felx-wrap">${task.text}</label>
                <button class="button buttonEdit">Edit</button>
                <button class="button buttonDelete" ">Delete</button>
            </div>
        `;
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//adding task
addTaskButton.addEventListener("click", addTask);
