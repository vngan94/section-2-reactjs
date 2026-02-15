import React, { useState, useEffect, useCallback } from "react";
import "./styles/App.css";
import TodoList from "./components/TodoList";
import AddTodoModal from "./components/ModalToDo";
import Header from "./components/Header";
import { getTodos, addTodo, toggleTodo } from "./services/todoService";

function App() {
  // ===== State Management =====
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ===== Effects =====
  useEffect(() => {
    loadTodos();
  }, []);

  // ===== Data Operations =====
  const loadTodos = () => {
    try {
      const data = getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = useCallback((title) => {
    try {
      const newTodo = addTodo(title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }, []);

  const handleToggleTodo = useCallback((id) => {
    try {
      const updatedTodo = toggleTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  }, []);

  // ===== Modal Controls =====
  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  // ===== Computed Values =====
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  // ===== Render: Loading State =====
  if (isLoading) {
    return (
      <div
        className="App d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ===== Render: Main UI =====

  return (
    <div className="App">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <Header
                completedCount={completedCount}
                totalCount={totalCount}
                onAddClick={handleOpenModal}
              />
              <div className="card-body">
                <TodoList
                  todos={todos}
                  onToggle={handleToggleTodo}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTodoModal
        show={showModal}
        onClose={handleCloseModal}
        onAdd={handleAddTodo}
      />
    </div>
  );
}

export default App;
