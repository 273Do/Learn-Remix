import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug;
  invariant(slug, "slug is required"); // slugがない場合はエラー文を投げる

  const post = await getPost(slug);
  invariant(post, "post not found");

  const markdown = post.markdown;

  const html = marked(markdown);

  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      {/* <div>{html}</div> */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
