let input = prompt("What would you like to do?");
let array = [];
while(input !== "quit") {
    if (input === "new") {
        addToDo();
    }
    else if (input === "delete") {
        deleteToDo();
    }
    else {
        listToDo();
    }
    input = prompt("What would you like to do?");
}

function addToDo() {
    input = prompt("Enter a new todo");
    array.push(input);
    console.log("Added todo");
}

function deleteToDo() {
    input = prompt("Index of item to be deleted");
    array.splice(input, 1);
    console.log("Item Deleted")
}

function listToDo() {
    array.forEach((element, i) => {
        console.log("**********");
        console.log(i + " " + element);
        console.log("**********");
    });
}