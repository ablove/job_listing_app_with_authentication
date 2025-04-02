"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to sign up");
      }

      // Move to verification step
      setEmail(formData.email);
      setVerificationStep(true);
      startResendTimer();
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const otp = verificationCode.join("");

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, OTP: otp }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to verify email");
      }

      // Redirect to sign in page
      router.push("/auth/signin");
    } catch (error: any) {
      setError(error.message || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    setCanResend(false);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      // In a real app, you would call an API to resend the code
      // For now, we'll just reset the timer
      startResendTimer();
    } catch (error) {
      setError("Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {verificationStep ? (
          // Verification Step
          <div>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Verify Email
              </h2>
              <p className="mt-4 text-center text-sm text-gray-600">
                We've sent a verification code to the email address you
                provided. To complete the verification process, please enter the
                code here.
              </p>
            </div>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleVerifyEmail}>
              <div className="flex justify-center space-x-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={verificationCode[index]}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
                    className="h-14 w-14 rounded-md border border-indigo-200 bg-white text-center text-2xl shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    placeholder="0"
                    title={`Verification code digit ${index + 1}`}
                  />
                ))}
              </div>

              <div className="text-center text-sm">
                You can request to{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`font-medium ${
                    canResend
                      ? "text-indigo-600 hover:text-indigo-500"
                      : "text-gray-400"
                  }`}
                >
                  Resend code
                </button>{" "}
                {!canResend &&
                  `in ${resendTimer}:${
                    resendTimer < 10 ? "0" + resendTimer : resendTimer
                  }`}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || verificationCode.some((code) => !code)}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-200 px-3 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isLoading ? "Verifying..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Sign Up Step
          <div>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign Up Today!
              </h2>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign Up with Google
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
              <div className="mx-4 text-sm text-gray-500">
                Or Sign Up with Email
              </div>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-800 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isLoading ? "Creating account..." : "Continue"}
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By clicking 'Continue', you acknowledge that you have read and
                accepted our{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
                .
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
