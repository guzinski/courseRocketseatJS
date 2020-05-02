var container = document.querySelector("#app");
var input = document.createElement("input");
var verifyButton = document.createElement("button");
input.name = "age";
input.type = "number";
verifyButton.appendChild(document.createTextNode("Verify Age"));

verifyButton.onclick = buttonClicked;
container.appendChild(input);
container.appendChild(verifyButton);


function verifyAge(age) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (age >= 18) {
                resolve();
            } else {
                reject();
            }
        }, 2000);
    });
    
}


function buttonClicked() {
    var age = document.querySelector("input[name=age]").value;
    verifyAge(age)
        .then(function() {
            console.log("Maior que 18");
        })
        .catch(function() {
            console.log("Menor que 18");
        });
}


