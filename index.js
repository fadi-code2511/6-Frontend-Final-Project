var taskList = document.querySelector(".taskList");
var taskFeild = document.querySelector(".task-feild");
var addTaskButton = document.querySelector(".add-task");
var errorMessage = document.querySelector(".error-message");

var tasks = JSON.parse(localStorage.getItem("tasks")) ;

renderTasks();

function addTask() {
    var taskValue = taskFeild.value;
    if (taskValue == "") {
        errorMessage.innerText = "Please enter a task before adding";
    } else {
        tasks.push({ text: taskValue, completed: false });
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
        var checkedAttribute = "";
        var completedClass = "";

        if (task.completed) {
            checkedAttribute = "checked";       //if the task completed
            completedClass = "completed";       //if yes add class
        }

        taskList.innerHTML += `
            <div class="list">
                <input type="checkbox" class="taskComplete" ${checkedAttribute}>
                <label class="felx-wrap ${completedClass}">${task.text}</label>
                <button class="button buttonEdit">Edit</button>
                <button class="button buttonDelete">Delete</button>
            </div>
        `;
    }
}



function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//adding task
addTaskButton.addEventListener("click", addTask);


// Delete task
taskList.addEventListener("click", function(e) {
     
    if (e.target.classList.contains("buttonDelete")) {
        var taskDiv = e.target.parentElement; // the element we clicked on
        var taskText = taskDiv.querySelector("label").innerText; 
        
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].text == taskText) { 
                tasks.splice(i, 1); // at postion i delete one item.
                break;
            }
        }
        // refresh the local storage.
        saveTasks();
        // delete it from the web page.
        taskDiv.remove();
    }
});


//checked tasks
taskList.addEventListener("click", function(e){
    if(e.target.classList.contains("taskComplete")){
        var taskDiv = e.target.parentElement;
        var taskText = taskDiv.querySelector("label").innerText;

        for(var i=0; i<tasks.length; i++){
            if(tasks[i].text == taskText){
                tasks[i].completed = e.target.checked; // (checked) is a property to check if true or false
                break;
            }
        }

        saveTasks();
        renderTasks(); 
    }
});
