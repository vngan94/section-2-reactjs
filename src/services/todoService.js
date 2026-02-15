let todos = [
  { id: 1, title: "Complete project documentation", completed: false },
  { id: 2, title: "Review pull requests", completed: true },
  { id: 3, title: "Update dependencies", completed: false },
];

let nextId = 4;

export const getTodos = () => {
  return [...todos];
};

export const addTodo = (title) => {
  const newTodo = {
    id: nextId++,
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const toggleTodo = (id) => {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
};

