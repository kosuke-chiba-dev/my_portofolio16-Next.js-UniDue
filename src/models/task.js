import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'タイトルは必須です'],
      trim: true,
      maxlength: [20, 'タイトルは20文字以内で入力してください'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [30, '説明は30文字以内で入力してください'],
    },
    dueDate: {
      type: Date,
      required: [true, '期日は必須です'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

taskSchema.index({ dueDate: 1, _id: 1 });

export const TaskModel =
  mongoose.models.Task || mongoose.model('Task', taskSchema);

