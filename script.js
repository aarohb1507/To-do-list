// Retreive todo from local storage or intialize empty array
let todo=JSON.parse(localStorage.getItem("todo")) || [];

const todoInput=document.getElementById("todoInput");

const todoList=document.getElementById("todoList");

const todoCount=document.getElementById("todoCount");

const addButton= document.querySelector(".btn");

const deleteButton = document.getElementById("deleteButton");

//Initialize

document.addEventListener("DOMContentLoaded",
  function(){
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown",function(event){
      if(event.key === "Enter"){
        event.preventDefault();
        addTask();
      }
    });
    deleteButton.addEventListener("click",deleteAllTasks);
    displayTasks();
  }
);
function addTask(){
  const newTask = todoInput.value.trim();
  if(newTask!=""){
    todo.push({
      text:newTask,
      disabled:false
    });
    saveToLocalStorage();
    todoInput.value="";
    displayTasks(); // Ensure tasks are displayed after adding a new task
    animateTaskAddition();
  }
}
function deleteAllTasks(){
  todoList.classList.add("fade-out"); // Add fade-out animation
  setTimeout(() => {
    todo = [];
    saveToLocalStorage();
    displayTasks();
    todoList.classList.remove("fade-out");
  }, 500); // Match animation duration
}

function displayTasks(){
  todoList.innerHTML="";
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.index = index;

    const container = document.createElement("div");
    container.className = "todo-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = `input-${index}`;
    checkbox.checked = !!item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const textEl = document.createElement("p");
    textEl.id = `todo-${index}`;
    textEl.className = item.disabled ? "disabled" : "";
    textEl.textContent = item.text;
    textEl.tabIndex = 0;
    textEl.addEventListener("click", () => editTask(index));
    textEl.addEventListener("keydown", (e) => { if (e.key === "Enter") editTask(index); });

    container.appendChild(checkbox);
    container.appendChild(textEl);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-item";
    delBtn.setAttribute("aria-label", `Delete todo ${index}`);
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(container);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
  todoCount.textContent = todo.length;
}

function deleteTask(index){
  const li = todoList.querySelector(`li[data-index="${index}"]`);
  if(li){
    li.classList.add("fade-out");
    setTimeout(() => {
      todo.splice(index,1);
      saveToLocalStorage();
      displayTasks();
    }, 240);
  } else {
    // Fallback
    todo.splice(index,1);
    saveToLocalStorage();
    displayTasks();
  }
}
function editTask(index){
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  inputElement.className = "edit-input";
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
  inputElement.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      inputElement.blur();
    } else if (e.key === "Escape"){
      displayTasks();
    }
  });
}

 function toggleTask(index){
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
 }

function saveToLocalStorage(){
  localStorage.setItem("todo",JSON.stringify(todo));
}

function animateTaskAddition() {
  const lastTask = todoList.lastElementChild;
  if (lastTask) {
    lastTask.classList.add("slide-in");
    setTimeout(() => lastTask.classList.remove("slide-in"), 500); // Match animation duration
  }
}