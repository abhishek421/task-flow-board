const express = require('express');
const router = express.Router();
const {
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// GET all tasks for a specific board
router.get('/board/:boardId', getTasksByBoardId);

// GET a specific task by ID
router.get('/:id', getTaskById);

// POST a new task
router.post('/', createTask);

// PUT update a task
router.put('/:id', updateTask);

// DELETE a task
router.delete('/:id', deleteTask);

module.exports = router;
