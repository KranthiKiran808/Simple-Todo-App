function getFromLocalStorage() {
    let storageFromLS = localStorage.getItem("todoList");

    let parsedLocalStorage = JSON.parse(storageFromLS);
    if (parsedLocalStorage === null) {
        return [];
    } else {
        return parsedLocalStorage
    }


}
let todoList = getFromLocalStorage();

let saveBtnEl = document.getElementById("saveBtn");
saveBtnEl.onclick = function() {

    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList)
}
let todoUserInputEl = document.getElementById("todoUserInput");
let addBtn = document.getElementById("addBtn");

addBtn.onclick = function() {

    if (todoUserInputEl.value === "") {
        alert("Enter a valid value");
        return;
    } else {


        let todoCount = todoList.length;
        let newTodo = {
            text: todoUserInputEl.value,
            id: todoCount + 1,
            ischecked: false
        }
        todoList.push(newTodo);
        createAndAppend(newTodo);
        todoUserInputEl.value = ""
    }
}



let todoItemsContainerEl = document.getElementById("todoItemsContainer");

function onStatusChange(checkboxId, labelId, todoId) {
    let checkboxEle = document.getElementById(checkboxId);
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked")

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.id;
        console.log(eachTodoId)

        console.log(todoId)
        if (todoId === eachTodoId) {
            return true;
        } else {
            return false;
        }
    });
    console.log(todoObjectIndex)
    let todoObject = todoList[todoObjectIndex];
    console.log(todoObject)
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }

    // onther way of giving "checked"

    /* if(checkboxEle.checked){
         labelEle.classList.add("checked")
     }
     else{
         labelEle.classList.remove("checked")
     }*/

}

function onDeleteTodo(todoId) {
    let todoItem = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoItem);

    let todoIndex = todoList.findIndex(function(each) {
        let eachId = "todo" + each.id
        if (eachId === todoId) {
            return true;
        } else {
            return false;
        }
    })

    todoList.splice(todoIndex, 1);
}

function createAndAppend(todo) {

    let checkboxId = "checkbox" + todo.id;
    let labelId = "label" + todo.id;
    let todoId = "todo" + todo.id;
    let listContainer = document.createElement("li");
    listContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    listContainer.id = todoId;
    todoItemsContainerEl.appendChild(listContainer);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.ischecked;

    inputEl.classList.add("checkbox-input");

    inputEl.onclick = function() {
        onStatusChange(checkboxId, labelId, todoId);

    }


    listContainer.appendChild(inputEl);


    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listContainer.appendChild(labelContainer);


    let labelEl = document.createElement("label");
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    labelEl.setAttribute("for", checkboxId);

    if (todo.ischecked === true) {
        labelEl.classList.add("checked")
    } else {
        labelEl.classList.remove("checked")
    }

    labelEl.classList.add("checkbox-label");
    labelContainer.appendChild(labelEl);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let eachTodo of todoList) {

    createAndAppend(eachTodo);
}

















/*



function getTodoListFromLocalStorage() {
    let stringifiedtodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedtodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }

}

let todoList = getTodoListFromLocalStorage();

let saveBtnEle = document.getElementById("saveBtn");
saveBtnEle.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todoItemsContainerElement = document.getElementById("todoItemsContainer");
let todoUserInputElement = document.getElementById("todoUserInput");

let addBtnElement = document.getElementById("addBtn");
addBtnElement.onclick = function() {

    if (todoUserInputElement.value === "") {
        alert("Enter a value");
        return;
    } else {
        let todoCount = todoList.length + 1;

        let newTodo = {
            text: todoUserInputElement.value, //20 line
            id: todoCount
        }
        todoList.push(newTodo);
        createAndAppendtodo(newTodo);
        todoUserInputElement.value = "";
    }
}


function onStatusTodo(checkboxId, labelId) {
    let checkEle = document.getElementById(checkboxId); // for accessing the checkbox and label we are using their ids
    let labelEle = document.getElementById(labelId);
    if (checkEle.checked) {
        labelEle.classList.add("checked");
    } else {
        labelEle.classList.remove("checked");
    }
}


function onDeleteTodo(todoId) {
    let todoItemElem = document.getElementById(todoId);
    todoItemsContainerElement.removeChild(todoItemElem);


    let itemIndex = todoList.findIndex(function(eachItem) {

        let eachItemId = "todo" + eachItem.id;

        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(itemIndex, 1)
}


function createAndAppendtodo(todo) {

    let checkboxId = "checkbox" + todo.id;
    let labelId = "label" + todo.id;
    let todoId = "todo" + todo.id;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row")
    todoElement.id = todoId;
    todoItemsContainerElement.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        onStatusTodo(checkboxId, labelId);
    }

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

}

for (let eachItem of todoList) {
    createAndAppendtodo(eachItem);
}*/