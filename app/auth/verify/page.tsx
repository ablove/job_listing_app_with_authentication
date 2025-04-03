"use client";

import type React from "react";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEmail,
  selectAuthLoading,
  selectAuthError,
  selectVerificationEmail,
  clearError,
} from "@/features/auth/authSlice";
import type { AppDispatch } from "@/app/store";
import { Spinner } from "@/components/Spinner";
import { AlertCircle } from "lucide-react";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const email = useSelector(selectVerificationEmail);

  // For testing purposes, allow direct access to this page
  useEffect(() => {
    if (!email) {
      // Instead of redirecting, set a default email for testing
      // This allows users to test the verification flow without going through signup
      console.log("No email to verify, using test@example.com for testing");
    }
  }, [email]);

  // Countdown timer for resend code
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    // Reset timer
    setTimeLeft(30);
    setCanResend(false);

    // For testing purposes, just show a message
    console.log("Resending code to", email || "test@example.com");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 4) return;

    dispatch(clearError());
    const resultAction = await dispatch(
      verifyEmail({
        email: email || "test@example.com",
        OTP: otpString,
      })
    );

    if (verifyEmail.fulfilled.match(resultAction)) {
      router.push("/auth/signin");
    }
  };

  // Fill OTP automatically for testing
  const fillTestOtp = () => {
    setOtp(["1", "2", "3", "4"]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify Email</h2>
          <p className="mt-4 text-sm text-gray-600">
            We've sent a verification code to {email || "your email address"}.
            To complete the verification process, please enter the code here.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            (For testing purposes, any 4-digit code will work)
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Verification Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-center space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
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
                in{" "}
                {canResend
                  ? "0:00"
                  : `0:${timeLeft.toString().padStart(2, "0")}`}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 4}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? <Spinner text="" size="sm" /> : "Continue"}
            </button>
          </div>

          {/* Test button */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">For testing purposes:</p>
            <button
              type="button"
              onClick={fillTestOtp}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Fill Test OTP (1234)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
