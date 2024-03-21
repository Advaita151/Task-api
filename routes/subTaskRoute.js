import { Router } from 'express';
// import authMiddleware from '../middleware/auth.js';
import { createSubTask,updateSubTask } from '../controllers/subTaskController.js';

const router = Router();

router.post('/', createSubTask);
router.put('/:id', updateSubTask);

export default router;
