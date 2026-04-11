//Initial data
export const INITIAL_ISSUES = [
  {
    id: 1,
    title: "User cannot login",
    status: "open",
    priority: "high",
    assignee: "Alice",
    tags: ["auth", "bug"],
    createdAt: "2025-11-01T10:15:00Z",
    updatedAt: "2025-11-01T10:15:00Z",
    description: "User reports they cannot login with correct credentials."
  },
  {
    id: 2,
    title: "Improve dashboard performance",
    status: "in_progress",
    priority: "medium",
    assignee: "Bob",
    tags: ["performance"],
    createdAt: "2025-10-20T09:00:00Z",
    updatedAt: "2025-11-02T12:30:00Z",
    description: "Dashboard loads slowly when there are more than 1000 records."
  },
  {
    id: 3,
    title: "Typo in pricing page",
    status: "closed",
    priority: "low",
    assignee: "Charlie",
    tags: ["ui", "content"],
    createdAt: "2025-09-15T14:45:00Z",
    updatedAt: "2025-09-16T08:00:00Z",
    description: "Spelling mistake in the enterprise pricing tier description."
  }
];
