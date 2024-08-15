import express from 'express';
import { showAllTasks, 
        showTask, 
        newTask, 
        updateTask, 
        removeTask, 
        removeAllTasks } 
from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', showAllTasks);
router.get('/tasks/:id', showTask);
router.post('/tasks', newTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', removeTask);
router.delete('/tasks', removeAllTasks)

export default router;