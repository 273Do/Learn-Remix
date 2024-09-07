import { Form } from "@remix-run/react";

export default function NewPost() {
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
        >
          Create Post
        </button>
      </div>
    </Form>
  );
}
