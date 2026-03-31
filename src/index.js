import './style.css';
import Todo from './todo'; // Make sure this is imported!
import Project from './project';
import Storage from './storage';
import UI from './ui';

let projects = Storage.getLibrary() || [new Project('Default')];

// --- 1. Logic to add a todo ---
function createNewTodo(projectIndex, title, date, priority) {
  const newTodo = new Todo(title, "Description", date, priority);
  projects[projectIndex].addTodo(newTodo);
  Storage.saveLibrary(projects);
  UI.render(projects); // Update screen immediately
}

// --- 2. Event Listener for the "Add Task" Button ---
const addBtn = document.getElementById('add-todo-btn');

addBtn.addEventListener('click', () => {
  const title = document.getElementById('todo-title').value;
  const date = document.getElementById('todo-date').value;
  const priority = document.getElementById('todo-priority').value;

  if (title !== "") {
    createNewTodo(0, title, date, priority);
    
    // Clear the input after adding
    document.getElementById('todo-title').value = "";
  } else {
    alert("Please enter a task title");
  }
});

// --- 3. Event Listener for Delete Buttons (Event Delegation) ---
document.getElementById('content').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const pIdx = e.target.dataset.p;
    const tIdx = e.target.dataset.t;
    
    projects[pIdx].removeTodo(tIdx);
    Storage.saveLibrary(projects);
    UI.render(projects);
  }
});

// Initial Render on page load
UI.render(projects);