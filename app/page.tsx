"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      // 🔥 This exchanges ?code= for session
      await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser(data.user);
      } else {
        window.location.href = "/login";
      }
    };

    handleAuth();
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
