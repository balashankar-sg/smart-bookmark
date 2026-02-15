"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
}

export default function BookmarkForm({ user }: { user: User }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

const addBookmark = async () => {
  if (!title || !url) return;

  const { error } = await supabase.from("bookmarks").insert([
    {
      title,
      url,
      user_id: user.id,
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      alert("Bookmark title already exists!");
    } else {
      alert("Something went wrong");
    }
    return;
  }

  setTitle("");
  setUrl("");
};


  return (
    <div className="mb-6">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={addBookmark}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Bookmark
      </button>
    </div>
  );
}
