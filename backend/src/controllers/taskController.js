const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks for a board
const getTasksByBoardId = async (req, res) => {
  const { boardId } = req.params;
  
  try {
    const tasks = await prisma.task.findMany({
      where: { boardId },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Get a single task
const getTaskById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { board: true }
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, boardId } = req.body;
  
  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Task title is required' });
  }
  
  if (title.length > 255) {
    return res.status(400).json({ message: 'Task title must be less than 255 characters' });
  }
  
  if (!boardId) {
    return res.status(400).json({ message: 'Board ID is required' });
  }
  
  // Validate status
  const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  
  // Validate priority
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Invalid priority value' });
  }
  
  try {
    // Check if board exists
    const boardExists = await prisma.board.findUnique({
      where: { id: boardId }
    });
    
    if (!boardExists) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'TODO',
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        boardId
      }
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate, boardId } = req.body;
  
  // Validation
  if (title !== undefined && (title.trim() === '')) {
    return res.status(400).json({ message: 'Task title cannot be empty' });
  }
  
  if (title && title.length > 255) {
    return res.status(400).json({ message: 'Task title must be less than 255 characters' });
  }
  
  // Validate status
  const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  
  // Validate priority
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Invalid priority value' });
  }
  
  try {
    // If boardId is being changed, check if the new board exists
    if (boardId) {
      const boardExists = await prisma.board.findUnique({
        where: { id: boardId }
      });
      
      if (!boardExists) {
        return res.status(404).json({ message: 'Board not found' });
      }
    }
    
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        boardId
      }
    });
    
    res.json(updatedTask);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.task.delete({
      where: { id }
    });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

module.exports = {
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
