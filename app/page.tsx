"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
      }
    });
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar user={user} />
      <div className="max-w-2xl mx-auto mt-10">
        <BookmarkForm user={user} />
        <BookmarkList user={user} />
      </div>
    </>
  );
}
