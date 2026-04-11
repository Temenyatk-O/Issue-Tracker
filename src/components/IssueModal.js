import React from "react";
import "../styles/IssueModal.css";
//A component 
const IssueModal = ({ issue, onClose, onEdit, onDelete }) => {
  if (!issue) return null;

  // Formats a date string into a readable format 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
//Renders a modal of an issue with all the data
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{issue.title}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <label>Status</label>
            <span className={`status-badge status-${issue.status}`}>
              {issue.status.replace("_", " ")}
            </span>
          </div>

          <div className="modal-field">
            <label>Priority</label>
            <span className={`priority-badge priority-${issue.priority}`}>
              {issue.priority}
            </span>
          </div>

          <div className="modal-field">
            <label>Assignee</label>
            <p>{issue.assignee}</p>
          </div>

          <div className="modal-field">
            <label>Description</label>
            <p>{issue.description}</p>
          </div>

          <div className="modal-field">
            <label>Tags</label>
            <div className="tags-container">
              {issue.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-dates">
            <div>
              <label>Created</label>
              <p>{formatDate(issue.createdAt)}</p>
            </div>
            <div>
              <label>Updated</label>
              <p>{formatDate(issue.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-edit" onClick={onEdit}>
            Edit Issue
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
