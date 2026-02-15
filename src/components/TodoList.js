import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, isLoading }) {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-inbox" style={{ fontSize: "3rem" }}></i>
        <p className="mb-0 mt-3">
          No todos yet. Click "Add Todo" to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="list-group list-group-flush">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

TodoList.defaultProps = {
  isLoading: false,
};

export default TodoList;
