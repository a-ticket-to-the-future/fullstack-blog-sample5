import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function main(){
    try {
        await prisma.$connect();
    }
    catch(err){
        return Error("DB接続に失敗しました")}
}

//詳細記事取得用のAPI
export const GET = async (req:Request,res:NextResponse) => {
    try{
        const id:number = parseInt (req.url.split("/blog/")[1]); //splitで区切ることで0番目と１番目の配列ができるので１番をとってくるとidだけ取ることができる
     await main();
     const post = await prisma.post.findFirst({where:{id}});//http://localhost3000:api/blog/⚪︎⚪︎ この⚪︎をとってきてidにしたい
     return NextResponse.json({message:"Success",post},{status:200});
 
    }catch(err) {
     return NextResponse.json({message:"Error"},{status:500})
    }finally{
     await prisma.$disconnect();
    }
 };