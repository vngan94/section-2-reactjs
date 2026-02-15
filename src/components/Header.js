import React from "react";
import PropTypes from "prop-types";

function Header({ completedCount, totalCount, onAddClick }) {
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="card-header bg-primary text-white">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">My Todo List</h2>
        <button
          className="btn btn-light"
          onClick={onAddClick}
          aria-label="Add new todo"
        >
          <i className="bi bi-plus-lg"></i> Add Todo
        </button>
      </div>
      {totalCount > 0 && (
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small>
              {completedCount} of {totalCount} completed
            </small>
            <small>{progressPercentage}%</small>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  completedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default Header;
