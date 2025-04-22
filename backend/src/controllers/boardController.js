const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all boards
const getBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ message: 'Failed to fetch boards' });
  }
};

// Get a single board with tasks
const getBoardById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: {
            updatedAt: 'desc'
          }
        }
      }
    });
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ message: 'Failed to fetch board' });
  }
};

// Create a new board
const createBoard = async (req, res) => {
  const { name, description } = req.body;
  
  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Board name is required' });
  }
  
  if (name.length > 255) {
    return res.status(400).json({ message: 'Board name must be less than 255 characters' });
  }
  
  try {
    const newBoard = await prisma.board.create({
      data: {
        name,
        description
      }
    });
    
    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ message: 'Failed to create board' });
  }
};

// Update a board
const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  // Validation
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Board name is required' });
  }
  
  if (name.length > 255) {
    return res.status(400).json({ message: 'Board name must be less than 255 characters' });
  }
  
  try {
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: {
        name,
        description
      }
    });
    
    res.json(updatedBoard);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Board not found' });
    }
    console.error('Error updating board:', error);
    res.status(500).json({ message: 'Failed to update board' });
  }
};

// Delete a board
const deleteBoard = async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.board.delete({
      where: { id }
    });
    
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Board not found' });
    }
    console.error('Error deleting board:', error);
    res.status(500).json({ message: 'Failed to delete board' });
  }
};

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
