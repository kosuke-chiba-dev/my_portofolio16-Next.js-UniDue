'use server';

import { connectDb } from "@/utils/database";
import { TaskModel } from "@/models/task";
import { redirect } from "next/navigation";

export const createTask = async (state, formData) => {
  const title = (formData.get('title') || '').toString().trim();
  const description = (formData.get('description') || '').toString().trim();
  const dueStr = formData.get('dueDate');

  const newTask = {
    title,
    description,
    dueDate: dueStr ? new Date(dueStr) : null,
    isCompleted: false,
  };

  try {
    await connectDb();
    await TaskModel.create(newTask);
  } catch (error) {
    if (error?.name === 'ValidationError' && error?.errors) {
      const messages = Object.values(error.errors)
        .map((e) => e.message)
        .filter(Boolean);
      state.error = messages.join(' / ') || '入力内容を確認してください。';
      return state;
    }
    state.error = "課題の作成に失敗しました。";
    return state;
  }

  redirect('/');
};



export const updateTask = async (id, state, formData) => {
  const title = (formData.get('title') || '').toString().trim();
  const description = (formData.get('description') || '').toString().trim();
  const dueStr = formData.get('dueDate');

  const updateDoc = {
    title,
    description,
    dueDate: dueStr ? new Date(dueStr) : null,
    isCompleted: Boolean(formData.get('isCompleted')),
  };

  try {
    await connectDb();

    await TaskModel.updateOne(
      { _id: id },
      { $set: updateDoc },
      {
        runValidators: true,   
        context: 'query',     
      }
    );
  } catch (error) {
    if (error?.name === 'ValidationError' && error?.errors) {
      const messages = Object.values(error.errors).map(e => e.message).filter(Boolean);
      state.error = messages.join(' / ') || '入力内容を確認してください。';
      return state;
    }
    state.error = "課題の更新に失敗しました。";
    return state;
  }

  redirect('/');
};


export const deleteTask = async (id, state) => {
    try{
        await connectDb()
        await TaskModel.deleteOne({_id: id})
    } catch(error){
        state.error = "課題の削除に失敗しました。";
        return state;
    }

    redirect('/')
}