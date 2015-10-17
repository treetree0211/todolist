// Problem: user interaction doesn't provide desired results
// Solution: add interacitvity so the user can manage daily tasks
// Teamtree house, course matierial

// add a new task
// id do not need to put #
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");// incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New Task List Item
var createNewTaskEvent = function(taskString) {
    var listItem = document.createElement("li");
    // input (checkbox)
    var checkbox = document.createElement("input");
    // label
    var label = document.createElement("label");
    // input (text
    var editInput = document.createElement("input");
    // button.edit
    var editButton = document.createElement("button");
    // button.delete
    var deleteButton = document.createElement("button");
    // each elements needs modifying
    checkbox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;
    //need modified and appended
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function() {
    console.log("addtask");
    // when the button is pressed
    // create a new list item with the text from task
    var listItem = createNewTaskEvent(taskInput.value);
    // Append listItem to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

// edit an existing task
var editTask = function() {
    console.log("edit task");
    // when the edit button is pressed
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");
    // if the class of the parent is .editMode
    if(containsClass) {
    // switch from .editmode
    // label text become the input's value
        label.innerText = editInput.value;
// else
    } else {
        // switch to editMode
        // input value becomes the label's text
        editInput.value = label.innerText;
    }
   //Toggle .editMode on the parent
   listItem.classList.toggle("editMode");
}

var deleteTask = function() {
    console.log("delete task");
    // delete an existing task
    // When the Delete button is pressed
    // Remove the parent list from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
};
// mark a task as complete
var taskCompleted = function(){
    console.log("complete task");
    // When the checkbox is checked

    // Append the task list item to the #completed-task
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskinComplete);
};

// mark a task as incomplete
var taskinComplete = function() {
    console.log("in complete task");
    //When the checkbox is unchecksed
    // Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list");
    //select it's children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button

    editButton.onclick = editTask;
    // bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // bind task taskCompleted to checkbox
    checkbox.onchange = checkBoxEventHandler;

}

// Set the click handler to the addTask function
addButton.onclick = addTask;

// Cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// Cycle over completeTaskHolder ul list items
    // for each list item
for(var i = 0; i < completedTasksHolder.children.length; i++) {
        //bind events to list item's children(taskInCompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskinComplete);
}










