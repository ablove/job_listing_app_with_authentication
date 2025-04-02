"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "CredentialsSignin":
        return "Invalid email or password. Please try again.";
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account.";
      case "EmailSignin":
        return "Failed to send verification email. Please try again.";
      case "Verification":
        return "The verification link is invalid or has expired.";
      case "OAuthCallback":
        return "Error occurred during authentication. Please try again.";
      case "OAuthSignin":
        return "Error occurred during sign in. Please try again.";
      case "SessionRequired":
        return "You must be signed in to access this page.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col space-y-4">
              <Link href="/auth/signin">
                <Button className="w-full">Return to Sign In</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Go to Home Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
