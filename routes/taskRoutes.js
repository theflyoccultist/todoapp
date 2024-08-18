import express from 'express';
import { showAllTasks, 
        showTask,
        newTask, 
        updateTask, 
        removeTask } 
from '../controllers/taskController.js';
import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/tasks', authenticateToken, showAllTasks);
router.get('/tasks/:id', authenticateToken, showTask);
router.post('/tasks', authenticateToken, newTask);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, removeTask);

export default router;