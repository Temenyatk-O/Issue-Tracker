import React, { useState } from 'react';
import '../styles/IssueModal.css';

const DEFAULTS = {
  title: '', description: '', status: 'open',
  priority: 'medium', assignee: '', tags: [],
};

const IssueForm = ({ issue, onSave, onCancel }) => {
  const [form, setForm]       = useState(
    issue ? { ...DEFAULTS, ...issue, tags: issue.tags || [] } : DEFAULTS
  );
  const [tagInput, setTagInput] = useState('');
  const [error, setError]       = useState('');

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (form.tags.includes(t)) { setTagInput(''); return; }
    set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (tag) => set('tags', form.tags.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.assignee.trim()) {
      setError('Title and Assignee are required.');
      return;
    }
    setError('');
    onSave(form);
  };

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-head">
          <h2>{issue ? 'Edit Issue' : 'New Issue'}</h2>
          <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <div className="modal-body">
          {error && (
            <div style={{
              background: 'var(--high-bg)', color: 'var(--high)',
              border: '1px solid #f5c6c2', borderRadius: 'var(--r-md)',
              padding: '9px 14px', fontSize: 13, marginBottom: 16,
            }}>{error}</div>
          )}

          <div className="form-group">
            <label>Title *</label>
            <input className="form-input" placeholder="Short descriptive title"
              value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-textarea" placeholder="What is the issue? Steps to reproduce?"
              value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select className="form-select" value={form.status}
                onChange={(e) => set('status', e.target.value)}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select className="form-select" value={form.priority}
                onChange={(e) => set('priority', e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Assignee *</label>
            <input className="form-input" placeholder="Full name"
              value={form.assignee} onChange={(e) => set('assignee', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-row">
              <input className="form-input" placeholder="Add tag, press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}} />
              <button className="btn-tag-add" onClick={addTag}>Add</button>
            </div>
            <div className="tags-edit">
              {form.tags.map((tag, i) => (
                <span key={i} className="tag-item">
                  {tag}
                  <button className="tag-rm" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn-delete" onClick={onCancel}>Cancel</button>
          <button className="btn-edit" onClick={handleSubmit}>
            {issue ? 'Save Changes' : 'Create Issue'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default IssueForm;
