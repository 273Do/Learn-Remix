// ._indexを入れると，ページの共通レイアウトではない部分を実装するときに使う
// headerやfooterの時は何もつけない
// つけなくても動くがつけた方がいい

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

// データフェッチはloader関数で行う
// loaderから返されるデータは全てクライアントに公開されるので注意
export const loader = async () => {
  // return json({
  //   posts: [
  //     {
  //       slug: "my-first-post",
  //       title: "My First Post",
  //     },
  //     {
  //       slug: "90s-mixtape",
  //       title: "A Mixtape I Made Just For You",
  //     },
  //   ],
  // });
  return json({ posts: await getPosts() });
};

export default function Posts() {
  // typeof loaderでloader関数の返り値の型を取得
  const { posts } = useLoaderData<typeof loader>();
  // ハイドレートされるため，ターミナルでもコンソールでも表示される
  console.log(posts);

  // SSRのためJSが動かない環境でも表示される(Progressive Enhancementに順守)
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="text-blue-600 underline">
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {/* 普通は/posts/adminとしなければならないが，Remixは自動的に相対パスを取得してくれる */}
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
    </main>
  );
}
