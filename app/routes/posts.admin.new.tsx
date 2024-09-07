import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";

import { createPost } from "~/models/post.server";

// データの変更やその他のアクションを処理するサーバー専用の関数．
// Next.jsでいうsever actionみたいなもの．
// loaderと対比するもの．
// Next.jsのserver actionの例
// async function myAction(formData: FormData) {
//   "use server"
//   const userId = formData.get("user-id") as string;
//   const password = formData.get("password") as string;
// }
export const action = async ({ request }: ActionFunctionArgs) => {
  // 1秒待つ
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const formData = await request.formData();
  const title = formData.get("title") as string; //name属性がtitleのinput要素の値を取得
  const slug = formData.get("slug") as string;
  const markdown = formData.get("markdown") as string;

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};

export default function NewPost() {
  const navigation = useNavigation();
  const isCreating = Boolean(navigation.state === "submitting"); // 送信中かどうか

  return (
    <Form method="post" className="space-y-3">
      <div>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          name="title"
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
      </div>
      <div>
        <label htmlFor="slug">Post Slug:</label>
        <input
          type="text"
          name="slug"
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
      </div>
      <div>
        <label htmlFor="markdown">Markdown:</label>
        <textarea
          id="markdown"
          name="markdown"
          rows={10}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Post"}
        </button>
      </div>
    </Form>
  );
}
