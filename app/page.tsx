"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Job Listing App
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Find your next opportunity
            </p>
          </div>

          {!isAuthenticated && (
            <div className="mt-8 space-y-4">
              <Link
                href="/auth/signin"
                className="group relative flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="group relative flex w-full justify-center rounded-md border border-indigo-800 bg-white px-3 py-3 text-sm font-semibold text-indigo-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-8 space-y-4">
              <Link
                href="/opportunities"
                className="group relative flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Browse Opportunities
              </Link>
              <Link
                href="/dashboard"
                className="group relative flex w-full justify-center rounded-md border border-indigo-800 bg-white px-3 py-3 text-sm font-semibold text-indigo-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
