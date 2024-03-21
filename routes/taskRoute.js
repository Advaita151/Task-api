import { Router } from 'express';
// import authMiddleware from '../middleware/auth.js';
import { createTask,updateTask } from '../controllers/taskController.js';

const router = Router();

router.post('/',  createTask);
router.put('/:id',  updateTask);

export default router;
