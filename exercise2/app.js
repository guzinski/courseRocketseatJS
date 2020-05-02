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
    githubCall(user)
        .then(function (response) {
            for (repo of response) {
                var taskItem = document.createElement("li");
                taskItem.innerText = repo.full_name;
                taskList.appendChild(taskItem);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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