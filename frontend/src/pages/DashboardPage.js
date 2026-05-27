import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetchIssues, apiCreateIssue, apiUpdateIssue, apiDeleteIssue } from '../api/client';
import IssueCard   from '../components/IssueCard';
import IssueModal  from '../components/IssueModal';
import IssueForm   from '../components/IssueForm';
import SearchBar   from '../components/SearchBar';
import '../styles/Dashboard.css';

const COLUMNS = [
  { id: 'open',        label: 'Open',        color: '#C0392B' },
  { id: 'in_progress', label: 'In Progress',  color: '#B5600A' },
  { id: 'closed',      label: 'Completed',    color: '#1A6B3A' },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [issues,  setIssues]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState('');

  const [search,        setSearch]        = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null); 
  const [editingIssue,  setEditingIssue]  = useState(null); 
  const [isCreating,    setIsCreating]    = useState(false); 

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiFetchIssues();
        setIssues(data);
      } catch {
        setFetchErr('Could not load issues. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return issues;
    return issues.filter(
      (iss) =>
        iss.title.toLowerCase().includes(q) ||
        (iss.description || '').toLowerCase().includes(q) ||
        (iss.assignee || '').toLowerCase().includes(q) ||
        (iss.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [issues, search]);

  const byStatus = (status) => filtered.filter((i) => i.status === status);



  const handleCreate = async (formData) => {
    try {
      const { data: newIssue } = await apiCreateIssue(formData);
      setIssues((prev) => [newIssue, ...prev]);
      setIsCreating(false);
    } catch {
      alert('Failed to create issue. Please try again.');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const { data: updated } = await apiUpdateIssue(editingIssue.id, formData);
      setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setEditingIssue(null);
      setSelectedIssue(null);
    } catch {
      alert('Failed to update issue.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this issue? This cannot be undone.')) return;
    try {
      await apiDeleteIssue(selectedIssue.id);
      setIssues((prev) => prev.filter((i) => i.id !== selectedIssue.id));
      setSelectedIssue(null);
    } catch {
      alert('Failed to delete issue.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <>

      <nav className="nav">
        <span className="nav-logo">IssueTracker</span>
        <span className="nav-user">Signed in as <span>{user.name || user.email}</span></span>
        <button className="btn-logout" onClick={logout}>Log out</button>
      </nav>

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>My Board</h1>
            <p>{issues.length} issue{issues.length !== 1 ? 's' : ''} total</p>
          </div>
          <SearchBar value={search} onChange={setSearch} onAdd={() => setIsCreating(true)} />
        </div>

        <div className="board">
          {loading && <div className="board-loading">Loading issues…</div>}
          {fetchErr && <div className="board-error">{fetchErr}</div>}

          {!loading && !fetchErr && COLUMNS.map((col) => (
            <div key={col.id} className="column">
              <div className="column-head">
                <div className="column-head-left">
                  <span className="column-dot" style={{ background: col.color }} />
                  <h3>{col.label}</h3>
                </div>
                <span className="column-count">{byStatus(col.id).length}</span>
              </div>

              <div className="column-body">
                {byStatus(col.id).length === 0
                  ? <div className="column-empty">No issues</div>
                  : byStatus(col.id).map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onClick={() => setSelectedIssue(issue)}
                      />
                    ))
                }
              </div>
            </div>
          ))}
        </div>
      </main>


      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onEdit={() => { setEditingIssue(selectedIssue); setSelectedIssue(null); }}
          onDelete={handleDelete}
        />
      )}


      {editingIssue && (
        <IssueForm
          issue={editingIssue}
          onSave={handleUpdate}
          onCancel={() => setEditingIssue(null)}
        />
      )}


      {isCreating && (
        <IssueForm
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}
    </>
  );
};

export default DashboardPage;
