import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/AddTodoModal.css";
import { VALIDATION } from "../constants/validation";

function AddTodoModal({ show, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      setTitle("");
      setError("");
    }
  }, [show]);

  const validateTitle = useCallback((value) => {
    if (!value.trim()) {
      return "Title is required";
    }
    if (value.trim().length < VALIDATION.MIN_TITLE_LENGTH) {
      return `Title must be at least ${VALIDATION.MIN_TITLE_LENGTH} characters`;
    }
    if (value.trim().length > VALIDATION.MAX_TITLE_LENGTH) {
      return `Title must not exceed ${VALIDATION.MAX_TITLE_LENGTH} characters`;
    }
    return "";
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const validationError = validateTitle(title);

      if (validationError) {
        setError(validationError);
        return;
      }

      onAdd(title.trim());
      setTitle("");
      setError("");
    },
    [title, validateTitle, onAdd],
  );

  const handleTitleChange = useCallback(
    (e) => {
      setTitle(e.target.value);
      if (error) {
        setError("");
      }
    },
    [error],
  );

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addTodoModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTodoModalLabel">
                Add New Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="todoTitle" className="form-label">
                    Todo Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    id="todoTitle"
                    placeholder="Enter todo title..."
                    value={title}
                    onChange={handleTitleChange}
                    autoFocus
                    maxLength={VALIDATION.MAX_TITLE_LENGTH}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <div className="form-text">
                    {title.length}/{VALIDATION.MAX_TITLE_LENGTH} characters
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!title.trim()}
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

AddTodoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddTodoModal;
