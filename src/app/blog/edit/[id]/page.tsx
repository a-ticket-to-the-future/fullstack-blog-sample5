"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';



const editBlog = async (title:string | undefined ,
    description:string | undefined ,
    image:string | undefined,
    id: number,
    ) => {
const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
},
body: JSON.stringify({title,description,image,id}),//JSONとして認識させるためにJSON.stringify()
}
);

return res.json();

};

const getBlogById = async (
    
    id: number,
    ) => {
const res = await fetch(`http://localhost:3000/api/blog/${id}`);
const data = await res.json();
console.log(data); //編集画面に遷移してもすでに存在しているはずのtitleとdescriptionが表示されなかったのでconsoleで確認した。データは取れていた

return data.post;

};


const deleteBlog = async (
    
    id: number,
    ) => {
const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
method:"DELETE",
headers:{
"Content-Type":"application/json",
},
}
);

return res.json();

};



const EditPost = ({params}:{params : {id:number}}) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement| null>(null);  //参照する
    const descriptionRef = useRef<HTMLTextAreaElement| null>(null);  //参照する
    const imageUrlRef = useRef<HTMLTextAreaElement| null>(null);  //参照する
    // const imageUrlRef: React.MutableRefObject<HTMLTextAreaElement | null> =useRef<HTMLTextAreaElement| null>(null)


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
    
        // console.log(titleRef.current?.value); //titleRefはnullの可能性がありますとエラーが出るので、useRefのところで型定義してあげる。そのうえで、オプショナルチェーンの？をつける 
        // console.log(descriptionRef.current?.value);
        toast.loading("編集中です・・・・",{id:"1"});
        await editBlog(titleRef.current?.value,descriptionRef.current?.value,imageUrlRef.current?.value,params.id); //string | undefinedにしてねとエラーが出たので直す
      //非同期処理なのでawaitをつける。asyncは このformEventところだからhandleSubmit
    
      toast.success("編集に成功しました。",{id:"1"});
    
    
      router.push("/");
      router.refresh();
    
    }

    const handleDelete = async () => {
        await deleteBlog(params.id);

        router.push("/");
        router.refresh

    }

    useEffect(() => {
        getBlogById(params.id).then((data) => {
            console.log(data);
            ////編集画面に遷移してもすでに存在しているはずのtitleとdescriptionが表示されなかったのでconsoleで確認した。データは取れていた　=> .valueが抜けていたことがわかった
            // かつ、　!をつけるか　if文の中に入れて　値が存在するかのかくにんが必要になった。のでif文に入れた
            if(titleRef.current && descriptionRef.current && imageUrlRef.current){

                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
                imageUrlRef.current.value = data.image;
                
            }
        }).catch(err => {
            toast.error("エラーが発生しました",{id:"1"});
        });
    },[]) ;




    return (
      <>
      <Toaster />
    <div className=' bg-blue-300 h-screen'>
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
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
        {/* {imageUrlRef && (

        <Image src={imageUrlRef.current?.value} alt='' height={300} width={300} />
        )} */}
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
          更新
        </button>
        <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
          削除
        </button>
      </form>
    </div>
  </div>
    </div>
</>
  )
}

export default EditPost
