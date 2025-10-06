import { TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDb();
const completedTasks = await TaskModel
  .find({ isCompleted: true })
  .sort({ dueDate: -1, _id: -1 }) 
  .lean();

    return NextResponse.json({ message: '課題取得成功', tasks: completedTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '課題取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';