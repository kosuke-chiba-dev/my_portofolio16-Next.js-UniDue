import { TaskModel } from '@/models/task';
import { NextResponse } from "next/server";
import { connectDb } from '@/utils/database';

export const GET = async (_, {params}) => {
    try{
        await connectDb();
        const {id} = await params
        const task = await TaskModel.findById(id);

        if(!task){
            return NextResponse.json({message: "課題が存在しません。"}, {status: 404})
        }
        return NextResponse.json({message: "課題取得成功", task })
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "課題取得失敗"}, {stataus: 500})
    }
}

export const dynamic = 'force-dynamic';