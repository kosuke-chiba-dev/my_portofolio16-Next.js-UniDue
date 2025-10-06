import mongoose from "mongoose";
export const connectDb = async () => {
    const MONGODB_URI = process.env.DB_URI; 
if (!MONGODB_URI) {
  throw new Error("環境変数 DB_URI が未設定です。");
}
    try{
        console.log("DB接続に成功しました。")
        await mongoose.connect(MONGODB_URI || "");
    } catch(error){
        console.log('DB接続に失敗しました。')
        throw new Error()
    }
} 