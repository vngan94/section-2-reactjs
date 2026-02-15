import React from "react";
import PropTypes from "prop-types";
import "../styles/TodoItem.css";

function TodoItem({ todo, onToggle }) {
  return (
    <div className="list-group-item d-flex align-items-center">
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        id={`todo-${todo.id}`}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow-1 mb-0 ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}
        style={{ cursor: "pointer" }}
      >
        {todo.title}
      </label>
      {todo.completed && <span className="badge bg-success">Completed</span>}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;
