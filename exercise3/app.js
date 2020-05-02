var container = document.querySelector("#app");
var taskList = document.createElement("ul");
var input = document.createElement("input");
var findButton = document.createElement("button");

var repos = [];
input.name = "user";
findButton.appendChild(document.createTextNode("Find"));

findButton.onclick = findRepos;

container.appendChild(taskList);
container.appendChild(input);
container.appendChild(findButton);



function findRepos() {
    taskList.innerHTML = "";
    var user = document.querySelector("input[name=user]").value;
    addItem("Loading...");
    githubCall(user)
        .then(function (response) {
            taskList.innerHTML = "";
            if (response.length === 0) {
                addItem("No repos available.");
                return;
            } else {
                for (repo of response) {
                    addItem(repo.full_name);
                }
            }
            
        })
        .catch(function (error) {
            taskList.innerHTML = "";
            addItem(error);
        });
        
}


function addItem(text) {
    var taskItem = document.createElement("li");
    taskItem.innerText = text;
    taskList.appendChild(taskItem);
}

function githubCall(user) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.github.com/users/"+user+"/repos")
        xhr.send(null);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (xhr.status === 404) {
                    reject("User does not exist.");
                } else {
                    reject("Not able to Fetch ropos in github");
                }
            }
        };

    });

}