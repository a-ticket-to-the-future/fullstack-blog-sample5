

import { PostType } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

//SSR
async function fetchAllBlogs() {
  const res = await fetch(`http://localhost:3000/api/blog`,{cache:"no-store"}) //no-sotreでSSR 更新が頻繁に行われる。リクエストごとにサーバーを叩いてもらう
  // SSGの場合はforce-chace

  const data = await res.json();

  return data.posts;
  //ここまで関数を作り終えたのでHome()の中で呼び出していく
}


export default async function Home() {

  const posts = await fetchAllBlogs();

  return (
    <main className="w-full h-full">
  <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
    <h1 className="text-slate-200 text-center text-2xl font-extrabold">
      Full Stack Blog 📝
    </h1>
  </div>
  {/* Link */}
  <div className="flex my-5">
    <Link
      href={"/blog/add"}
      className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
    >
      ブログ新規作成
    </Link>
  </div>

  <div className="w-full flex flex-col justify-center items-center">
    {/* htmlだから map((post) => {})　じゃなくて　map((post) => ())だよ */}
    {posts.map((post :PostType) => (
    //  postの型定義エラーが起こるのでここでsrcディレクトリにtypes.tsファイルを作成し、ここで呼び出す
     <div key={post.id} className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center">
        <div className="flex items-center my-3">
          <div className="mr-auto">
            <h2 className="mr-auto font-semibold">{post.title}</h2>
          </div>
          <Link
            href={`/blog/edit/${post.id}`}
            className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
          >
            編集
          </Link>
        </div>

        <div className="mr-auto my-1">
          <blockquote className="font-bold text-slate-700">
            {new Date(post.date).toDateString()}</blockquote>
        </div>

        <div className="mr-auto my-1">
          <h2>{post.description}</h2>
        </div>
        <Image src={decodeURIComponent(post.image)} alt='' width={100} height={100} />
      </div>))}
    
  </div>
</main>

  )
}


//https%3A%2F%2Fwww21.a8.net%2Fsvt%2Fbgt%3Faid%3D210918278068%26wid%3D003%26eno%3D01%26mid%3Ds00000021674001017000%26mc%3D1&w=1200&q=75


//https://www27.a8.net/svt/bgt?aid=211222694325&wid=003&eno=01&mid=s00000018946001051000&mc=1


{/* <Image src={decodeURIComponent("https%3A%2F%2Fwww21.a8.net%2Fsvt%2Fbgt%3Faid%3D210918278068%26wid%3D003%26eno%3D01%26mid%3Ds00000021674001017000%26mc%3D1&w=1200&q=75")} alt='' width={100} height={100} /> */}
