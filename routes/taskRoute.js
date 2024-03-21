import { Router } from 'express';
// import authMiddleware from '../middleware/auth.js';
import { createTask,updateTask,deleteTask,getAllUserTasks } from '../controllers/taskController.js';

const router = Router();

router.post('/',  createTask);
router.put('/:id',  updateTask);
router.delete('/:id', deleteTask);
router.get('/', getAllUserTasks);

export default router;
