"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User, RealtimeChannel } from "@supabase/supabase-js";
import { Bookmark } from "@/types/bookmark";

interface BookmarkListProps {
  user: User;
}

export default function BookmarkList({ user }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Initial fetch
  useEffect(() => {
  let channel: RealtimeChannel | null = null;

  const init = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);

    channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime:", payload);

          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [
              payload.new as Bookmark,
              ...prev,
            ]);
          }

          if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });
  };

  init();

  return () => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}, [user.id]);

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between border p-3 mb-2 rounded"
        >
          <div>
            <p className="font-bold">{bookmark.title}</p>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-600 text-sm"
            >
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
