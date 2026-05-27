import React from 'react';
import '../styles/IssueModal.css';

const fmt = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const IssueModal = ({ issue, onClose, onEdit, onDelete }) => {
  if (!issue) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-head">
          <h2>{issue.title}</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal-body">
          {/* Status + Priority row */}
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className={`status-badge status-${issue.status}`}>
                {issue.status.replace('_', ' ')}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Priority</span>
              <span className={`priority-badge priority-${issue.priority}`}>
                {issue.priority}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Assignee</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{issue.assignee || '—'}</span>
            </div>
          </div>

          <div className="modal-section">
            <label>Description</label>
            <p>{issue.description || 'No description provided.'}</p>
          </div>

          <div className="modal-section">
            <label>Tags</label>
            <div className="tags-row">
              {(issue.tags || []).length
                ? (issue.tags || []).map((t, i) => <span key={i} className="tag">{t}</span>)
                : <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>None</span>}
            </div>
          </div>

          <div className="dates-grid">
            <div><label>Created</label><p>{fmt(issue.created_at || issue.createdAt)}</p></div>
            <div><label>Updated</label><p>{fmt(issue.updated_at || issue.updatedAt)}</p></div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn-edit" onClick={onEdit}>Edit Issue</button>
          <button className="btn-delete" onClick={onDelete}>Delete</button>
        </div>

      </div>
    </div>
  );
};

export default IssueModal;
