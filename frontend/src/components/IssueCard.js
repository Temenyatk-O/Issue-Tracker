import React from 'react';
import '../styles/IssueCard.css';


const initials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const IssueCard = ({ issue, onClick }) => (
  <div className="issue-card" onClick={onClick} role="button" tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}>

    <div className="card-head">
      <p className="card-title">{issue.title}</p>
      <div className="card-avatar" title={issue.assignee}>
        {initials(issue.assignee || '?')}
      </div>
    </div>

    {issue.description && (
      <p className="card-desc">{issue.description}</p>
    )}

    <div className="card-foot">
      <span className={`priority-badge priority-${issue.priority}`}>
        {issue.priority}
      </span>
      <div className="card-tags">
        {(issue.tags || []).slice(0, 3).map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default IssueCard;
