"use client"

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { Toaster,toast } from 'react-hot-toast';


  const postBlog = async (title:string | undefined ,
                          description:string | undefined ,
                          image:string | undefined,
                          ) => {
    const res = await fetch(`http://localhost:3000/api/blog`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({title,description,image}),//JSONとして認識させるためにJSON.stringify()
      }
    );

    return res.json();

  };



const PostBlog =  () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement| null>(null);  //参照する
    const descriptionRef = useRef<HTMLTextAreaElement| null>(null);  //参照する
    const imageUrlRef = useRef<HTMLTextAreaElement| null>(null);  //参照する

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        // console.log(titleRef.current?.value); //titleRefはnullの可能性がありますとエラーが出るので、useRefのところで型定義してあげる。そのうえで、オプショナルチェーンの？をつける 
        // console.log(descriptionRef.current?.value);
        toast.loading("投稿中です・・・・",{id:"1"});
        await postBlog(titleRef.current?.value,descriptionRef.current?.value,imageUrlRef.current?.value); //string | undefinedにしてねとエラーが出たので直す
      //非同期処理なのでawaitをつける。asyncは このformEventところだからhandleSubmit

      toast.success("投稿に成功しました。",{id:"1"});


      router.push("/");
      router.refresh();

    }


  return (
    <>
    <Toaster />
    <div className=' bg-blue-300 h-screen '>
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-50 font-bold p-3">ブログ新規作成 🚀</p>
      <form onSubmit={handleSubmit}>
        <input
        ref={titleRef}
          placeholder="タイトルを入力"
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
        />
        <textarea
        ref={descriptionRef}
          placeholder="記事詳細を入力"
          className="rounded-md px-4 py-2 w-full my-2"
        ></textarea>
        <textarea
        ref={imageUrlRef}
          placeholder="imageURLを入力（仮）"
          className="rounded-md px-4 py-2 w-full my-2"
        ></textarea>
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-100 rounded-lg m-auto hover:bg-slate-100">
          投稿
        </button>
      </form>
    </div>
  </div>
    </div>
</>
  )
}

export default PostBlog
