"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuthToken, removeAuthToken } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = getAuthToken();
    if (token) {
      setIsLoggedIn(true);
      // Try to get user info from localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user data");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/auth/signin";
  };

  if (!isLoggedIn) {
    return (
      <div className="flex space-x-4">
        <Link
          href="/auth/signin"
          className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign in
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">
        {user?.name || "User"}
      </span>
      <button
        onClick={handleLogout}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Sign out
      </button>
    </div>
  );
}
