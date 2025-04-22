const express = require('express');
const router = express.Router();
const { 
  getBoards, 
  getBoardById, 
  createBoard, 
  updateBoard, 
  deleteBoard 
} = require('../controllers/boardController');

// GET all boards
router.get('/', getBoards);

// GET a specific board by ID
router.get('/:id', getBoardById);

// POST a new board
router.post('/', createBoard);

// PUT update a board
router.put('/:id', updateBoard);

// DELETE a board
router.delete('/:id', deleteBoard);

module.exports = router;
