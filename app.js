var container = document.querySelector("#app");
var taskList = document.createElement("ul");
var input = document.createElement("input");
var addButton = document.createElement("button");

var tasks = JSON.parse(localStorage.getItem("taskList")) || [];

input.name = "newTask";
addButton.appendChild(document.createTextNode("Add"));

addButton.onclick = addTask;

container.appendChild(taskList);
container.appendChild(input);
container.appendChild(addButton);

renderTaskList();
saveToStorage();
function renderTaskList() {
    taskList.innerHTML = "";
    for (task of tasks) {
        var taskItem = document.createElement("li");
        var deleteLink = document.createElement("a");
        var taskIndex = tasks.indexOf(task);

        deleteLink.setAttribute("href", "#");
        deleteLink.appendChild(document.createTextNode("Delete"));
        deleteLink.setAttribute("onclick", "removeTask(" + taskIndex + ")");

        taskItem.appendChild(document.createTextNode(task));
        taskItem.appendChild(deleteLink);

        taskList.appendChild(taskItem);
    }
}


function addTask() {
    var newTask = document.getElementsByName("newTask")[0].value.trim();
    if (newTask !== undefined && newTask !== "") {
        document.getElementsByName("newTask")[0].value = "";
        tasks.push(newTask);
        renderTaskList();
        saveToStorage();
    }
}


function removeTask(taskIndex) {
    tasks.pop(taskIndex);
    renderTaskList();
    saveToStorage();
}

function saveToStorage() {
    var jsonTasks =  JSON.stringify(tasks);
    localStorage.setItem("taskList", jsonTasks);
}