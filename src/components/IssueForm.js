import React, { useState } from "react";
import "../styles/IssueForm.css";

//A component for creating and editing issues
const IssueForm = ({ issue, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    issue || {
      title: "",
      status: "open",
      priority: "medium",
      assignee: "",
      tags: [],
      description: "",
    }
  );
  const [tagInput, setTagInput] = useState("");

  // Validates if  fields are filled  and saves the data
  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.assignee.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(formData);
  };

  // Adds a new tag to the issue if it doesn't already exist
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmedTag] });
      setTagInput("");
    }
  };

  // Removes a specific tag from the issue
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Enter key press to add a tag quickly
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
//Renders a overlay of a form to edit data or create a new issue
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{issue ? "Edit Issue" : "Create New Issue"}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label>Title </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter issue title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Description </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter issue description"
              rows={4}
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="form-select"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Assignee </label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) =>
                setFormData({ ...formData, assignee: e.target.value })
              }
              placeholder="Enter assignee name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input-wrapper">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag and press Enter or Add Button"
                className="form-input"
              />
              <button onClick={addTag} className="btn-add-tag">
                Add
              </button>
            </div>
            <div className="tags-display">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-submit">
            {issue ? "Update Issue" : "Create Issue"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default IssueForm;
