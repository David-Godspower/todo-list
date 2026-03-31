const UI = (() => {
  const content = document.getElementById('content');

  const render = (projects) => {
    content.innerHTML = ''; 

    projects.forEach((project, pIdx) => {
      const projectDiv = document.createElement('div');
      projectDiv.innerHTML = `<h2>${project.name}</h2>`;
      
      const ul = document.createElement('ul');
      project.todos.forEach((todo, tIdx) => {
        const li = document.createElement('li');
        // Use data-p and data-t to match the index.js logic
        li.innerHTML = `
          <span><strong>${todo.title}</strong> - ${todo.dueDate} [${todo.priority}]</span>
          <button class="delete-btn" data-p="${pIdx}" data-t="${tIdx}">Delete</button>
        `;
        ul.appendChild(li);
      });

      projectDiv.appendChild(ul);
      content.appendChild(projectDiv);
    });
  };

  return { render };
})();

export default UI;