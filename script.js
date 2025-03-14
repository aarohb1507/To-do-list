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
  }
}
function deleteAllTasks(){
  console.log("test");
}

function displayTasks(){
  todoList.innerHTML="";
  todo.forEach((item, index) => { // Changed todo.array to todo
    const p = document.createElement("p");
    p.innerHTML=`
      <div class='todo-container'>
        <input type='checkbox' class="todo-checkbox"
        id="input-${index}" ${item.disabled? "checked":""}
        >
        <p id="todo-${index}" class="${item.disabled? "disabled": ""}"
        onclick="editTask(${index})">
          ${item.text}
        </p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change",()=>{
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
}

function saveToLocalStorage(){
  localStorage.setItem("todo",JSON.stringify(todo));
}