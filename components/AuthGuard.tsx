"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { Spinner } from "@/components/Spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current path for redirect after login
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        localStorage.setItem("authRedirect", currentPath);
        router.push("/auth/signin");
      }
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner text="Please sign in to continue..." />
      </div>
    );
  }

  return <>{children}</>;
};
