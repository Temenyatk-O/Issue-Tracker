const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getAll, create, update, remove } = require('../controllers/issueController');

const router = express.Router();


router.use(protect);

router.get   ('/',    getAll);   // GET    /api/issues
router.post  ('/',    create);   // POST   /api/issues
router.put   ('/:id', update);   // PUT    /api/issues/:id
router.delete('/:id', remove);   // DELETE /api/issues/:id

module.exports = router;
