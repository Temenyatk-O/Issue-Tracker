const pool = require('../config/db');
const tagsToString = (arr) => (Array.isArray(arr) ? arr.join(',') : '');
const tagsToArray  = (str) => (str ? str.split(',').filter(Boolean) : []);

// GET /api/issues
// Returns all issues belonging to the logged-in user.

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM issues WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    const issues = rows.map(r => ({ ...r, tags: tagsToArray(r.tags) }));
    res.json(issues);
  } catch (err) {
    console.error('getAll error:', err);
    res.status(500).json({ message: 'Failed to fetch issues.' });
  }
};


// POST /api/issues
// Body: { title, description, status, priority, assignee, tags[] }

const create = async (req, res) => {
  const { title, description, status, priority, assignee, tags } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO issues (user_id, title, description, status, priority, assignee, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, description || '', status || 'open',
       priority || 'medium', assignee || '', tagsToString(tags)]
    );


    const [rows] = await pool.query('SELECT * FROM issues WHERE id = ?', [result.insertId]);
    const issue  = { ...rows[0], tags: tagsToArray(rows[0].tags) };

    res.status(201).json(issue);
  } catch (err) {
    console.error('create error:', err);
    res.status(500).json({ message: 'Failed to create issue.' });
  }
};


// PUT /api/issues/:id

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assignee, tags } = req.body;

  try {
    
    const [existing] = await pool.query(
      'SELECT id FROM issues WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Issue not found or access denied.' });
    }

    await pool.query(
      `UPDATE issues SET title=?, description=?, status=?, priority=?, assignee=?, tags=?
       WHERE id = ? AND user_id = ?`,
      [title, description, status, priority, assignee, tagsToString(tags), id, req.user.id]
    );

    const [rows] = await pool.query('SELECT * FROM issues WHERE id = ?', [id]);
    const issue  = { ...rows[0], tags: tagsToArray(rows[0].tags) };

    res.json(issue);
  } catch (err) {
    console.error('update error:', err);
    res.status(500).json({ message: 'Failed to update issue.' });
  }
};


// DELETE /api/issues/:id
// Deletes only if the issue belongs to the current user.

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM issues WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Issue not found or access denied.' });
    }

    res.json({ message: 'Issue deleted.' });
  } catch (err) {
    console.error('remove error:', err);
    res.status(500).json({ message: 'Failed to delete issue.' });
  }
};

module.exports = { getAll, create, update, remove };
