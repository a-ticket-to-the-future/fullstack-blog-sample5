import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { disconnect } from "process";



//DB接続　npm install @prisma/clientを実行してインストールしてから始めよう
const prisma = new PrismaClient();


export async function main() {
    try{
        await prisma.$connect();
    }catch(err) {
        return Error("DB接続に失敗しました")
    }
}


//ブログの全記事取得用のAPI
export const GET = async (req:Request,res:NextResponse) => {
   try{
    await main();
    const posts = await prisma.post.findMany();//ここのpostはschema.prismaで作ったPostが小文字になったもの
    return NextResponse.json({message:"Success",posts},{status:200});

   }catch(err) {
    return NextResponse.json({message:"Error"},{status:500})
   }finally{
    await prisma.$disconnect();
   }
};




//ブログ投稿用のAPI
export const POST = async (req:Request,res:NextResponse) => {
    try{
        const {title , description,image} = await req.json();

     await main();
     const post = await prisma.post.create({data:{title,description,image}});//titleとdescriptionはreqの中に入っている
     return NextResponse.json({message:"Success",post},{status:201});
 
    }catch(err) {
     return NextResponse.json({message:"Error"},{status:500})
    }finally{
     await prisma.$disconnect();
    }
 };
