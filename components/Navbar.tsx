"use client";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left Side - App Name */}
      <h1 className="text-lg font-semibold tracking-wide">
        🔖 Smart Bookmark
      </h1>

      {/* Right Side - User Info + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user.email}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
