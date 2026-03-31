import Todo from './todo';
import Project from './project';

const Storage = (() => {
  const saveLibrary = (data) => {
    localStorage.setItem('todoLibrary', JSON.stringify(data));
  };

  const getLibrary = () => {
    const jsonString = localStorage.getItem('todoLibrary');
    if (!jsonString) return null;

    const rawData = JSON.parse(jsonString);

    // REHYDRATION: Convert plain objects back into Class instances
    return rawData.map(projectData => {
      const project = new Project(projectData.name);
      projectData.todos.forEach(t => {
        const todo = new Todo(t.title, t.description, t.dueDate, t.priority, t.notes);
        todo.complete = t.complete; // Restore completion status
        project.addTodo(todo);
      });
      return project;
    });
  };

  return { saveLibrary, getLibrary };
})();

export default Storage;