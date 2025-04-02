"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Spinner text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Welcome, {session?.user?.name}!
              </h2>
              <p className="text-gray-600 mb-4">
                This is your personal dashboard where you can manage your job
                applications and profile.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-blue-800 mb-2">
                    My Applications
                  </h3>
                  <p className="text-sm text-blue-600 mb-4">
                    Track and manage your job applications
                  </p>
                  <Button size="sm" variant="outline">
                    View Applications
                  </Button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-green-800 mb-2">
                    My Profile
                  </h3>
                  <p className="text-sm text-green-600 mb-4">
                    Update your profile information
                  </p>
                  <Link href="/profile">
                    <Button size="sm" variant="outline">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
