import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  status: { type: Number, enum: [0, 1], default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date }
});

export const SubTask = mongoose.model('subTask',subTaskSchema);
