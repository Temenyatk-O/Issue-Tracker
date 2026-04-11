import React, { useState, useMemo } from "react";
import { INITIAL_ISSUES } from "../data/issuesData";
import IssueCard from "../components/IssueCard";
import IssueModal from "../components/IssueModal";
import IssueForm from "../components/IssueForm";
import SearchBar from "../components/SearchBar";
import "../styles/MainPage.css";
//A component of a main page that groups all the fucntionality of components
const MainPage = () => {
  const [issues, setIssues] = useState(INITIAL_ISSUES); // Initial issues data as provided
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [search, setSearch] = useState("");

  //Columns for the issues
  const columns = [
    { id: "open", title: "Open Issues", color: "#c0392b" },
    { id: "in_progress", title: "In Progress", color: "#e67e22" },
    { id: "closed", title: "Completed", color: "#27ae60" },
  ];

  // A fucntion that filters issues based on search
  const filteredIssues = useMemo(() => {
    if (!search.trim()) return issues;
    //Search is converted into lower case to be able to catch the title,descr,tags etc
    const term = search.toLowerCase();
    return issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.assignee.toLowerCase().includes(term) ||
        issue.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }, [issues, search]);
  // A function that gets issues based on status
  const getIssuesByStatus = (status) => {
    return filteredIssues.filter((issue) => issue.status === status);
  };
  //To create a new issue
  const handleCreateIssue = (formData) => {
    const newIssue = {
      ...formData,
      id: Math.max(...issues.map((i) => i.id), 0) + 1,
      createdAt: new Date().toISOString(), //To get the current date and time
      updatedAt: new Date().toISOString(),
    };
    setIssues([...issues, newIssue]); //Saves the new issue into array
    setIsFormOpen(false);
  };
  //To edit an issue
  const handleEditIssue = (formData) => {
    //Map through the issues to find the id to edit
    setIssues(
      issues.map((issue) =>
        issue.id === editingIssue.id
          ? {
              ...formData,
              id: issue.id,
              createdAt: issue.createdAt,
              updatedAt: new Date().toISOString(),
            }
          : issue
      )
    );
    setEditingIssue(null);
    setSelectedIssue(null);
  };

  //To delete an issue
  const handleDeleteIssue = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      setIssues(issues.filter((issue) => issue.id !== selectedIssue.id));
      setSelectedIssue(null);
    }
  };
  //Opens an edit form
  const openEditForm = () => {
    setEditingIssue(selectedIssue);
    setSelectedIssue(null);
  };
  //Renders the pages layout
  return (
    <div className="main-container">
      <header className="main-header">
        <h1> Issue Tracker</h1>
        <SearchBar
          searchTerm={search}
          onSearchChange={setSearch}
          onAddTask={() => setIsFormOpen(true)}
        />
      </header>

      <div className="main-board">
        {columns.map((column) => (
          <div key={column.id} className="main-column">
            <div
              className="main-header"
              style={{ borderBottomColor: column.color }}
            >
              <div className="column-title">
                <h3>{column.title}</h3>
              </div>
              <span className="column-count">
                {getIssuesByStatus(column.id).length}
              </span>
            </div>

            <div className="column-content">
              {getIssuesByStatus(column.id).map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={() => setSelectedIssue(issue)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* To open a modal when an issue is selected */}
      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onEdit={openEditForm}
          onDelete={handleDeleteIssue}
        />
      )}
      {/* To open a new issue form */}
      {isFormOpen && (
        <IssueForm
          onSave={handleCreateIssue}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* To open a edit issue form */}
      {editingIssue && (
        <IssueForm
          issue={editingIssue}
          onSave={handleEditIssue}
          onCancel={() => setEditingIssue(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
