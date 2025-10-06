import { TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

function getJstStartOfTodayUtc() {
  const nowUtc = new Date();
  const y = nowUtc.getUTCFullYear();
  const m = nowUtc.getUTCMonth();
  const d = nowUtc.getUTCDate();
  return new Date(Date.UTC(y, m, d, -9, 0, 0)); 
}

export const GET = async () => {
  try {
    await connectDb();

    const startJstUtc = getJstStartOfTodayUtc();

    
    const expiredTasks = await TaskModel.find({
      dueDate: { $lt: startJstUtc },
      isCompleted: false,
    })
      .sort({ dueDate: -1, _id: -1 }) 
      .lean();

    return NextResponse.json(
      { message: "課題取得成功", tasks: expiredTasks },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "課題取得失敗" },
      { status: 500 }
    );
  }
};


























