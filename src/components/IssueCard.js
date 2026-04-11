import React from 'react';
import '../styles/IssueCard.css';

const IssueCard = ({ issue, onClick }) => {
  //Gets the initials of the assignee and converts them to uppercase
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase(); 
  };
//Gets the priority class and the desired color for the priority
  const getPriorityClass = (priority) => {
    const classes = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority] || 'priority-low';
  };
//Renders the issue card 
  return (
    <div className="issue-card" onClick={onClick}>
      <div className="issue-card-header">
        <h4 className="issue-title">{issue.title}</h4>
        <div className="issue-assignee" title={issue.assignee}>
          {getInitials(issue.assignee)}
        </div>
      </div>
      
      <p className="issue-description">{issue.description}</p>
      
      <div className="issue-card-footer">
        <span className={`priority-badge ${getPriorityClass(issue.priority)}`}>
          {issue.priority}
        </span>
        <div className="issue-tags">
          {issue.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
      
        </div>
      </div>
    </div>
  );
};

export default IssueCard;