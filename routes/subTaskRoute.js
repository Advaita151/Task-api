import { Router } from 'express';
// import authMiddleware from '../middleware/auth.js';
import { createSubtask , updateSubTask , deleteSubTask, getAllUserSubtasks } from '../controllers/subTaskController.js';

const router = Router();

router.post('/', createSubtask);
router.put('/:id', updateSubTask);
router.delete('/:id', deleteSubTask);
router.get('/', getAllUserSubtasks);

export default router;
