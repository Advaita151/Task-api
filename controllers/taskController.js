import {Task} from '../models/Task.js';

export async function createTask(req, res) {
    try {
        const { title, description, due_date } = req.body;
        if (!title || !description || !due_date) {
          return res.status(400).json({ message: 'Title, description, and due date are required.' });
        }
        const task = new Task({
          title,
          description,
          due_date,
          priority: 0, 
          status: 'TODO' 
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully.', task });
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

export async function getAllUserTasks(req, res) {
    try {
        const { priority, due_date, page = 1, limit = 10 } = req.query;
        const filter = {};
        if (priority) filter.priority = priority;
        if (due_date) filter.due_date = due_date;
    
        const tasks = await Task.find(filter)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
    
        const totalCount = await Task.countDocuments(filter);
    
        const totalPages = Math.ceil(totalCount / limit);
    
        const pagination = {
          currentPage: page,
          totalPages,
          totalCount
        };
    
        res.status(200).json({ tasks, pagination });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;

        const { due_date, status } = req.body;
        if (!due_date && !status) {
          return res.status(400).json({ message: 'At least one parameter (due_date or status) is required.' });
        }
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found.' });
        }

        if (due_date) {
          task.due_date = due_date;
        }

        if (status) {
          if (!['TODO', 'DONE'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value. Status must be either "TODO" or "DONE".' });
          }
          task.status = status;
        }
        await task.save();
        res.status(200).json({ message: 'Task updated successfully.', task });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found.' });
        }
    
        task.deleted_at = Date.now(); 
    
        await task.save();
    
        res.status(200).json({ message: 'Task deleted successfully.' });
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}
