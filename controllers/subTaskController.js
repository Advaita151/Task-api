import {SubTask} from '../models/Task.js';
import {Task} from '../models/Task.js';

export async function createSubtask(req, res){
    try {
      const { task_id } = req.body;
  
      if (!task_id) {
        return res.status(400).json({ message: 'Task ID is required.' });
      }
  
      const task = await Task.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      const subtask = new SubTask({
        task_id,
        status: 0 
      });
  
      await subtask.save();
  
      res.status(201).json({ message: 'Subtask created successfully.', subtask });
    } catch (error) {
      console.error('Error creating subtask:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};

export async function getAllUserSubtasks(req, res){
    try {
        const { task_id } = req.query;
    
        const filter = {};
        if (task_id) filter.task_id = task_id;
    
        const subtasks = await SubTask.find(filter).exec();
    
        res.status(200).json({ subtasks });
      } catch (error) {
        console.error('Error fetching subtasks:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

export async function updateSubTask(req, res) {
    try {
        const { id } = req.params;
    
        const { status } = req.body;
        if (status === undefined || (status !== 0 && status !== 1)) {
          return res.status(400).json({ message: 'Invalid status value. Status must be either 0 or 1.' });
        }
    
        const subtask = await SubTask.findById(id);
        if (!subtask) {
          return res.status(404).json({ message: 'Subtask not found.' });
        }
    
        subtask.status = status;
    
        await subtask.save();
    
        res.status(200).json({ message: 'Subtask updated successfully.', subtask });
      } catch (error) {
        console.error('Error updating subtask:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

export async function deleteSubTask(req, res) {
    try {
        const { id } = req.params;
   
        const subtask = await SubTask.findById(id);
        if (!subtask) {
          return res.status(404).json({ message: 'Subtask not found.' });
        }
    
        subtask.deleted_at = Date.now(); 
    
        await subtask.save();
    
        res.status(200).json({ message: 'Subtask deleted successfully.' });
      } catch (error) {
        console.error('Error deleting subtask:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}
